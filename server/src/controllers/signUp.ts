import express from 'express';
import { body, validationResult } from 'express-validator/check';
import { SignUpData, SignUpIdType, SignUpStatus } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import signUpService from '../services/signUp';
import {stringEnumValidator} from "../helpers/validation";
import {v4 as uuidv4} from "uuid";

export type SignUpValidatorMethod = 'createSignUp';

const validate = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').exists().isString(),
        body('userId', 'user id does not exist').exists().isString(),
        body('status', 'status does not exist').exists().isString().custom((statusText: string) => stringEnumValidator(SignUpStatus, 'Status', statusText)),
        body('preferences', 'preferences does not exist').exists().isArray().notEmpty(),
        body('isRestricted', 'is restricted does not exist').exists().isBoolean()
      ];
    }
    default: {
      return [];
    }
  }
};

const createSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  // TODO: move to middleware 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  try {
    const tempSignUp = req.body; 
    tempSignUp.externalId = uuidv4(); 

    const signUpData: SignUpData = tempSignUp; 

    await signUpService.createSignUp(signUpData);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves a sign up with the specified sign up, event, or volunteer id. 
 * @param params.id one of the ids in the sign up
 * @param params.idType type of the specified id
 */
const readSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { id, idType } = req.params;
    const signUp = await signUpService.readSignUp(id, idType as SignUpIdType);

    res.status(HTTP_CODES.OK).json(signUp);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, idType } = req.params;
    const updatedFields = req.body as SignUpData;

    await signUpService.updateSignUp(id, idType as SignUpIdType, updatedFields);

    res.status(HTTP_CODES.OK).send(); 
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, idType } = req.params;
    await signUpService.deleteSignUp(id, idType as SignUpIdType);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createSignUp,
  readSignUp,
  updateSignUp,
  deleteSignUp,
  validate,
};
