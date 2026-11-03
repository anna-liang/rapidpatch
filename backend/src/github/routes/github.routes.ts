import express from 'express';
import { webhook } from '../controllers/github.controllers.ts';

const router = express.Router();

router.post('/webhook', webhook);

export default router;