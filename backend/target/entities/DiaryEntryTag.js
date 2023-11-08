"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryEntryTag = void 0;
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const index_1 = require("./index");
const User_1 = require("./User");
let DiaryEntryTag = class DiaryEntryTag extends BaseEntity_1.BaseEntity {
    constructor(name) {
        super();
        this.diaryEntries = new core_1.Collection(this);
        this.name = name;
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], DiaryEntryTag.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => index_1.DiaryEntry, (e) => e.tags),
    __metadata("design:type", Object)
], DiaryEntryTag.prototype, "diaryEntries", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], DiaryEntryTag.prototype, "creator", void 0);
DiaryEntryTag = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [String])
], DiaryEntryTag);
exports.DiaryEntryTag = DiaryEntryTag;
