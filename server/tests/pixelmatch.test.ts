import { expect, test } from "vitest";

import { getPercentageMatch } from "../src/services/pixelmatch";
import path from "path";
import fs from "fs";

const matcher = (image1: string, image2: string) => {
	return getPercentageMatch(
		fs.readFileSync(path.resolve(__dirname, "resources/images/" + image1)),
		path.resolve(__dirname, "resources/images/" + image2),
	);
};

test("pixelmatch 0", () => {
	expect(matcher("user_response_1_image_1.png", "generated_image_1.png")).toBe(
		"95.8",
	);
});

test("pixelmatch 1", () => {
	expect(matcher("user_response_1_image_1.png", "generated_image_2.png")).toBe(
		"95.8",
	);
});

test("pixelmatch 1", () => {
	expect(matcher("user_response_1_image_1.png", "generated_image_3.png")).toBe(
		"95.8",
	);
});
