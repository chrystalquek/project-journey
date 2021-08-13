import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HTTP_CODES from "../constants/httpCodes";
import { accessTokenSecret } from "../helpers/auth";
import volunteerService from "../services/volunteer";
import { LoginRequest, UpdatePasswordRequest } from "../types/request/user";
import { LoginResponse, UpdatePasswordResponse } from "../types/response/user";
import userService from "../services/user";
import { removeUserId } from "../helpers/volunteer";

const login = async (req: LoginRequest, res: LoginResponse): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (bcrypt.compareSync(password, user.password)) {
      const volunteer = removeUserId(
        await volunteerService.getVolunteer(email)
      );

      const token = jwt.sign(
        JSON.parse(JSON.stringify(volunteer)),
        accessTokenSecret,
        {
          expiresIn: "24h",
        }
      );

      res.status(HTTP_CODES.OK).json({
        token,
      });
    } else {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
        errors: [
          {
            message: "Password is incorrect, please try again",
          },
        ],
      });
    }
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: error.message,
    });
  }
};

// TODO can remove?
const updatePassword = async (
  req: UpdatePasswordRequest,
  res: UpdatePasswordResponse
): Promise<void> => {
  const { email, newPassword } = req.body;

  try {
    const user = await userService.getUserByEmail(email);

    // should not be same as old password
    if (!bcrypt.compareSync(newPassword, user.password)) {
      await userService.updateUser(user._id, { password: newPassword });
      res.status(HTTP_CODES.OK).send();
    } else {
      res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
        errors: [
          {
            message: "Password is the same, please enter a new password",
          },
        ],
      });
    }
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

export default {
  login,
  updatePassword,
};
