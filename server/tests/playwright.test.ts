import { expect, test } from "vitest";
import { Page } from "playwright";
import {
	launchBrowser,
	createBrowserContext,
	closeBrowser,
	getPage,
	releasePage,
} from "../src/services/playwright";
import { AcquiredPage } from "../src/types";
import { applyCSSToPage } from "../src/services/playwright/actions";

async function getPageAndApplyCSS(
	code: string,
	timeout: number,
): Promise<AcquiredPage> {
	const page = await getPage(timeout);
	if (!page?.page) {
		throw new Error("No page available");
	}
	await applyCSSToPage(page, code);
	return page;
}

const html = (idx: number, color: string) => `
    <title>Page ${idx}</title>
    <style>body { background: ${color}; }</style>
  `;

const titleBackground = async (page: Page) => {
	const [title, background] = await page.evaluate(() => [
		document.title,
		window.getComputedStyle(document.body).backgroundColor,
	]);

	return [title, background];
};

// function delay(ms: number): Promise<void> {
// 	return new Promise(resolve => setTimeout(resolve, ms));
//   }

test.sequential("test multiple pages in parallel", async () => {
	await launchBrowser();
	await createBrowserContext();

	const [page1, page2, page3] = await Promise.all([
		getPageAndApplyCSS(html(1, "red"), 10),
		getPageAndApplyCSS(html(2, "blue"), 10),
		getPageAndApplyCSS(html(3, "green"), 10),
	]);

	const [title1, background1] = await titleBackground(page1.page);
	const [title2, background2] = await titleBackground(page2.page);
	const [title3, background3] = await titleBackground(page3.page);

	expect(title1).toBe("Page 1");
	expect(title2).toBe("Page 2");
	expect(title3).toBe("Page 3");
	expect(background1).toBe("rgb(255, 0, 0)"); // red
	expect(background2).toBe("rgb(0, 0, 255)"); // blue
	expect(background3).toBe("rgb(0, 128, 0)"); // green

	expect(page1.pageId).not.toBe(page2.pageId);
	expect(page3.pageId).not.toBe(page2.pageId);
	expect(page3.pageId).not.toBe(page1.pageId);

	// await delay(10000);

	closeBrowser();
}, { 
	timeout: 15000
});

test.sequential("test page release and reallocation", async () => {
	await launchBrowser();
	await createBrowserContext();

	const page1 = await getPageAndApplyCSS(html(1, "red"), 10);

	const [title1, background1] = await titleBackground(page1.page);
	expect(title1).toBe("Page 1");
	expect(background1).toBe("rgb(255, 0, 0)"); // red

	// await delay(5000);


	releasePage(page1);

	const page2 = await getPageAndApplyCSS(html(2, "blue"), 10);

	expect(page2.browserContextId).toBe(page1.browserContextId);
	expect(page2.pageId).toBe(page1.pageId);

	const [title2, background2] = await titleBackground(page2.page);
	expect(title2).toBe("Page 2");
	expect(background2).toBe("rgb(0, 0, 255)"); // blue

	releasePage(page2);

	// await delay(5000);


	await closeBrowser();
}, {
	timeout: 15000
});
