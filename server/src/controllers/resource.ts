import express from "express";
import { ResourceData } from "../types";
import { body, validationResult } from "express-validator/check";
import HTTP_CODES from "../constants/httpCodes";
import resourceService from "../services/resource";

export type ResourceValidatorMethod = "createResource";

const validate = (method: ResourceValidatorMethod) => {
    switch (method) {
        case "createResource": {
            return [
                body("name", "name does not exist").exists(),
                body("url", "url is invalid").isURL(),
                body("type", "type does not exist").exists(),
            ];
        }
    }
};

const createResource = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
            errors: errors.array(),
        });
        return;
    }

    try {
        await resourceService.createResource(req.body as ResourceData);
        res.status(202).send("Resource data created");
    } catch (err) {
        res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
};

const readResource = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        const resource = await resourceService.readResource(req.params.id);
        res.status(202).json(resource);
    } catch (err) {
        res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
};

const updateResource = async (req: express.Request, res: express.Response) => {
    try {
        const id = req.params.id;
        const updatedFields = req.body as ResourceData;

        await resourceService.updateResource(id, updatedFields);

        res.status(202).send("Resource data updated");
    } catch (err) {
        res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
};

const deleteResource = async (req: express.Request, res: express.Response) => {
    try {
        await resourceService.deleteResource(req.params.id);
        res.status(202).send("Resource data deleted");
    } catch (err) {
        res.status(500).json({ errors: [{ msg: "Server error" }] });
    }
};
export default {
    createResource,
    readResource,
    updateResource,
    deleteResource,
    validate,
};
