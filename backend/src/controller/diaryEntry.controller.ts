import { Router } from "express";
import { DI } from "..";
import { CreateDiaryEntryDTO, CreateDiaryEntryDTOTag, CreateDiaryEntrySchema, DiaryEntry } from "../entities";
import { wrap } from "@mikro-orm/core";

const router = Router();

router.get("/", async (req, res) => {
    // populate: to send user data with the entry
    const diaryentires = await DI.diaryEntryRepository.find({creator: req.user}, {populate: ["creator", "tags"]});
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

    //if entry has tags in it
    if (createDiaryEntryDTO.tags) {
        //iterate over the tags and categorize them
        const {tagIds, tagsWithName} = createDiaryEntryDTO.tags.reduce<{
            tagIds: string[]; tagsWithName: CreateDiaryEntryDTOTag[];}>(
            (prev: {tagIds: string[]; tagsWithName: CreateDiaryEntryDTOTag[]}, curTag: CreateDiaryEntryDTOTag) => {
            if (curTag.id) {
            prev.tagIds.push(curTag.id);    
            return prev;        
            }
            //
            if (curTag.name) {
                curTag = {...curTag, creator: req.user!};
                prev.tagsWithName.push(curTag);
                return prev;
            }
            return prev;
        }, {tagIds: [], tagsWithName: [],
        });
        
        // fetch existing tags with their ids
        const loadedTags = await DI.diaryEntryTagRepository.find({id: {$in: tagIds}});
        const mergedTags = [...loadedTags, ...tagsWithName];
        wrap(diaryEntry).assign({ tags: mergedTags }, { em: DI.em });

        //persist
        await DI.diaryEntryRepository.persistAndFlush(diaryEntry);
        await DI.diaryEntryRepository.populate(diaryEntry, ['tags']);
    }
    else {
        await DI.diaryEntryRepository.persistAndFlush(diaryEntry);
      }
    //return resposne
    return res.status(201).json(diaryEntry);
});

router.delete("/:id", async (req, res) => {
    const existingEntry = await DI.diaryEntryRepository.find({id: req.params.id, creator: req.user});
    if (!existingEntry) {
     return res.status(403).json({ errors: ['you cant delete this id'] });
    }
    
    await DI.diaryEntryRepository.remove(existingEntry).flush();
    return res.status(204);
});

router.put("/:id", async (req, res) => {
    try {
        //load entry and populate with tags
        const diaryEntry = await DI.diaryEntryRepository.findOne(req.params.id, {
          populate: ['tags'],
        });
    
        if (!diaryEntry) {
          return res.status(404).send({ message: 'DiaryEntry not found' });
        }
        //update entry
        wrap(diaryEntry).assign(req.body);
        await DI.diaryEntryRepository.flush();
    
        return res.status(201).json(diaryEntry);
      } catch (e: any) {
        return res.status(400).send({ errors: [e.message] });
      }
});

export const DiaryController = router;

