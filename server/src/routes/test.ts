import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send("Testing trigger"));

export default router;
