import express from "express";
import resourceController from "../controllers/resource";

const router = express.Router();

// @route   GET /resource/:id
// @desc    Get resource by id
// @access  Public
router.get("/:id", resourceController.readResource);

// @route   DELETE /resource
// @desc    Delete a resource by id
// @access  Public
router.delete("/:id", resourceController.deleteResource);

// @route   PUT /resource
// @desc    Update a resource by id
// @access  Public
router.put("/:id", resourceController.updateResource);

// @route   POST /resource
// @desc    Post a new resource
// @access  Public
router.post(
    "/",
    resourceController.validate("createResource"),
    resourceController.createResource
);

export default router;
