import signUpService from '../services/signUp';
import HTTP_CODES from '../constants/httpCodes';
import eventService from '../services/event';
import { SignUpData, SignUpIdType } from '../models/SignUp';
import { CreateSignUpRequest, DeleteSignUpRequest, GetPendingSignUpsRequest, GetSignUpsRequest, UpdateSignUpRequest } from '../types/request/signUp';
import { CreateSignUpResponse, DeleteSignUpResponse, GetPendingSignUpsResponse, GetSignUpsResponse, UpdateSignUpResponse } from '../types/response/signUp';

/**
 * Creates a new sign up
 * @param req.body sign up data without the signUpId field
 */
const createSignUp = async (req: CreateSignUpRequest, res: CreateSignUpResponse): Promise<void> => {
  try {
    const event = await eventService.getEvent(req.body.eventId);
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
const getSignUps = async (req: GetSignUpsRequest, res: GetSignUpsResponse): Promise<void> => {
  try {
    const { id, idType } = req.params;
    const userSignUpDetails: SignUpData[] = await signUpService.getSignUps(
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
const getPendingSignUps = async (req: GetPendingSignUpsRequest, res: GetPendingSignUpsResponse): Promise<void> => {
  try {
    const pendingSignUps = await signUpService.getPendingSignUps();

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
const updateSignUp = async (req: UpdateSignUpRequest, res: UpdateSignUpResponse): Promise<void> => {
  try {
    const { id, idType } = req.params;
    const updatedFields = req.body;

    const signUp = await signUpService.updateSignUp(id, idType, updatedFields);

    res.status(HTTP_CODES.OK).send(signUp);
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
const deleteSignUp = async (req: DeleteSignUpRequest, res: DeleteSignUpResponse): Promise<void> => {
  try {
    const { idType } = req.params;
    const { id } = req.params;

    switch (idType) {
      case 'signUpId': {
        const signUps = await signUpService.getSignUps(id, idType);
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
        throw Error('Unauthenticated');
      }
    }

    await signUpService.deleteSignUp(id, idType);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createSignUp,
  getSignUps,
  getPendingSignUps,
  updateSignUp,
  deleteSignUp,
};
