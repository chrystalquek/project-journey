import express from 'express';
import { body } from 'express-validator';
import { signUpStatusValidator } from '../helpers/validation';
import signUpService from '../services/signUp';
import { SignUpData, SignUpIdType, SignUpStatus } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';

export type SignUpValidatorMethod = 'createSignUp' | 'updateSignUp';

const getValidations = (method: SignUpValidatorMethod) => {
  switch (method) {
    case 'updateSignUp':
    case 'createSignUp': {
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
 * @param req.body sign up data without the signUpId field
 */
const createSignUp = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const event = await eventService.readEvent(req.body.eventId);
    if (req.user._id !== req.body.userId || (req.user.volunteerType === 'ad-hoc' && event.volunteerType === 'committed')) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

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
 * Retrieves sign ups that are pending approval
 * @return sign ups that are pending approval
 */
const readPendingSignUps = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const pendingSignUps = await signUpService.readPendingSignUps();

    res.status(HTTP_CODES.OK).json({ data: pendingSignUps });
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
    let { idType } = req.params;
    const { id } = req.params;
    idType = idType as SignUpIdType;

    switch (idType) {
      case 'signUpId': {
        const signUps = await signUpService.readSignUps(id, idType as SignUpIdType);
        if (signUps.length !== 1) {
          throw Error('Sign up does not exist');
        }

        // check that deleting your own signup
        if (signUps[0].userId !== req.user._id) {
          res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
          return;
        }
        break;
      }
      case 'eventId' || 'userId': {
        // after admin delete an event or a volunteer
        if (req.user.volunteerType !== 'admin') {
          res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
          return;
        }
        break;
      }
      default: {
        throw Error('problem');
      }
    }

    await signUpService.deleteSignUp(id, idType);
    res.status(HTTP_CODES.OK).send('Sign up deleted and event updated');
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
