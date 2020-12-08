import express from 'express';
import { body, validationResult } from 'express-validator/check';
import { SignUpData, SignUpIdType } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import signUpService from '../services/signUp';

export type SignUpValidatorMethod = 'createSignUp';

const validate = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp': {
      return [
        body('eventId', 'event id does not exist').exists(),
        body('userId', 'user id does not exist').exists(),
        body('status', 'status does not exist').exists(),
        body('preferences', 'preferences does not exist').exists(),
        body('isRestricted', 'is restricted does not exist').exists(),
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  try {
    await signUpService.createSignUp(req.body as SignUpData);
    res.status(HTTP_CODES.OK).send('Sign up data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

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

    res.status(HTTP_CODES.OK).send('Sign up data updated');
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
    res.status(HTTP_CODES.OK).send('Sign up data deleted');
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
