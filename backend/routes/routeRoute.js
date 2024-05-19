import express from "express";

const routeRoute = express.Router();

routeRoute.get('/:coords', async (req, res) => {
    const coordsString = req.params.coords;

    const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${coordsString}?steps=true&geometries=geojson&access_token=${process.env.MAPBOX_TOKEN}`,
        { method: 'GET' }
    );
    const result = await query.json();

    if (result.code == 'Ok')
        res.status(200).send(result.routes[0].geometry.coordinates);
    else
        res.status(400).send(result.message);
})

export default routeRoute;
