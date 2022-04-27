const User=require("../models/user.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports={
    register: (req,res)=>{
        const user = new User(req.body);
        user.save()
        .then((newUser)=>{
            console.log(newUser);
            res.json({
                successMessage: "registration complete",
                user:newUser
            })
        }).catch((err)=>{
            console.log("registration failed")
            res.status(400).json(err)
        })
    },
    login: async(req,res)=>{
        const user = await User.findOne({email:req.body.email})
        if(user===null){
            return res.sendStatus(400);
        }

        const correctPassword = await bcrypt.compare(req.body.password,user.password)

        if(!correctPassword){
            return res.sendStatus(400);
        }

        res.cookie("usertoken",
            // Json webtoken payload info below
            jwt.sign({
            id:user._id,
            email:user.email,
            username: user.username
        },process.env.JWT_SECRET),{
           httpOnly:true,
           expires: new Date(Date.now()+900000000) 
        }
        ).json({
            message:"Success",
            userLoggedIn:user.username
        })
    },
    logout:(req,res)=>{
        res.clearCookie("usertoken");
        res.json({
            message:"You have successfully logged out"
        });
    },
    getLoggedUser:(req,res)=>{
        const decodedJWT= jwt.decode(req.cookies.usertoken,{complete:true})
        User.findOne({_id:decodedJWT.payload.id})
        .then((user)=>{
            console.log(user);
            res.json(user)
        }).catch((err)=>{console.log(err)})
    },
    findAllUsers:(req,res)=>{
        User.find().sort({username:-1}).then((allUsers)=>{
            console.log(allUsers)
            res.json(allUsers);
        }).catch((err)=>{res.json({message:"error in findAll", error:err})});
    },
    findOneUser:(req,res)=>{
        User.findOne({_id: req.params.id})
        .then((thisUser)=>{
            console.log(thisUser)
            res.json(thisUser)
        }).catch((err)=>{res.json({message:"error in findOneUserr",error:err})});
    }
}