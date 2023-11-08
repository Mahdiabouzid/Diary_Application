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
exports.LoginSchema = exports.RegisterUserSchema = exports.User = void 0;
const yup_1 = require("yup");
const core_1 = require("@mikro-orm/core");
const BaseEntity_1 = require("./BaseEntity");
const index_1 = require("./index");
let User = class User extends BaseEntity_1.BaseEntity {
    constructor({ lastName, firstName, email, password }) {
        super();
        this.diaryEntries = new core_1.Collection(this);
        this.tags = new core_1.Collection(this);
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
};
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)({ hidden: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, core_1.OneToMany)(() => index_1.DiaryEntry, (e) => e.creator),
    __metadata("design:type", Object)
], User.prototype, "diaryEntries", void 0);
__decorate([
    (0, core_1.OneToMany)(() => index_1.DiaryEntryTag, (e) => e.creator),
    __metadata("design:type", Object)
], User.prototype, "tags", void 0);
User = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], User);
exports.User = User;
exports.RegisterUserSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().required(),
    password: (0, yup_1.string)().required(),
    firstName: (0, yup_1.string)().required(),
    lastName: (0, yup_1.string)().required(),
});
exports.LoginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().required(),
    password: (0, yup_1.string)().required(),
});
