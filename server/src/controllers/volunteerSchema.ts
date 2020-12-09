import express from 'express';
import { body, validationResult } from 'express-validator';

import HTTP_CODES from '../constants/httpCodes';
import { addField, getAllFields, updateField } from '../services/volunteerSchema';
import {
  CreateVolunteerFieldResponse,
  DeleteVolunteerFieldResponse,
  GetAllVolunteersFieldsResponse,
  ResponseJSON, UpdateVolunteerFieldResponse,
} from '../types';

export type VolunteerSchemaMethod =
  'createNewVolunteerField' |
  'deleteVolunteerField' |
  'getAllVolunteerFields' |
  'updateVolunteerField'

const validate = (method: VolunteerSchemaMethod) => {
  switch (method) {
    case 'createNewVolunteerField': {
      return [
        body('name', 'field "name" does not exist').isString(),
        body('fieldType', 'field "fieldType" field does not exist').isString(),
      ];
    }
    case 'deleteVolunteerField': {
      return [
        body('name', 'name does not exist').isString(),
      ];
    }
    case 'getAllVolunteerFields': {
      return [];
    }
    case 'updateVolunteerField': {
      return [
        body('name', 'Field "name" does not exist').isString(),
        body('newName').optional(),
        body('fieldType').optional(),
      ];
    }
    default:
      return [];
  }
};

const createNewVolunteerField = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  try {
    await addField(request.body.name, request.body.fieldType);
    response.status(HTTP_CODES.OK).json({
    } as CreateVolunteerFieldResponse);
  } catch (err) {
    response.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ message: err.message }],
    } as ResponseJSON);
  }
};

const deleteVolunteerField = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    });
    return;
  }

  try {
    await addField(request.body.name, request.body.fieldType);
    response.status(HTTP_CODES.OK).json({
    } as DeleteVolunteerFieldResponse);
  } catch (err) {
    response.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ message: err.message }],
    } as ResponseJSON);
  }
};

const getAllVolunteerFields = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    } as ResponseJSON);
    return;
  }

  try {
    const fields = await getAllFields();
    response.status(HTTP_CODES.OK).json({
      data: fields,
    } as GetAllVolunteersFieldsResponse);
  } catch (err) {
    response.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ message: err.message }],
      message: 'Server Error',
    } as ResponseJSON);
  }
};

const updateVolunteerField = async (
  request: express.Request,
  response: express.Response,
): Promise<void> => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
      errors: errors.array(),
    } as ResponseJSON);
    return;
  }

  try {
    await updateField(
      request.body.name,
      request.body.newName,
      request.body.fieldType,
    );
    response.status(HTTP_CODES.OK).json({
    } as UpdateVolunteerFieldResponse);
  } catch (err) {
    response.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ message: err.message }],
    });
  }
};

export default {
  createNewVolunteerField,
  getAllVolunteerFields,
  deleteVolunteerField,
  updateVolunteerField,
  validate,
};
