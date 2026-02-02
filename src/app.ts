import express, { Application } from 'express';
import mongoose from 'mongoose';
import { EmployeeRoutes } from './routes/employeeRoutes';

export class App {
    public app: Application;
    private employeeRoutes: EmployeeRoutes;

    constructor() {
        this.app = express();
        this.employeeRoutes = new EmployeeRoutes();
        this.config();
        this.connectDB();
        this.routes();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async connectDB(): Promise<void> {
        try {
            await mongoose.connect('mongodb://localhost:27017/employee_management');
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }

    private routes(): void {
        this.app.use('/api/employees', this.employeeRoutes.router);
        this.app.get('/', (req, res) => {
            res.json({ message: 'Employee Management System API' });
        });
    }

    public listen(port: number = 3000): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}