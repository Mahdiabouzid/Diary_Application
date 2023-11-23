import express from "express"
import { MikroORM, EntityManager, EntityRepository, RequestContext } from '@mikro-orm/core';
import http from 'http';
import { DiaryEntry, User, DiaryEntryTag } from "./entities";
import { AuthController } from "./controller/auth.controller";
import bodyParser from "body-parser";


const PORT = 4000;
const app = express();
const cors = require('cors');
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
    DI.diaryEntryTagRepository = DI.orm.em.getRepository(DiaryEntryTag);
    DI.userRepository = DI.orm.em.getRepository(User);

    // global middleware
    app.use(express.json());    // parse request to 
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());
    app.use((req,res, next) => {
        console.log(`${req.method} Request to ${req.path}`);
        next();
    });
    app.use((req, res, next) => {
        RequestContext.create(DI.orm.em, next);
      });
    
    //routes  
    app.use("/auth", AuthController);

    // starting the app from the DI
    DI.server = app.listen(PORT, () => {
        console.log(`server started on localhost: http://localhost:${PORT}`);
    });
};

initializeServer();
