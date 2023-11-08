import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { DiaryEntry, DiaryEntryTag, User } from "./entities";

const options: Options = {
    type: 'postgresql',
    entities: [User, DiaryEntry, DiaryEntryTag],
    dbName: 'diaryDB',
    password: 'mahdi_project',
    user: 'diaryDBUser',
    highlighter: new SqlHighlighter(),
    debug: true,
  };
  
export default options;

