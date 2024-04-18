import { User } from "../model/user";
import { Response } from 'express'; // Assuming Response is imported from 'express'

const sendToken = (user: typeof User, statusCode: number, res: Response) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,    
    secure: true,
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      user: {        
        email: user.email, // Assuming email is one of the fields of the user
        // Add other necessary fields you want to include in the response
      },
      token,
    });
};

module.exports = sendToken;
