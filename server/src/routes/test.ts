// TODO: @akhil - remove this code before going on prod or enable it only on dev
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send("Testing route"));

export default router;
