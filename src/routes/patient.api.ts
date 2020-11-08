import express from 'express';

const router = express.Router();

router.post("/add", async (req, res) => {
    console.log(req.body)
    res.status(200).json({
        success: true
    });
})

export default router;