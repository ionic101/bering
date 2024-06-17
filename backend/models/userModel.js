import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        nickname: {
            type: String,
            required: true
        },
        mail: {
            type: String,
            required: true
        },
        dateBirth: {
            type: String,
            required: true
        },
        cards: {
            type: Object,
            required: false
        }
    },
    {
        versionKey: false
    }
);

export const userModel = mongoose.model('User', userSchema);
