import express from 'express';
import resourceController from '../controllers/resource';
import authorize from '../helpers/authorize';
import { validate } from '../helpers/validation';

const router = express.Router();

// @route   GET /resource/:id
// @desc    Get resource by id
router.get('/:id', authorize([]), resourceController.readResource);

// @route   DELETE /resource/:id
// @desc    Delete a resource by id
router.delete('/:id', authorize(['admin']), resourceController.deleteResource);

// @route   PUT /resource/:id
// @desc    Update a resource by id
router.put('/:id', authorize(['admin']), resourceController.updateResource);

// @route   POST /resource
// @desc    Post a new resource
router.post(
  '/',
  authorize(['admin']),
  validate(resourceController.getValidations('createResource')),
  resourceController.createResource,
);

export default router;
