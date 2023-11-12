import { Router } from "express";
import { RegisterUserDTO, RegisterUserSchema, User } from "../entities";
import { DI } from "..";
const router = Router();

router.post("/login", (req, res) => {

});

router.post("/register", async (req, res) => {

    //check if data is valid
    const validateData = await RegisterUserSchema.validate(req.body).catch((e) => {
        res.status(400).json({ errors: e.errors});
    });

    if(!validateData) {
        return;
    }

    //check if user exists in databse
    const existingUser = await DI.userRepository.findOne({email: validateData.email});
    if (existingUser) {
        return res.status(400).json({errors: "user exists"});
    }
    console.log(validateData);

    //create new User
    const registerData: RegisterUserDTO = validateData;
    const newUser = new User(registerData);

    //persist to databse
    await DI.userRepository.persistAndFlush(newUser);
    return res.status(201).json(newUser);
});

export const AuthController = router;