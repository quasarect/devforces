import { chromium, Browser, BrowserContext } from "playwright";

import { PageOptions, AcquiredPage, BrowserContextOptions } from "../../types";

import env from "../../config/env";

let MAX_BROWSER_CONTEXTS = env.MAX_BROWSER_CONTEXTS;
let MAX_PAGES_PER_CONTEXT = env.MAX_PAGES_PER_CONTEXT;

const HEADLESS = env.NODE_ENV !== "production" ? env.BROWSER_HEADLESS : true;
let browser: Browser;

let browserContexts: BrowserContextOptions[] = [];

export function getContexts(): BrowserContextOptions[] {
	return browserContexts;
}

export async function launchBrowser() {
	browser = await chromium.launch({
		headless: HEADLESS,
	});
}

export async function closeBrowser() {
	browserContexts = [];
	await browser.close();
}

async function createPage(
	browserContext: BrowserContext,
): Promise<PageOptions> {
	const page = await browserContext.newPage();
	await page.route("**/*", (route) => {
		return ["image", "stylesheet", "font", "media"].includes(
			route.request().resourceType(),
		)
			? route.abort()
			: route.continue();
	});

	const timer = setTimeout(() => {}, 0);
	return {
		page,
		timer,
		isLocked: false,
	};
}

export async function createBrowserContext(MAX_PAGES_PER_CONTEXT_ARG?: number) {
	if (MAX_PAGES_PER_CONTEXT_ARG) {
		MAX_PAGES_PER_CONTEXT = MAX_PAGES_PER_CONTEXT_ARG;
	}

	if (browserContexts.length >= MAX_BROWSER_CONTEXTS) {
		throw new Error("Maximum number of browser contexts reached");
	}
	const browserContext = await browser.newContext();

	const pages: PageOptions[] = [];
	for (let i = 0; i < MAX_PAGES_PER_CONTEXT; i++) {
		pages.push(await createPage(browserContext));
	}
	browserContexts.push({ browserContext, pages });
}

export function getPage(
	timeout: number,
	retries: number = 100,
): Promise<AcquiredPage | null> {
	return new Promise((resolve, reject) => {
		const findPage = async () => {
			if (retries <= 0) {
				reject(new Error("Cannot acquire a browser page."));
				return;
			}

			for (let i = 0; i < browserContexts.length; i++) {
				const browserContextOptions = browserContexts[i];
				for (let j = 0; j < browserContextOptions.pages.length; j++) {
					const pageOptions = browserContextOptions.pages[j];
					if (!pageOptions.isLocked) {
						pageOptions.isLocked = true;
						pageOptions.timer = setTimeout(() => {
							pageOptions.isLocked = false;
							pageOptions.page.goBack();
						}, timeout * 1000);
						resolve({
							page: pageOptions.page,
							browserContextId: i,
							pageId: j,
						});
						return;
					}
				}
			}

			if (browserContexts.length < MAX_BROWSER_CONTEXTS) {
				await createBrowserContext();
				setTimeout(findPage, 100);
			} else {
				setTimeout(findPage, 100);
			}
		};

		findPage();
	});
}

export function releasePage(page: AcquiredPage): boolean {
	const browserContextOptions = browserContexts[page.browserContextId];
	if (!browserContextOptions) {
		return false;
	}

	const pageOptions = browserContextOptions.pages[page.pageId];
	if (!pageOptions) {
		return false;
	}

	pageOptions.isLocked = false;
	clearTimeout(pageOptions.timer);

	browserContextOptions.pages[page.pageId] = pageOptions;

	let minContextEmptyId = browserContexts.length - 1;

	for (let i = 0; i < browserContexts.length; i++) {
		const browserContextOptions = browserContexts[i];
		let pagesInActiveCount = 0;
		for (const element of browserContextOptions.pages) {
			if (!element.isLocked) {
				pagesInActiveCount++;
			}
		}

		if (pagesInActiveCount === MAX_PAGES_PER_CONTEXT) {
			minContextEmptyId = Math.min(minContextEmptyId, i);
		} else {
			minContextEmptyId = i;
		}
	}

	for (let i = minContextEmptyId + 1; i < MAX_BROWSER_CONTEXTS; i++) {
		const browserContextOptions = browserContexts[i];
		if (!browserContextOptions) {
			continue;
		}

		browserContextOptions.browserContext.close();
		browserContexts.splice(i, 1);
	}

	return true;
}
