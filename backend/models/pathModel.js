import mongoose from 'mongoose';

const pathSchema = mongoose.Schema(
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
        duration: {
            type: Number,
            required: true
        },
        distance: {
            type: Number,
            required: true
        },
        path: {
            type: [[Number]],
            required: true,
            validate: [
                {
                    validator: function (data) {
                        return data.length != 0;
                    },
                    message: "Array can't be empty"
                },
                {
                    validator: function (data) {
                        for (const coords of data) {
                            if (coords.length != 2)
                                return false;
                        }

                        return true;
                    },
                    message: 'Arrays must contain exactly two numbers [longitude, latitude]'
                },
                {
                    validator: function (data) {
                        for (const coords of data) {
                            if (coords[0] < -90 || coords[0] > 90 || coords[1] < -180 || coords[1] > 180)
                                return false;
                        }
                        return true;
                    },
                    message: 'Arrays must contain valid latitude and longitude values'
                }
            ]
        }
    },
    {
        versionKey: false
    }
);

export const pathModel = mongoose.model('Path', pathSchema);
