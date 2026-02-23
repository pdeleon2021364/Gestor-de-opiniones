'use strict';

import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
        {
            post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Publication',   
             required: [true, 'La publicación es requerida']
        },
        content: {
            type: String,
            required: [true, 'El comentario es requerido'],
            trim: true,
            maxLength: [500, 'El comentario no puede exceder 500 caracteres']
        },
        author: {
            type: String,
            required: [true, 'El autor es requerido'],
            trim: true,
            maxLength: [100, 'El nombre del autor no puede exceder 100 caracteres']
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Index útiles (como tu ejemplo)
commentSchema.index({ isActive: 1 });
commentSchema.index({ post: 1 });
commentSchema.index({ isActive: 1, post: 1 });

export default mongoose.model('Comment', commentSchema);