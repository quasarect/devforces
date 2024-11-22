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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContexts = getContexts;
exports.launchBrowser = launchBrowser;
exports.closeBrowser = closeBrowser;
exports.createBrowserContext = createBrowserContext;
exports.getPage = getPage;
exports.releasePage = releasePage;
const playwright_1 = require("playwright");
const env_1 = __importDefault(require("../../config/env"));
let MAX_BROWSER_CONTEXTS = env_1.default.MAX_BROWSER_CONTEXTS;
let MAX_PAGES_PER_CONTEXT = env_1.default.MAX_PAGES_PER_CONTEXT;
const HEADLESS = env_1.default.NODE_ENV !== "production" ? env_1.default.BROWSER_HEADLESS : true;
let browser;
let browserContexts = [];
function getContexts() {
    return browserContexts;
}
function launchBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield playwright_1.chromium.launch({
            headless: HEADLESS,
        });
    });
}
function closeBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        browserContexts = [];
        yield browser.close();
    });
}
function createPage(browserContext) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = yield browserContext.newPage();
        yield page.route("**/*", (route) => {
            return ["image", "stylesheet", "font", "media"].includes(route.request().resourceType())
                ? route.abort()
                : route.continue();
        });
        const timer = setTimeout(() => { }, 0);
        return {
            page,
            timer,
            isLocked: false,
        };
    });
}
function createBrowserContext() {
    return __awaiter(this, void 0, void 0, function* () {
        if (browserContexts.length >= MAX_BROWSER_CONTEXTS) {
            throw new Error("Maximum number of browser contexts reached");
        }
        const browserContext = yield browser.newContext();
        const pages = [];
        for (let i = 0; i < MAX_PAGES_PER_CONTEXT; i++) {
            pages.push(yield createPage(browserContext));
        }
        browserContexts.push({ browserContext, pages });
    });
}
function getPage(timeout, retries = 100) {
    return new Promise((resolve, reject) => {
        const findPage = () => __awaiter(this, void 0, void 0, function* () {
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
                yield createBrowserContext();
                setTimeout(findPage, 100);
            }
            else {
                setTimeout(findPage, 100);
            }
        });
        findPage();
    });
}
function releasePage(page) {
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
        }
        else {
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
//# sourceMappingURL=index.js.map