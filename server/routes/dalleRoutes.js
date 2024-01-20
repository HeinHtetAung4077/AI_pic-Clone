import express from "express";
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API,
})
router.route('/').get((req, res) => {
    res.send('Hello FroM Dalle!')
})

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.images.generate({
            
            prompt,
            n: 1,
            size: '1024x1024',
            
        });
        const image = aiResponse.data[0].url;
        res.status(200).json({photo: image});

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.res.data.error.message);
    }
})

export default router;