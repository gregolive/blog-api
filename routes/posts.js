import express from 'express';
import post_controller from '../controllers/postController.js';

const router = express.Router();

// GET request for creating a Post.
router.get('/create', post_controller.post_create_get);

// POST request for creating Post.
router.post('/create', post_controller.post_create_post);

// GET request for list of all Posts.
router.get('/all', post_controller.post_list);

// GET request to delete Post.
router.get('/:title/delete', post_controller.post_delete_get);

// POST request to delete Post.
router.post('/:title/delete', post_controller.post_delete_post);

// GET request to update Post.
router.get('/:title/update', post_controller.post_update_get);

// POST request to update Post.
router.post('/:title/update', post_controller.post_update_post);

// GET request for one Post.
router.get('/:title', post_controller.post_detail);

export default router;
