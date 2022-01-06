import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://superheroapi.com/api/${API_KEY}`;

router.get("/:name", (req, res) => {
  axios
    .get(`${API_URL}/search/${req.params.name}`)
    .then((heroes) => {
      res.json(heroes.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
