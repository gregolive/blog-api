import express from 'express';
import comment_controller from '../controllers/commentController.js';

const router = express.Router();

// GET request for creating a Comment.
router.get('/create', comment_controller.comment_create_get);

// POST request for creating Comment.
router.post('/create', comment_controller.comment_create_post);

// GET request for list of all Comments.
router.get('/all', comment_controller.comment_list);

// GET request to delete Comment.
router.get('/:id/delete', comment_controller.comment_delete_get);

// POST request to delete Comment.
router.post('/:id/delete', comment_controller.comment_delete_post);

// GET request to update Comment.
router.get('/:id/update', comment_controller.comment_update_get);

// POST request to update Comment.
router.post('/:id/update', comment_controller.comment_update_post);

// GET request for one Comment.
router.get('/:id', comment_controller.comment_detail);

export default router;
