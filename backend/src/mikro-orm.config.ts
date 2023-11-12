import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { DiaryEntry, DiaryEntryTag, User } from "./entities";

/**
 * MikroORM options
 */
const options: Options = {
    type: 'postgresql',
    entities: [User, DiaryEntry, DiaryEntryTag],
    dbName: 'diaryDB',          // like in docker-compose
    password: 'mahdi_project',  // like in docker-compose
    user: 'diaryDBUser',        // like in docker-compose
    highlighter: new SqlHighlighter(),
    debug: true,
  };
  
export default options;

