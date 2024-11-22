"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const playwright_1 = require("../api/services/playwright");
const actions_1 = require("../api/services/playwright/actions");
function getPageAndApplyCSS(code, timeout) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield (0, playwright_1.getPage)(timeout);
        if (!(page === null || page === void 0 ? void 0 : page.page)) {
            throw new Error("No page available");
        }
        yield (0, actions_1.applyCSSToPage)(page, code);
        return page;
    });
}
const html = (idx, color) => `
    <title>Page ${idx}</title>
    <style>body { background: ${color}; }</style>
  `;
const titleBackground = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const [title, background] = yield page.evaluate(() => [
        document.title,
        window.getComputedStyle(document.body).backgroundColor,
    ]);
    return [title, background];
});
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
vitest_1.test.sequential("test multiple pages in parallel", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, playwright_1.launchBrowser)();
    yield (0, playwright_1.createBrowserContext)();
    const [page1, page2, page3] = yield Promise.all([
        getPageAndApplyCSS(html(1, "red"), 10),
        getPageAndApplyCSS(html(2, "blue"), 10),
        getPageAndApplyCSS(html(3, "green"), 10),
    ]);
    const [title1, background1] = yield titleBackground(page1.page);
    const [title2, background2] = yield titleBackground(page2.page);
    const [title3, background3] = yield titleBackground(page3.page);
    (0, vitest_1.expect)(title1).toBe("Page 1");
    (0, vitest_1.expect)(title2).toBe("Page 2");
    (0, vitest_1.expect)(title3).toBe("Page 3");
    (0, vitest_1.expect)(background1).toBe("rgb(255, 0, 0)");
    (0, vitest_1.expect)(background2).toBe("rgb(0, 0, 255)");
    (0, vitest_1.expect)(background3).toBe("rgb(0, 128, 0)");
    (0, vitest_1.expect)(page1.pageId).not.toBe(page2.pageId);
    (0, vitest_1.expect)(page3.pageId).not.toBe(page2.pageId);
    (0, vitest_1.expect)(page3.pageId).not.toBe(page1.pageId);
    yield delay(10000);
    (0, playwright_1.closeBrowser)();
}), {
    timeout: 15000,
});
vitest_1.test.sequential("test page release and reallocation", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, playwright_1.launchBrowser)();
    yield (0, playwright_1.createBrowserContext)();
    const page1 = yield getPageAndApplyCSS(html(1, "red"), 10);
    const [title1, background1] = yield titleBackground(page1.page);
    (0, vitest_1.expect)(title1).toBe("Page 1");
    (0, vitest_1.expect)(background1).toBe("rgb(255, 0, 0)");
    yield delay(5000);
    (0, playwright_1.releasePage)(page1);
    const page2 = yield getPageAndApplyCSS(html(2, "blue"), 10);
    (0, vitest_1.expect)(page2.browserContextId).toBe(page1.browserContextId);
    (0, vitest_1.expect)(page2.pageId).toBe(page1.pageId);
    const [title2, background2] = yield titleBackground(page2.page);
    (0, vitest_1.expect)(title2).toBe("Page 2");
    (0, vitest_1.expect)(background2).toBe("rgb(0, 0, 255)");
    (0, playwright_1.releasePage)(page2);
    yield delay(5000);
    yield (0, playwright_1.closeBrowser)();
}), {
    timeout: 15000,
});
//# sourceMappingURL=playwright.test.js.map