const express = require("express");
const router = express.Router();
import { User } from '../model/user';
import { UserEvent } from '../model/userEvent';
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

// create user
router.post("/auth/register",async (req: any, res: any) => {
  try {
    const { email, password, name } = req.body;

    const isEmailAllReadyExist = await User.findOne({
      email: email,
    });

    // ** Add a condition if the user exist we will send the response as email all ready exist
    if (isEmailAllReadyExist) {
      res.status(400).json({
        status: 400,
        message: "Email all ready in use",
      });
      return;
    }

    const user = await User.create({ email, password, name });

    res.status(201).json({ user });
  } catch (error: any) {
     // console the error to debug
    console.log(error);

    // Send the error message to the client
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

router.post("/auth/login", async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).json({
        status: 400,
        message: "User not found",
      });
      return;
    }
    
    const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

    // res.status(200).json({ user });
    await UserEvent.create({
      user_id: user._id,
      event: "login",
      description: "User login successfully",
    });

    sendToken(user, 200, res);
  }
  catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

// load user
router.get("/", isAuthenticated, async (req: any, res: any) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(400).json({
        status: 400,
        message: "User not found",
      });
      return;
    }

    // show only email id name
    res.status(200).json({ user });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

// create logout
router.post("/auth/logout", isAuthenticated, async (req: any, res: any) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    await UserEvent.create({
      user_id: req.user.id,
      event: "logout",
      description: "User logout successfully",
    });

    res.status(200).json({
      status: 200,
      message: "Logout successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});



module.exports = router;