import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
// routes
import UserRouter from './routes/userRoutes.js'; 
import TextBookrouter from './routes/textbookRoute.js';
import secEmprouter from './routes/sec_employeeRoute.js';
import Reqrouter from './routes/requestRoute.js';
import InventoryRouter from './routes/inventoriesRoute.js';
import InstructorRouter from './routes/instructorRoute.js';
import CourseRouter from './routes/courseRoute.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', UserRouter);
app.use('/api/textbooks', TextBookrouter);
app.use('/api/secEmployee', secEmprouter);
app.use('/api/requests', Reqrouter);  // testing required
app.use('/api/inventories', InventoryRouter);
app.use('/api/instructors', InstructorRouter);
app.use('/api/courses', CourseRouter);

// Other middleware and route configurations

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

