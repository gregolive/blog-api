import express from 'express';
import * as user_controller from '../controllers/v1/userController.js';
import * as post_controller from '../controllers/v1/postController.js';
import * as comment_controller from '../controllers/v1/commentController.js';

const userRouterV1 = express.Router();
const postRouterV1 = express.Router();
const commentRouterV1 = express.Router();

// User routes
userRouterV1.post('/create', user_controller.user_create_post);
userRouterV1.post('/:username/delete', user_controller.user_delete_post);
userRouterV1.post('/:username/update', user_controller.user_update_post);
userRouterV1.get('/:username', user_controller.user_detail);

// Post routes
postRouterV1.get('/all', post_controller.post_list);
postRouterV1.post('/create', post_controller.post_create_post);
postRouterV1.post('/:title/delete', post_controller.post_delete_post);
postRouterV1.post('/:title/update', post_controller.post_update_post);
postRouterV1.get('/:title', post_controller.post_detail);

// Comment routes
commentRouterV1.get('/all', comment_controller.comment_list);
commentRouterV1.post('/create', comment_controller.comment_create_post);
commentRouterV1.post('/:id/delete', comment_controller.comment_delete_post);
commentRouterV1.post('/:id/update', comment_controller.comment_update_post);
commentRouterV1.get('/:id', comment_controller.comment_detail);

export { userRouterV1, postRouterV1, commentRouterV1 };
