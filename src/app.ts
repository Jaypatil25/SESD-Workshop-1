import express, { Application, Request, Response, NextFunction } from 'express';
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
        this.errorHandler();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private async connectDB(): Promise<void> {
        try {
            // Use in-memory database for testing
            await mongoose.connect('mongodb://localhost:27017/employee_management', {
                serverSelectionTimeoutMS: 5000
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Database connection error:', error);
            console.log('Using in-memory storage...');
        }
    }

    private routes(): void {
        this.app.use('/api/employees', this.employeeRoutes.router);
        this.app.get('/', (req, res) => {
            res.json({ message: 'Employee Management System API' });
        });
    }

    private errorHandler(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error('Error:', err);
            res.status(500).json({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        });
    }

    public listen(port: number = 3000): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}