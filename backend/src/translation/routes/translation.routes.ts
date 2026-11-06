import express from 'express';
import { translate } from '../controllers/translation.controllers.ts';

const router = express.Router();

router.post('/translate', translate);

export default router;