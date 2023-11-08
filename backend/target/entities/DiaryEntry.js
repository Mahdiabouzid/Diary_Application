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
exports.CreateDiaryEntrySchema = exports.DiaryEntry = void 0;
const yup_1 = require("yup");
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const index_1 = require("./index");
const User_1 = require("./User");
let DiaryEntry = class DiaryEntry extends BaseEntity_1.BaseEntity {
    constructor({ title, content, creator }) {
        super();
        this.tags = new core_1.Collection(this);
        this.title = title;
        this.content = content;
        this.creator = creator;
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], DiaryEntry.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], DiaryEntry.prototype, "content", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => index_1.DiaryEntryTag),
    __metadata("design:type", Object)
], DiaryEntry.prototype, "tags", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => User_1.User, { nullable: true, cascade: [] }),
    __metadata("design:type", User_1.User)
], DiaryEntry.prototype, "creator", void 0);
DiaryEntry = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], DiaryEntry);
exports.DiaryEntry = DiaryEntry;
exports.CreateDiaryEntrySchema = (0, yup_1.object)({
    title: (0, yup_1.string)().required(),
    content: (0, yup_1.string)().required(),
});
