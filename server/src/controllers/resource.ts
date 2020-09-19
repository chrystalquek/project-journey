import express from "express";
import { ResourceData } from "../types";
import { addNewResource } from "../services/resource";
import { body, validationResult } from "express-validator/check";

import HTTP_CODES from "../constants/httpCodes";

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

const index = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(HTTP_CODES.UNPROCESSABLE_ENTITIY).json({
            errors: errors.array(),
        });
        return;
    }

    await addNewResource(req.body as ResourceData);
    return res.send("Resource data created");
};

export default {
    index,
    validate,
};
