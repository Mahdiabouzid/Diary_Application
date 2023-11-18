import { Router } from "express";
import { DI } from "..";
import { CreateDiaryEntryDTO, CreateDiaryEntrySchema, DiaryEntry } from "../entities";

const router = Router();

router.get("/", async (req, res) => {
    // populate: to send user data with the entry
    const diaryentires = await DI.diaryEntryRepository.find({creator: req.user}, {populate: ["creator"]});
    return res.status(200).json(diaryentires);
});

router.post("/", async (req, res) => {
     //check if data is valid
     const validateData = await CreateDiaryEntrySchema.validate(req.body).catch((e) => {
        res.status(400).json({ errors: e.errors});
    });

    if(!validateData) {
        return;
    }

    //create new Diary entry
    const createDiaryEntryDTO: CreateDiaryEntryDTO = {
        ...validateData,
        creator: req.user!
    };
    const diaryEntry = new DiaryEntry(createDiaryEntryDTO);
    //persist
    await DI.diaryEntryRepository.persistAndFlush(diaryEntry);
    //return resposne
    return res.status(201).json(diaryEntry);
});

router.delete("/:id", async (req, res) => {
    const existingEntry = await DI.diaryEntryRepository.find({id: req.params.id, creator: req.user});
    if (!existingEntry) {
    res.status(403).json({errors: ['you cant delete this id']});
    }

    await DI.diaryEntryRepository.remove(existingEntry);
    return res.status(204);
});

router.put("/", (req, res) => {
    res.send('hello from controller');
});

export const DiaryController = router;

