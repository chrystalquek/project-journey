import mongoose from "mongoose";
import { ResourceData } from "../types";
import Resource from "../models/Resource";

export const addNewResource = async (resourceData: ResourceData) => {
    const resourceSchemaData = new Resource({
        _id: new mongoose.Types.ObjectId(),
        name: resourceData.name,
        url: resourceData.url,
        created_at: Date.now(),
        type: resourceData.type,
    });

    const result = await resourceSchemaData.save();
};
