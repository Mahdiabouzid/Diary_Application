"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const entities_1 = require("./entities");
const options = {
    type: 'postgresql',
    entities: [entities_1.User, entities_1.DiaryEntry, entities_1.DiaryEntryTag],
    dbName: 'diaryDB',
    password: 'mahdi_project',
    user: 'diaryDBUser',
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    debug: true,
};
exports.default = options;
