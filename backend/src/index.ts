import express from "express"
import { MikroORM, EntityManager, EntityRepository, RequestContext } from '@mikro-orm/core';
import http from 'http';
import { DiaryController } from "./controller/DiaryController";
import { DiaryEntry, User, DiaryEntryTag } from "./entities";

const PORT = 4000;
const app = express();

//Setting MikroOrm via Dependency Injection
export const DI = {} as {
    server: http.Server;
    orm: MikroORM;
    em: EntityManager;
    diaryEntryRepository: EntityRepository<DiaryEntry>;
    diaryEntryTagRepository: EntityRepository<DiaryEntryTag>;
    userRepository: EntityRepository<User>;
  };

export const initializeServer = async () => {
    //DI setup
    DI.orm = await MikroORM.init();
    DI.em = DI.orm.em;
    DI.diaryEntryRepository = DI.orm.em.getRepository(DiaryEntry);
    DI.diaryEntryTagRepository = DI.em.getRepository(DiaryEntryTag);
    DI.userRepository = DI.orm.em.getRepository(User);

    app.use(express.json());
    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next);
      });

    app.get('/',(req,res) => {
        res.json({msg: "hello world"});
    });

    DI.server = app.listen(PORT, () => {
        console.log(`server started on localhost: http://localhost:${PORT}`);
    });
};

initializeServer();
