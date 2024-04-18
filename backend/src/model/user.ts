const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,    
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLenght: [6, 'Password must have at least 6 characters'],      
    },
    createdAt:{
      type: Date,
      default: Date.now(),
     },
  });

  //  Hash password
  userSchema.pre("save", async function (this: any, next: any) {
    const user = this;

    if (!user.isModified("password")) {
      next();
      return;
    }

    user.password = await bcrypt.hash(user.password, 10);
    next();
  });
  

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRES,
  });
};
// change env is in src/config/.env

// compare password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("Users", userSchema);