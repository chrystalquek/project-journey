import express from 'express';
import { ResourceData } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import resourceService from '../services/resource';

const createResource = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    await resourceService.createResource(req.body as ResourceData);
    res.status(HTTP_CODES.OK).send('Resource data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const readResource = async (
  req: express.Request,
  res: express.Response,
): Promise<void> => {
  try {
    const resource = await resourceService.readResource(req.params.id);
    res.status(HTTP_CODES.OK).json(resource);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateResource = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body as ResourceData;

    await resourceService.updateResource(id, updatedFields);

    res.status(HTTP_CODES.OK).send('Resource data updated');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteResource = async (req: express.Request, res: express.Response) => {
  try {
    await resourceService.deleteResource(req.params.id);
    res.status(HTTP_CODES.OK).send('Resource data deleted');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createResource,
  readResource,
  updateResource,
  deleteResource,
};
