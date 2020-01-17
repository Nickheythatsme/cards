import { Router } from 'express';
import { router as GameRouter } from './game';

export const router = Router();
router.get('/', (req, res) => {
    return res.json({test: 'true!'});
});

router.use('/games', GameRouter);