import { Router } from "express";
import { RegisterUserSchema } from "../entities";
import {object, string} from 'yup';
import { DI } from "..";
const router = Router();

router.post("/login", (req, res) => {

});

const UserDto = object({
    email: string().required()
});
router.post("/register", async (req, res) => {
    const validateData = await UserDto.validate(req.body).catch((e) => {
        res.status(400).json({ errors: e.errors});
    });

    if(!validateData) {
        return;
    }
    console.log(validateData);
    const user = await DI.userRepository.findOne({email: validateData.email});
    if (user) {
        return res.status(400).json({errors: "user exists"});
    }
    console.log(validateData);
    return res.send("Register");
});

export const AuthController = router;