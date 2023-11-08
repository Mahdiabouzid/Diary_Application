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
exports.initializeServer = exports.DI = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const entities_1 = require("./entities");
const PORT = 4000;
const app = (0, express_1.default)();
//Setting MikroOrm via Dependency Injection
exports.DI = {};
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    //DI setup
    exports.DI.orm = yield core_1.MikroORM.init();
    exports.DI.em = exports.DI.orm.em;
    exports.DI.diaryEntryRepository = exports.DI.orm.em.getRepository(entities_1.DiaryEntry);
    exports.DI.diaryEntryTagRepository = exports.DI.em.getRepository(entities_1.DiaryEntryTag);
    exports.DI.userRepository = exports.DI.orm.em.getRepository(entities_1.User);
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        core_1.RequestContext.create(exports.DI.orm.em, next);
    });
    app.get('/', (req, res) => {
        res.json({ msg: "hello world" });
    });
    exports.DI.server = app.listen(PORT, () => {
        console.log(`server started on localhost: http://localhost:${PORT}`);
    });
});
exports.initializeServer = initializeServer;
