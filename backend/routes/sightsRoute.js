import express from "express";
import { sightModel } from "../models/sightModel.js";

const sightsRoute = express.Router();


const validateSightData = (req, res, next) => {
    const { name, img, description, location } = req.body;
    if (!name || !img || !description || !location) {
        return res.status(400).send({ message: 'The following required fields are required: name, img, description, location' });
    }
    next();
};

sightsRoute.get('/', async (req, res) => {
    try {
        const result = await sightModel.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

sightsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sightModel.findById(id);
        if (!result) {
            return res.status(404).send({ message: `Sight ${id} not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

sightsRoute.post('/', validateSightData, async (req, res) => {
    try {
        const result = await sightModel.create(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

sightsRoute.put('/:id', validateSightData, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sightModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).send({ message: `Sight ${id} not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

sightsRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sightModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: `Sight ${id} not found` });
        }
        res.status(200).send({ message: `Sight ${id} successfully deleted` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default sightsRoute;
