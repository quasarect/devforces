import { AcquiredPage } from "../../types";

export async function applyCSSToPage(page: AcquiredPage, code: string) {
	try {
		await page.page.setViewportSize({ width: 400, height: 300 });
		await page.page.setContent(code, {
			waitUntil: "domcontentloaded",
		});
	} catch (error) {
		console.error("Error injecting CSS:", error);
		throw error;
	}
}

// implement get screenshot here
