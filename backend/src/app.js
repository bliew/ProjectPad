import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to ProjectPad API');
});

//Error catching middleware
// 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong' });
// });

export default app;
