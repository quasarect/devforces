const { compareImages } = require("../../../build/Release/pixelmatch");

export function getPercentageMatch(buffer: Buffer, path: string): number {
	const { percentageDiff } = compareImages(buffer, path);
	return percentageDiff.toFixed(1);
}
