import express from 'express';
import bodyParser from 'body-parser';
import UserRouter from './routes/userRoutes.js'; 
const app = express();
app.use(bodyParser.json());

app.use('/api/users', UserRouter);

// Other middleware and route configurations

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

