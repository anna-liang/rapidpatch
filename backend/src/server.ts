import 'dotenv/config';
import app from './app.ts';

const PORT = Number(process.env.PORT) || 8080;

const startServer = async () => {
    try {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
