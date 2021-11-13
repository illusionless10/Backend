import bcrypt from 'bcrypt';
import { Model, User } from './model';
import { generateToken } from '../../shared/jwt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY;
const refeshTokenLife: string = process.env.REFESH_TOKEN_LIFE;
const accessTokenLife: string = process.env.ACCESS_TOKEN_LIFE;


export default class Service {

    public static async login(payload): Promise<any> {
        const username = payload.username;
        const password = payload.password;
        const foundUser = await Model.findOne({username: username});
        if (!foundUser || !bcrypt.compareSync(password, foundUser.hash)){
            return 'Username or password are wrong';
        }
        else {
            const refeshToken = await generateToken({_id: foundUser._id}, JWT_SECRET_KEY, refeshTokenLife);
            const accessToken = await generateToken({_id: foundUser._id}, JWT_SECRET_KEY, accessTokenLife);
            return {
                username: foundUser.username,
                email: foundUser.email,
                refeshToken: refeshToken,
                accessToken: accessToken,
            }
        }
    }

    public static async register(payload): Promise<any> {
        const id = new mongoose.Types.ObjectId();
        const username = payload.username;
        const email = payload.email;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(payload.password, salt);
        const foundData = await Model.find(
            {$or: [{username: username},{email: email}]},
            {username: 1, email: 1}
            );
        if (!foundData.length){
            await Model.create(<User>{
                _id: id,
                username: username,
                email: email,
                hash: hash,
                salt: salt,
                role: 'user'
            })
            const refeshToken = await generateToken({_id: id}, JWT_SECRET_KEY, refeshTokenLife);
            const accessToken = await generateToken({_id: id}, JWT_SECRET_KEY, accessTokenLife);
            return {
                username: username,
                email: email,
                refeshToken: refeshToken,
                accessToken: accessToken,
            }
        }
        return 'Username or email already exist';
    }

}