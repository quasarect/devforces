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
const user_controller_1 = require("../api/controllers/user.controller");
const token_1 = require("../api/utils/token");
const user_1 = require("../api/services/user");
const HttpException_1 = __importDefault(require("../api/types/exceptions/HttpException"));
const status_codes_1 = __importDefault(require("../api/types/express/status_codes"));
jest.mock("../api/utils/token");
jest.mock("../api/services/user");
describe("User Controller", () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
        jest.clearAllMocks();
    });
    describe("createUser", () => {
        it("should create a user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                username: "testuser",
                token: "valid_token",
            };
            token_1.verifyToken.mockReturnValue({
                name: "Test User",
                email: "test@example.com",
                picture: "https://example.com/picture.jpg",
            });
            user_1.checkUsernameAvailibility.mockResolvedValue(true);
            user_1.saveUser.mockResolvedValue({
                _id: "user_id",
                username: "testuser",
                name: "Test User",
                email: "test@example.com",
                pfp: "https://example.com/picture.jpg",
            });
            token_1.createAuthToken.mockReturnValue("new_auth_token");
            yield (0, user_controller_1.createUser)(mockRequest, mockResponse, nextFunction);
            expect(user_1.checkUsernameAvailibility).toHaveBeenCalledWith("testuser");
            expect(token_1.verifyToken).toHaveBeenCalledWith("valid_token");
            expect(user_1.saveUser).toHaveBeenCalledWith({
                name: "Test User",
                email: "test@example.com",
                pfp: "https://example.com/picture.jpg",
                username: "testuser",
            });
            expect(token_1.createAuthToken).toHaveBeenCalled();
            expect(mockResponse.cookie).toHaveBeenCalledWith("auth_token", "new_auth_token", expect.any(Object));
            expect(mockResponse.status).toHaveBeenCalledWith(status_codes_1.default.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "User created successfully",
            });
        }));
        it("should throw an error if username is taken", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                username: "existinguser",
                token: "valid_token",
            };
            user_1.checkUsernameAvailibility.mockResolvedValue(false);
            yield (0, user_controller_1.createUser)(mockRequest, mockResponse, nextFunction);
            expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException_1.default));
            expect(nextFunction).toHaveBeenCalledWith(expect.objectContaining({
                status: status_codes_1.default.CONFLICT,
                message: "Username already taken.",
            }));
        }));
    });
    describe("isUsernameAvailable", () => {
        it("should return true if username is available", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.query = { username: "newuser" };
            user_1.checkUsernameAvailibility.mockResolvedValue(true);
            yield (0, user_controller_1.isUsernameAvailable)(mockRequest, mockResponse, nextFunction);
            expect(user_1.checkUsernameAvailibility).toHaveBeenCalledWith("newuser");
            expect(mockResponse.status).toHaveBeenCalledWith(status_codes_1.default.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                isUsernameAvailable: true,
            });
        }));
        it("should return false if username is not available", () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.query = { username: "existinguser" };
            user_1.checkUsernameAvailibility.mockResolvedValue(false);
            yield (0, user_controller_1.isUsernameAvailable)(mockRequest, mockResponse, nextFunction);
            expect(user_1.checkUsernameAvailibility).toHaveBeenCalledWith("existinguser");
            expect(mockResponse.status).toHaveBeenCalledWith(status_codes_1.default.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                isUsernameAvailable: false,
            });
        }));
    });
});
//# sourceMappingURL=user.test.js.map