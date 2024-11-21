import { RequestHandler } from "express";

import { getPage, releasePage } from "../services/playwright";
import { getPercentageMatch } from "../services/pixelmatch";
import { applyCSSToPage } from "../services/playwright/actions";
import * as path from "path";

export const calculateScore: RequestHandler = async (req, res, next) => {
	const { code } = req.body;
	const page = await getPage(10000);
	if (!page?.page) {
		throw new Error("No page available");
	}

	try {
		await applyCSSToPage(page, code);

		const screenshot = await page.page.screenshot();

		const score = getPercentageMatch(
			screenshot,
			path.resolve(__dirname, "../assets/test.png"),
		);

		res.json({ score });
	} catch (error) {
		next(error);
	} finally {
		releasePage(page);
	}
};
