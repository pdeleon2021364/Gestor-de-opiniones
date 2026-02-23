
import Comment from './comments_model.js';
export const createComment = async (req, res) => {
    try {

        const commentData = req.body;

        const comment = new Comment(commentData);
        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            data: comment
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message
        })
    }
}

export const getComments = async (req, res) => {
    try {

        const { page = 1, limit = 10, isActive = true } = req.query;

        const filter = { isActive };

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        }

        const comments = await Comment.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort)
            .populate('post');

        const total = await Comment.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: comments,
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
            message: 'Error al obtener los comentarios',
            error: error.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar comentario',
            error: error.message,
        });
    }
};

// Obtener comentario por ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id).populate('post');

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            data: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el comentario',
            error: error.message,
        });
    }
};

// Actualizar comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;

        const currentComment = await Comment.findById(id);
        if (!currentComment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado",
            });
        }

        const updateData = { ...req.body };

        const updatedComment = await Comment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Comentario actualizado exitosamente",
            data: updatedComment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar comentario",
            error: error.message,
        });
    }
};

// Cambiar estado del comentario (activar/desactivar)
export const changeCommentStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const comment = await Comment.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: `Comentario ${action} exitosamente`,
            data: comment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del comentario',
            error: error.message,
        });
    }
};