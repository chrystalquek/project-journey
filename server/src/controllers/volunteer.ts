import express from 'express';
import _ from 'lodash';
import jwt from 'express-jwt';
import { QueryParams, VolunteerData } from '../types';
import volunteerService from '../services/volunteer';
import commitmentApplicationService from '../services/commitmentApplication';

import HTTP_CODES from '../constants/httpCodes';

const createNewVolunteer = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // assuming we create a few fixed admin accounts for biab, should only be able to create ad-hoc
    if (req.body.volunteerType !== 'ad-hoc') {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    await volunteerService.addNewVolunteer(req.body as VolunteerData);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      ...error,
    });
  }
};

// BY EMAIL
const getVolunteerDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const volunteerDetails = await volunteerService.getVolunteer(
      req.params.email,
    );

    if (req.user._id !== volunteerDetails._id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

// BY ID
const getVolunteerDetailsById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    if (req.user._id !== req.params.id) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const volunteerDetails = await volunteerService.getVolunteerById(
      req.params.id,
    );
    res.status(HTTP_CODES.OK).json({
      data: volunteerDetails,
    });
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const getAllVolunteerDetails = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // handles both searching volunteers and returning all volunteers

    const pageNo = Number(req.query.pageNo);
    const size = Number(req.query.size);
    const query: QueryParams = { skip: 0, limit: 0 };
    if (pageNo < 0) {
      throw new Error('Invalid page number, should start with 0');
    }
    query.skip = size * pageNo;
    query.limit = size;

    if (req.query.name) {
      query.name = req.query.name;
    }
    if (req.query.volunteerType) {
      query.volunteerType = (req.query.volunteerType as string).split(',');
    }
    if (req.query.sort) {
      query.sort = req.query.sort;
    }
    const volunteersDetails = await volunteerService.getAllVolunteers(query);
    res.status(HTTP_CODES.OK).json(volunteersDetails);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

/**
 * Retrieves sign ups that are pending approval
 * @return number of pending sign ups
 */
const getPendingVolunteers = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const pendingCommitmentApplications = await
    commitmentApplicationService.readCommitmentApplications(
      'pending',
    );

    const pendingVolunteersIds = pendingCommitmentApplications.map(
      (commitmentApplication) => commitmentApplication.volunteerId,
    );

    const pendingVolunteers = await volunteerService.readVolunteersByIds(
      pendingVolunteersIds,
    );

    res.status(HTTP_CODES.OK).json({ data: pendingVolunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readVolunteersByIds = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const { ids } = req.body;
    const volunteers = await volunteerService.readVolunteersByIds(ids);

    res.status(HTTP_CODES.OK).json({ data: volunteers });
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const checkUpdateRights = () => [
  jwt({ secret: accessTokenSecret, algorithms: ['HS256'] }),

  (req, res, next) => {
    if (req.body.administratorRemarks && req.user.volunteeerType !== 'admin') {
      return res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
    }

    next();
  },
];

const updateVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    const volunteerId = req.params.id;
    if (req.user._id !== volunteerId) {
      res.status(HTTP_CODES.UNAUTHENTICATED).json({ message: 'Unauthorized' });
      return;
    }

    const savedVolunteerData = await volunteerService.updateVolunteer(
      volunteerId, req.body.updatedVolunteerData as Partial<VolunteerData>,
    );
    res.status(HTTP_CODES.OK).json(savedVolunteerData);
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

const removeVolunteer = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    await volunteerService.deleteVolunteer(email);
    res.status(HTTP_CODES.OK).send();
  } catch (error) {
    res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      message: error,
    });
  }
};

export default {
  createNewVolunteer,
  getVolunteerDetails,
  getVolunteerDetailsById,
  getAllVolunteerDetails,
  getPendingVolunteers,
  removeVolunteer,
  updateVolunteer,
  readVolunteersByIds,
};
