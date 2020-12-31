import express from 'express';
import { body } from 'express-validator';
import { signUpStatusValidator } from '../helpers/validation';
import signUpService from '../services/signUp';
import { SignUpData, SignUpIdType, SignUpStatus } from '../types';
import HTTP_CODES from '../constants/httpCodes';

export type SignUpValidatorMethod = 'createSignUp' | 'updateSignUp';

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'createSignUp':
    case 'updateSignUp': {
      return [
        body('eventId', 'event id does not exist').isString(),
        body('userId', 'user id does not exist').isString(),
        body('status').custom((status: SignUpStatus) => signUpStatusValidator(status)),
        body('preferences', 'preferences does not exist').isArray().notEmpty(),
        body('isRestricted', 'is restricted does not exist').isBoolean(),
      ];
    }
    default: {
      return [];
    }
  }
};

/**
 * Creates a new sign up
 * @param req.body sign up data without the sign_up_id field
 */
const createSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const signUpData = await signUpService.createSignUp(req.body);
    res.status(HTTP_CODES.OK).json(signUpData);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves sign ups with the specified sign up, event, or volunteer id.
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 * @return userSignUpDetails the sign up data with the specified id
 */
const readSignUps = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { id, idType } = req.params;
    const userSignUpDetails: SignUpData[] = await signUpService.readSignUps(
      id, idType as SignUpIdType,
    );

    res.status(HTTP_CODES.OK).json({ data: userSignUpDetails });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Retrieves sign ups with that are pending approval
 * @return number of pending sign ups
 */
const readPendingSignUps = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const pendingSignUpsCount = await signUpService.readPendingSignUps();

    res.status(HTTP_CODES.OK).json({ count: pendingSignUpsCount });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Updates an existing sign up
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 * @param req.body the updated sign up data
 */
const updateSignUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, idType } = req.params;
    const updatedFields = req.body as SignUpData;

    await signUpService.updateSignUp(id as string, idType as SignUpIdType, updatedFields);

    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

/**
 * Deletes a sign up
 * @param req.params.id one of the ids in the sign up
 * @param req.params.idType type of the specified id
 */
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
  readSignUps,
  readPendingSignUps,
  updateSignUp,
  deleteSignUp,
  getValidations,
};
