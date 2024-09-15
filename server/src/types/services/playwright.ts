import { BrowserContext, Page } from "playwright";

export type PageOptions = {
	page: Page;
	timer: NodeJS.Timeout;
	isLocked: boolean;
};

export type AcquiredPage = {
	page: Page;
	browserContextId: number;
	pageId: number;
};

export type BrowserContextOptions = {
	browserContext: BrowserContext;
	pages: PageOptions[];
};
