const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const UserSchema = new mongoose.Schema({
	username : { type: String, required: [true, "Username is required."]},
    password: { type: String, required: [true, "Password is required, min 12 characters."], minlength: [8, "Password must be 8 characters or longer"]},
    email: { type: String, 
        required: [ true, "Email is required."],
        //validate: { validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val), message: "Please enter a valid email"}
    },
}, { timestamps: true, versionKey: false});

UserSchema.virtual("confirmPassword")
.get(()=>this._confirmPassword)
.set((value)=>this._confirmPassword=value);

UserSchema.pre("validate",function(next){
    if(this.password!== this.confirmPassword){
        this.invalidate("confirmPassword","Passwords must match")
    }
    next();
})

UserSchema.pre("save",function(next){
    bcrypt.hash(this.password,10)
    .then((hashed)=>{
        this.password=hashed;
        next();
    })
})

const User = mongoose.model("User",UserSchema)
module.exports=User;