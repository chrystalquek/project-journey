import express from "express"
import { checkUserExists, readAllUsers } from "../services/user"

import HTTP_CODES from '../constants/httpCodes'
import { accessTokenSecret } from "../helpers/auth";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const getAllUsers = async (req: express.Request, res: express.Response) => {
    const users = await readAllUsers();
    res.json({
      users,
    });
}

const login = async (req: express.Request, res: express.Response) => {
    // Read username and password from request body
    const { full_name, password } = req.body;
    
    const user = await checkUserExists(full_name);

    if (user) {
        if (password == user.password || bcrypt.compareSync(password, user.password)) { // should remove password == user.password check eventually
            const token = jwt.sign({ user }, accessTokenSecret, {
              expiresIn: "24h"
            });
        
            res.json({
              token,
            });
        } else {
            res.status(HTTP_CODES.UNAUTHENTICATED).json({
                errors: [{ msg: "Unauthenticated"}]
            });
        }
    } else {
        res.send('Username or password incorrect');
    }
};

export default {
    getAllUsers,
    login
}