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
exports.saveUser = exports.findUserByEmail = exports.checkUsernameAvailibility = void 0;
const models_1 = require("../../models");
const checkUsernameAvailibility = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ username });
    if (user)
        return false;
    return true;
});
exports.checkUsernameAvailibility = checkUsernameAvailibility;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.User.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
const saveUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new models_1.User(models_1.userSchema.parse(userData));
    return yield user.save();
});
exports.saveUser = saveUser;
//# sourceMappingURL=index.js.map