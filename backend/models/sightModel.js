import mongoose from "mongoose";

const sightSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: [Number],
            required: true,
            validate: [
                {
                    validator: function (data) {
                        return data.length === 2;
                    },
                    message: 'Array must contain exactly two numbers [longitude, latitude]'
                },
                {
                    validator: function (data) {
                        return data[0] >= -90 && data[0] <= 90 && data[1] >= -180 && data[1] <= 180;
                    },
                    message: 'Array must contain valid latitude and longitude values'
                }
            ]
        }
    },
    {
        versionKey: false
    }
);

export const sightModel = mongoose.model('Sight', sightSchema);
