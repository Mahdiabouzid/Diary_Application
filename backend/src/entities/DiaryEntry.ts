import { object, string } from 'yup';

import { Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { DiaryEntryTag } from './index';
import { User } from './User';

@Entity()
export class DiaryEntry extends BaseEntity {
  @Property()
  title: string;

  @Property()
  content: string;

  @ManyToMany(() => DiaryEntryTag)
  tags = new Collection<DiaryEntryTag>(this);

  //nullable: true option allows a diary entry to exist without a creator
  //cascade: [] specifies that no automatic cascading operations (like save or delete) should be performed for the creator field.
  @ManyToOne(() => User, { nullable: true, cascade: [] })
  creator?: User;

  constructor({ title, content, creator }: CreateDiaryEntryDTO) {
    super();
    this.title = title;
    this.content = content;
    this.creator = creator;
  }
}

//yup validation
export const CreateDiaryEntrySchema = object({
  title: string().required(),
  content: string().required(),
});

/**
 * equivalent to:
  type CreateDiaryEntryDTOTag = {
  id?: number;
  name?: string;
  creator?: User;
};
 */
export type CreateDiaryEntryDTOTag = Partial<Pick<DiaryEntryTag, 'id' | 'name' | 'creator'>>;
export type CreateDiaryEntryDTO = {
  content: string;
  creator: User;
  tags?: CreateDiaryEntryDTOTag[];  // optional array of tags
  title: string;
};
