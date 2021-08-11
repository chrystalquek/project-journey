import jwt from "express-jwt";
import { Request, Response, NextFunction } from "express";
import ac from "./accessControl";
import { Conditions } from "../types/authentication/condition";
import { accessTokenSecret } from "./auth";
import eventService from "../services/event";
import signUpService from "../services/signUp";
import HTTP_CODES from "../constants/httpCodes";
import { SignUpData } from "../models/SignUp";

export const authorize = () => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
];

export const isNotAdmin =
  () =>
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.volunteerType === "admin") {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }
    next();
  };

export const canSignUp = () => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    const event = await eventService.getEvent(req.body.eventId);
    if (
      req.user.volunteerType === "ad-hoc" &&
      event.volunteerType === "committed"
    ) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }
    next();
  },
];

export const canReadSignUp = () => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    let signUp: SignUpData[] = [];
    if (req.params.idType === "signUpId") {
      signUp = await signUpService.getSignUps(req.params.id, req.params.idType);
    }
    if (
      req.user.volunteerType !== "admin" &&
      ((req.params.idType === "userId" && req.params.id !== req.user._id) ||
        req.params.idType === "eventId" ||
        (req.params.idType === "signUpId" &&
          req.user._id !== signUp[0].userId.toString()))
    ) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }
    next();
  },
];

export const canUpdateSignUp = canReadSignUp;

export const canDeleteSignUp = canReadSignUp;

export const canReadEvent = () => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    const event = await eventService.getEvent(req.params.id);
    if (
      event.volunteerType === "committed" &&
      req.user.volunteerType === "ad-hoc"
    ) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }
    next();
  },
];

export const canAnswerFormQuestions = () => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response, next: NextFunction) => {
    const { answers } = req.body;

    if (answers.some((answer) => answer.userId !== req.user._id)) {
      // trying to submit responses that are not your user id is not allowed
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }
    next();
  },
];

export const canRead = (resource: string, conditions?: Conditions) => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),

  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    let permitted = ac.can(req.user.volunteerType).readAny(resource).granted;

    if (conditions) {
      let ownPermission = ac
        .can(req.user.volunteerType)
        .readOwn(resource).granted;
      conditions.forEach((condition) => {
        const { firstAttribute, firstValue, secondAttribute, secondValue } =
          condition;
        ownPermission =
          ownPermission &&
          req[firstAttribute][firstValue] === req[secondAttribute][secondValue];
      });

      permitted = permitted || ownPermission;
    }

    if (!permitted) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }

    next();
  },
];

export const canUpdate = (resource: string, conditions?: Conditions) => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),

  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    let permitted = ac.can(req.user.volunteerType).updateAny(resource).granted;

    if (conditions) {
      let ownPermission = ac
        .can(req.user.volunteerType)
        .updateOwn(resource).granted;
      conditions.forEach((condition) => {
        const { firstAttribute, firstValue, secondAttribute, secondValue } =
          condition;
        ownPermission =
          ownPermission &&
          req[firstAttribute][firstValue] === req[secondAttribute][secondValue];
      });

      permitted = permitted || ownPermission;
    }

    if (!permitted) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }

    next();
  },
];

export const canDelete = (resource: string, conditions?: Conditions) => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),

  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    let permitted = ac.can(req.user.volunteerType).deleteAny(resource).granted;

    if (conditions) {
      let ownPermission = ac
        .can(req.user.volunteerType)
        .deleteOwn(resource).granted;
      conditions.forEach((condition) => {
        const { firstAttribute, firstValue, secondAttribute, secondValue } =
          condition;
        ownPermission =
          ownPermission &&
          req[firstAttribute][firstValue] === req[secondAttribute][secondValue];
      });

      permitted = permitted || ownPermission;
    }

    if (!permitted) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }

    next();
  },
];

export const canCreate = (resource: string, conditions?: Conditions) => [
  jwt({ secret: accessTokenSecret, algorithms: ["HS256"] }),

  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    let permitted = ac.can(req.user.volunteerType).createAny(resource).granted;

    if (conditions) {
      let ownPermission = ac
        .can(req.user.volunteerType)
        .createOwn(resource).granted;
      conditions.forEach((condition) => {
        const { firstAttribute, firstValue, secondAttribute, secondValue } =
          condition;
        ownPermission =
          ownPermission &&
          req[firstAttribute][firstValue] === req[secondAttribute][secondValue];
      });

      permitted = permitted || ownPermission;
    }

    if (!permitted) {
      return res
        .status(HTTP_CODES.UNAUTHENTICATED)
        .json({ message: "Unauthorized" });
    }

    next();
  },
];
