import mongoose from 'mongoose';
import { ResourceData } from '../types';
import Resource from '../models/Resource';
import emailService from '../services/email';
import generateDummyUser from '../dummy/user';
import generateDummyEvent from '../dummy/event';

const createResource = async (resourceData: ResourceData): Promise<void> => {
  try {
    const resourceSchemaData = new Resource({
      _id: new mongoose.Types.ObjectId(),
      name: resourceData.name,
      url: resourceData.url,
      createdAt: Date.now(),
      type: resourceData.type,
    });
    await resourceSchemaData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

const readResource = async (id: string): Promise<ResourceData> => {
  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error('Resource is not found.');
    }

    return resource;
  } catch (err) {
    throw new Error(err.msg);
  }
};

const updateResource = async (
  id: string,
  updatedFields: ResourceData,
): Promise<void> => {
  try {
    await Resource.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true },
    );
  } catch (err) {
    throw new Error(err.msg);
  }
};

const deleteResource = async (id: string): Promise<void> => {
  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      throw new Error("Resource can't be found");
    }

    await resource.remove();
  } catch (err) {
    throw new Error(err.msg);
  }
};

export default {
  createResource,
  readResource,
  updateResource,
  deleteResource,
};
