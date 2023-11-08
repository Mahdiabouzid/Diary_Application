import { Router } from "express";

const router = Router();

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

export const DiaryController = router;

