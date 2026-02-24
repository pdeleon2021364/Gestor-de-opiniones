import mongoose from "mongoose";

const publicationSchema = mongoose.Schema(
{
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        maxLength: [150, 'Máx 150 caracteres']
    },
    content: {
        type: String,
        required: [true, 'El contenido es requerido'],
        maxLength: [5000, 'Máx 5000 caracteres']
    },
    author: {
        type: String,
        required: [true, 'El autor es requerido'],
        trim: true
    },
    image: {
        type: String
    },
    tags: [{
        type: String,
        trim: true
    }],
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
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

publicationSchema.index({ isActive: 1 });
publicationSchema.index({ isPublished: 1 });

export default mongoose.model('Publication', publicationSchema);