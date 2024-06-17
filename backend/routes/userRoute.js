import express from "express";
import { userModel } from "../models/userModel.js";

const userRoute = express.Router();

userRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.findById(id);
        if (!result) {
            return res.status(404).send({ message: `User with id: "${id}" not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userRoute.post('/', async (req, res) => {
    try {
        const result = await userModel.create(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userRoute.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).send({ message: `User with id: "${id}" not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

userRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: `User with id: "${id}" not found` });
        }
        res.status(200).send({ message: `User with id: "${id}" successfully deleted` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


userRoute.get('/:id/cards', async (req, res) => {
    try {
        const result = await userModel.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

export default userRoute;
