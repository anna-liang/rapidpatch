import express from 'express';
import githubRoutes from './github/index.ts'

const app = express();
app.use(express.json());
app.use('/api/github', githubRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: 'running' });
});

export default app;
