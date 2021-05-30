import { Request, Response } from 'express';
import { ResourceData } from '../types';
import HTTP_CODES from '../constants/httpCodes';
import resourceService from '../services/resource';

const createResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const resourceData: ResourceData = req.body;
    await resourceService.createResource(resourceData);
    res.status(HTTP_CODES.OK).send('Resource data created');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const getResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = await resourceService.getResource(req.params.id);
    res.status(HTTP_CODES.OK).json(resource);
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const updateResource = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedFields: ResourceData = req.body;

    await resourceService.updateResource(id, updatedFields);

    res.status(HTTP_CODES.OK).send('Resource data updated');
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

const deleteResource = async (req: Request, res: Response): Promise<void> => {
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
  getResource,
  updateResource,
  deleteResource,
};
