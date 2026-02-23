import { Router } from 'express';
import { changeCommentStatus, deleteComment , createComment, getCommentById, getComments, updateComment } from './comments_controller.js';  

const router = Router();

router.post(
    '/create',
    createComment
)

router.get(
    '/',
    getComments
)

router.get('/:id', getCommentById);

router.put(
    '/:id',
    updateComment
);

router.put('/:id/activate', changeCommentStatus);
router.put('/:id/deactivate', changeCommentStatus);

// DELETE correcto
router.delete('/:id', deleteComment);

export default router;