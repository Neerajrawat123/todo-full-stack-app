"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const connect_1 = __importDefault(require("./database/connect"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const Port = process.env.PORT || 3000;
(0, connect_1.default)()
    .then(() => {
    app_1.default.listen(Port, () => {
        console.log(`server is running on port ${Port}`);
    });
})
    .catch((error) => {
    console.log('mongoDb connection failed', error);
});
