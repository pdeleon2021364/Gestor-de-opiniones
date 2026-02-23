import { Router } from 'express';
import {
    changePublicationStatus,
    createPublication,
    getPublicationById,
    getPublications,
    updatePublication,
    deletePublication
} from './publications_controller.js'; 

const router = Router();

router.post('/create', createPublication);
router.get('/', getPublications);

// status primero (evita conflictos)
router.put('/:id/activate', changePublicationStatus);
router.put('/:id/deactivate', changePublicationStatus);

// DELETE correcto
router.delete('/:id', deletePublication);

// normales
router.get('/:id', getPublicationById);
router.put('/:id', updatePublication);

export default router;