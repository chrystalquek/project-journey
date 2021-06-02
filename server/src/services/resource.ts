import Resource, { ResourceData } from '../models/Resource';

const createResource = async (resourceData: ResourceData): Promise<void> => {
  try {
    const resourceSchemaData = new Resource({
      name: resourceData.name,
      url: resourceData.url,
      resourceType: resourceData.resourceType,
    });
    await resourceSchemaData.save();
  } catch (err) {
    throw new Error(err.msg);
  }
};

const getResource = async (id: string): Promise<ResourceData> => {
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
  getResource,
  updateResource,
  deleteResource,
};
