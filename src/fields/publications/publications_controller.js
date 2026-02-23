import Publication from './publications_model.js';

export const createPublication = async (req, res) => {
    try {

        const publicationData = req.body;

        const publication = new Publication(publicationData);
        await publication.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: publication
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message
        })
    }
}

export const getPublications = async (req, res) => {
    try {

        const { page = 1, limit = 10, isActive = true } = req.query;

        const filter = { isActive };

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        }

        const publications = await Publication.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Publication.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: publications,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las publicaciones',
            error: error.message
        })
    }
}

// Obtener publicación por ID
export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            data: publication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la publicación',
            error: error.message,
        });
    }
};

// Actualizar publicación
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const currentPublication = await Publication.findById(id);
        if (!currentPublication) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada",
            });
        }

        const updateData = { ...req.body };

        const updatedPublication = await Publication.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Publicación actualizada exitosamente",
            data: updatedPublication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: error.message,
        });
    }
};

// Eliminar publicacion
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        const publication = await Publication.findByIdAndDelete(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada permanentemente',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la publicación',
            error: error.message,
        });
    }
};



// Cambiar estado (activar/desactivar)
export const changePublicationStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activada' : 'desactivada';

        const publication = await Publication.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada',
            });
        }

        res.status(200).json({
            success: true,
            message: `Publicación ${action} exitosamente`,
            data: publication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado de la publicación',
            error: error.message,
        });
    }
};