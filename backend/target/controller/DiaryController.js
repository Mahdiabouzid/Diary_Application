"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send('GET from controller');
});
router.post("/", (req, res) => {
    res.send('POST from controller');
});
router.delete("/", (req, res) => {
    res.send('DELETE from controller');
});
router.put("/", (req, res) => {
    res.send('hello from controller');
});
exports.DiaryController = router;
