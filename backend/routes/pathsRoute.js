import express from "express";
import { pathModel } from "../models/pathModel.js";

const pathsRoute = express.Router();


pathsRoute.get('/', async (req, res) => {
    try {
        const result = await pathModel.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

pathsRoute.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pathModel.findById(id);
        if (!result) {
            return res.status(404).send({ message: `Path with id: "${id}" not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

pathsRoute.post('/', async (req, res) => {
    try {
        const result = await pathModel.create(req.body);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

pathsRoute.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pathModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!result) {
            return res.status(404).send({ message: `Path with id: "${id}" not found` });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

pathsRoute.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pathModel.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: `Path with id: "${id}" not found` });
        }
        res.status(200).send({ message: `Path with id: "${id}" successfully deleted` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

export default pathsRoute;
