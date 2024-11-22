import { expect, test } from "vitest";
import { getPercentageMatch } from "../api/services/pixelmatch";
import path from "path";
import fs from "fs";

interface MatchResult {
	imageSet: number;
	userResponse: number;
	matchPercentage: number;
	comparisonTime: number;
}

interface ImageAnalytics {
	imageSet: number;
	averageMatch: number;
	stdDeviation: number;
	minMatch: number;
	maxMatch: number;
	averageProcessingTime: number;
}

const matcher = async (
	image1: string,
	image2: string,
): Promise<MatchResult> => {
	const startTime = performance.now();
	const percentage = await getPercentageMatch(
		fs.readFileSync(path.resolve(__dirname, "resources/images/" + image1)),
		path.resolve(__dirname, "resources/images/" + image2),
	);
	const endTime = performance.now();

	const imageSet = parseInt(image1.split("_").pop()?.split(".")[0] || "0");
	const userResponse = parseInt(image1.split("_")[2]);

	return {
		imageSet,
		userResponse,
		matchPercentage: parseFloat(percentage),
		comparisonTime: endTime - startTime,
	};
};

async function runImageAnalysis() {
	const results: MatchResult[] = [];
	const imageAnalytics: ImageAnalytics[] = [];

	// Run all comparisons
	for (let imageSet = 1; imageSet <= 3; imageSet++) {
		for (let userResponse = 1; userResponse <= 3; userResponse++) {
			const result = await matcher(
				`user_response_${userResponse}_image_${imageSet}.png`,
				`generated_image_${imageSet}.png`,
			);
			results.push(result);
		}

		// Calculate analytics for each image set
		const setResults = results.filter((r) => r.imageSet === imageSet);
		const matchPercentages = setResults.map((r) => r.matchPercentage);
		const processingTimes = setResults.map((r) => r.comparisonTime);

		const average =
			matchPercentages.reduce((a, b) => a + b, 0) / matchPercentages.length;
		const variance =
			matchPercentages.reduce((a, b) => a + Math.pow(b - average, 2), 0) /
			matchPercentages.length;
		const stdDev = Math.sqrt(variance);

		imageAnalytics.push({
			imageSet,
			averageMatch: average,
			stdDeviation: stdDev,
			minMatch: Math.min(...matchPercentages),
			maxMatch: Math.max(...matchPercentages),
			averageProcessingTime:
				processingTimes.reduce((a, b) => a + b, 0) / processingTimes.length,
		});
	}

	return { results, imageAnalytics };
}

// Run the analysis and generate visualizations
runImageAnalysis().then(({ results, imageAnalytics }) => {
	console.log("\n#### Image Matching Analysis Results");

	// Output CSV format for plotting
	console.log("\nDetailed Results CSV:");
	console.log("ImageSet,UserResponse,MatchPercentage,ComparisonTime");
	results.forEach((r) => {
		console.log(
			`${r.imageSet},${r.userResponse},${r.matchPercentage},${r.comparisonTime}`,
		);
	});

	console.log("\nAnalytics Summary CSV:");
	console.log(
		"ImageSet,AverageMatch,StdDeviation,MinMatch,MaxMatch,AvgProcessingTime",
	);
	imageAnalytics.forEach((a) => {
		console.log(
			`${a.imageSet},${a.averageMatch},${a.stdDeviation},${a.minMatch},${a.maxMatch},${a.averageProcessingTime}`,
		);
	});
});
