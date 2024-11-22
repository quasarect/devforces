import { performance } from "perf_hooks";
import {
	launchBrowser,
	createBrowserContext,
	closeBrowser,
	getPage,
	releasePage,
} from "../api/services/playwright";
import * as os from "os";

interface MemoryMetrics {
	heapUsed: number;
	heapTotal: number;
	external: number;
	arrayBuffers: number;
	rss: number;
}

interface BrowserMetrics {
	maxPages: number;
	memoryUsage: {
		initial: MemoryMetrics;
		afterContext: MemoryMetrics;
		peak: MemoryMetrics;
		final: MemoryMetrics;
	};
	pageMetrics: {
		creationTime: number[];
		releaseTime: number[];
		memoryPerPage: number[];
	};
	performance: {
		successRate: number;
		averageLatency: number;
		peakConcurrentPages: number;
	};
}

function getMemoryUsage(): MemoryMetrics {
	const usage = process.memoryUsage();
	return {
		heapUsed: usage.heapUsed / 1024 / 1024, // MB
		heapTotal: usage.heapTotal / 1024 / 1024, // MB
		external: usage.external / 1024 / 1024, // MB
		arrayBuffers: usage.arrayBuffers / 1024 / 1024, // MB
		rss: usage.rss / 1024 / 1024, // MB
	};
}

async function measureBrowserPerformance(
	maxPagesPerContext: number,
): Promise<BrowserMetrics> {
	const metrics: BrowserMetrics = {
		maxPages: maxPagesPerContext,
		memoryUsage: {
			initial: getMemoryUsage(),
			afterContext: getMemoryUsage(),
			peak: getMemoryUsage(),
			final: getMemoryUsage(),
		},
		pageMetrics: {
			creationTime: [],
			releaseTime: [],
			memoryPerPage: [],
		},
		performance: {
			successRate: 0,
			averageLatency: 0,
			peakConcurrentPages: 0,
		},
	};

	let successfulOperations = 0;
	let totalOperations = 0;
	const activePages = new Set();

	try {
		// Initial memory state
		metrics.memoryUsage.initial = getMemoryUsage();

		await launchBrowser();
		await createBrowserContext(maxPagesPerContext);

		// Memory after context creation
		metrics.memoryUsage.afterContext = getMemoryUsage();

		// Sequential page creation
		for (let i = 0; i < maxPagesPerContext; i++) {
			totalOperations++;
			const beforeCreate = performance.now();
			const memBefore = getMemoryUsage();

			try {
				const page = await getPage(1000);
				if (page) {
					activePages.add(page.pageId);
					metrics.pageMetrics.creationTime.push(
						performance.now() - beforeCreate,
					);

					// Calculate memory impact of this page
					const memAfter = getMemoryUsage();
					const memoryDelta = memAfter.heapUsed - memBefore.heapUsed;
					metrics.pageMetrics.memoryPerPage.push(memoryDelta);

					// Update peak memory if needed
					if (memAfter.heapUsed > metrics.memoryUsage.peak.heapUsed) {
						metrics.memoryUsage.peak = memAfter;
					}

					// Track concurrent pages
					metrics.performance.peakConcurrentPages = Math.max(
						metrics.performance.peakConcurrentPages,
						activePages.size,
					);

					successfulOperations++;

					// Release page and measure
					const beforeRelease = performance.now();
					await releasePage(page);
					metrics.pageMetrics.releaseTime.push(
						performance.now() - beforeRelease,
					);
					activePages.delete(page.pageId);
				}
			} catch (error) {
				console.error(`Failed to create/release page: ${error.message}`);
			}
		}

		// Concurrent page creation test
		const concurrentStart = performance.now();
		const concurrentPromises = Array(Math.floor(maxPagesPerContext / 2))
			.fill(0)
			.map(async () => {
				totalOperations++;
				const memBefore = getMemoryUsage();

				try {
					const page = await getPage(1000);
					if (page) {
						activePages.add(page.pageId);
						const memAfter = getMemoryUsage();
						metrics.pageMetrics.memoryPerPage.push(
							memAfter.heapUsed - memBefore.heapUsed,
						);

						if (memAfter.heapUsed > metrics.memoryUsage.peak.heapUsed) {
							metrics.memoryUsage.peak = memAfter;
						}

						successfulOperations++;
						await releasePage(page);
						activePages.delete(page.pageId);
					}
				} catch (error) {
					console.error(`Concurrent page creation failed: ${error.message}`);
				}
			});

		await Promise.all(concurrentPromises);
		metrics.performance.averageLatency =
			(performance.now() - concurrentStart) / concurrentPromises.length;
	} finally {
		await closeBrowser();
		metrics.memoryUsage.final = getMemoryUsage();
	}

	metrics.performance.successRate =
		(successfulOperations / totalOperations) * 100;
	return metrics;
}

async function runMemoryAnalysis() {
	const pageLimits = [2, 3, 5, 8, 10, 15, 20, 25, 30, 25, 40, 45, 50];
	const results: BrowserMetrics[] = [];

	console.log("Starting memory analysis...");
	console.log(`Total System Memory: ${os.totalmem() / 1024 / 1024} MB`);
	console.log(`Free System Memory: ${os.freemem() / 1024 / 1024} MB`);

	for (const limit of pageLimits) {
		console.log(`\nTesting with MAX_PAGES_PER_CONTEXT = ${limit}`);
		const metrics = await measureBrowserPerformance(limit);
		results.push(metrics);

		// Output detailed metrics
		console.log(`\nMemory Usage (MB):`);
		console.log(
			`Initial Heap: ${metrics.memoryUsage.initial.heapUsed.toFixed(2)}`,
		);
		console.log(`Peak Heap: ${metrics.memoryUsage.peak.heapUsed.toFixed(2)}`);
		console.log(`Final Heap: ${metrics.memoryUsage.final.heapUsed.toFixed(2)}`);
		console.log(
			`Average Memory per Page: ${
				metrics.pageMetrics.memoryPerPage.reduce((a, b) => a + b, 0) /
				metrics.pageMetrics.memoryPerPage.length.toFixed(2)
			}`,
		);
	}

	// Generate CSV for plotting
	console.log("\nCSV Format:");
	console.log(
		"maxPages,initialHeap,peakHeap,finalHeap,avgMemoryPerPage,successRate,avgLatency,peakConcurrent",
	);
	results.forEach((r) => {
		console.log(
			`${r.maxPages},${r.memoryUsage.initial.heapUsed},${r.memoryUsage.peak.heapUsed},` +
				`${r.memoryUsage.final.heapUsed},${
					r.pageMetrics.memoryPerPage.reduce((a, b) => a + b, 0) /
					r.pageMetrics.memoryPerPage.length
				},${r.performance.successRate},${r.performance.averageLatency},${
					r.performance.peakConcurrentPages
				}`,
		);
	});

	return results;
}

// Run the memory analysis
runMemoryAnalysis().catch(console.error);
