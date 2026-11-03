import { Router } from 'express';
import githubRoutes from './routes/github.routes.ts'

const router = Router();
router.use('/', githubRoutes);

export default router;
