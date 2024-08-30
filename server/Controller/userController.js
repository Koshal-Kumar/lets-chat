import User from "../modals/userModal.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY  ||"mycodeiskoshal";
const salt = await bcrypt.genSalt(10);

const generateToken = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: '30d' // Token expiry time can be set as needed
    });
};

export const register = async (req, res) => {
    const { name, email, password, picture } = req.body;

    if (!name || !email || !password) {
        console.log("missing data")
        return res.status(400).json({ success: false, message: 'Please enter all required fields' });
    }

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log("user exist")
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            picture
        });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                },
                token: generateToken(user._id)
            });
            console.log("user created")
        } else {
            res.status(500).json({ success: false, message: 'Unable to register user' });
            console.log("falied user registration")
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error.message)
    }
};


export const login = async(req, res) => {
    const {email,password} = req.body;

    const userExists = await User.findOne({email})
    const decodepassword = bcrypt.compare(userExists.password,password )

    try {
        if(userExists){
            if(decodepassword){
            res.status(201).send({
                success: true,
                data : userExists,
                message: "login successful",
                token: generateToken(userExists._id)
            })
        }
        else{
            res.status(500).send({
                success: false,
                message: "password mismatch"
            })
        }
        }
        else{
            res.status(500).send({
            success: false,
            message: "Login failed"
        })
    }
        
    } catch (error) {
        res.send({
            success: false,
            message: "Login failed2"
        })
    }
    
}

export const allUsers =async(req, res, next) => {
    const keywords = req.query.search?{
        $or: [
            {   name : {$regex : req.query.search , $options : 'i'}},
             {   email : {$regex : req.query.search , $options : 'i'}}
       
        ]
    }:{}

    const users = await User.find(keywords).find({_id: {$ne : req.user._id}})

    res.status(200).send({data : users,
        success: true,

    })
    
}