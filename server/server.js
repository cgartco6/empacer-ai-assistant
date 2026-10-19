import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import grokRouter from './routes/grok.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/grok', grokRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Empacer Backend API', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Empacer API Server running on port ${PORT}`);
});
