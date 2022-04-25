import express from 'express';
import * as user_controller from '../controllers/userController.js';

const router = express.Router();

// GET request to delete User.
router.get('/:username/delete', user_controller.user_delete_get);

// POST request to delete User.
router.post('/:username/delete', user_controller.user_delete_post);

// GET request to update User.
router.get('/:username/update', user_controller.user_update_get);

// POST request to update User.
router.post('/:username/update', user_controller.user_update_post);

// GET request for one User.
router.get('/:username', user_controller.user_detail);

export default router;
