import mongoose from "mongoose";
import { ResourceData } from "../types";
import Resource from "../models/Resource";

const createResource = async (resourceData: ResourceData): Promise<void> => {
    try {
        const resourceSchemaData = new Resource({
            _id: new mongoose.Types.ObjectId(),
            name: resourceData.name,
            url: resourceData.url,
            created_at: Date.now(),
            type: resourceData.type,
        });
        await resourceSchemaData.save();
    } catch (err) {
        throw new Error("Server error");
    }
};

const readResource = async (id: string): Promise<ResourceData> => {
    try {
        const resource = await Resource.findById(id);

        if (!resource) {
            throw new Error("Resource is not found.");
        }

        return resource;
    } catch (err) {
        throw new Error("Server error");
    }
};

const updateResource = async (
    id: string,
    updatedFields: ResourceData
): Promise<void> => {
    try {
        await Resource.findOneAndUpdate(
            { _id: id },
            { $set: updatedFields },
            { new: true }
        );
    } catch (err) {
        throw new Error("Server error");
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
        throw new Error("Server error");
    }
};

export default {
    createResource,
    readResource,
    updateResource,
    deleteResource,
};
