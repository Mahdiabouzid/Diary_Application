import { Router } from "express";
import { LoginSchema, RegisterUserDTO, RegisterUserSchema, User } from "../entities";
import { DI } from "..";
import {Auth} from "../middlewares/authontication.middleware"
const router = Router();

router.post("/login", async (req, res) => {
     //check if data is valid
     const validateData = await LoginSchema.validate(req.body).catch((e) => {
        res.status(400).json({ errors: e.errors});
    });

    if(!validateData) {
        return;
    }
    //check if user exists in databse
    const user = await DI.userRepository.findOne({email: validateData.email});

    if (!user) {
        return res.status(400).json({errors: ['user does not exsist']});
    }

    const matchingPassword = await Auth.comparePasswordWithHash(validateData.password, user.password);
    if(!matchingPassword) {
        return res.status(401).json({errors: ['password does not match']});
        }
    
    //build token
    const jwt = Auth.generateToken({
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    })    

    //send response with token
    return res.status(200).json({accessToekn: jwt});

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
        return res.status(400).json({errors: "user already exists"});
    }

    //create new User
    const registerData: RegisterUserDTO = {
        ...validateData,
        password: await Auth.hashPassword(validateData.password),
      };
    const newUser = new User(registerData);

    //persist to databse
    await DI.userRepository.persistAndFlush(newUser);
    return res.status(201).json(newUser);
});

export const AuthController = router;