import { Router } from 'express';
import { EmployeeController } from '../controllers/EmployeeController';
import { errorHandler } from '../utils/errorHandler';

export class EmployeeRoutes {
    public router: Router;
    private employeeController: EmployeeController;

    constructor() {
        this.router = Router();
        this.employeeController = new EmployeeController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.employeeController.createEmployee);
        this.router.get('/', this.employeeController.getAllEmployees);
        this.router.get('/stats', this.employeeController.getEmployeeStats);
        this.router.get('/:id', this.employeeController.getEmployee);
        this.router.put('/:id', this.employeeController.updateEmployee);
        this.router.delete('/:id', this.employeeController.deleteEmployee);
        this.router.use(errorHandler);
    }
}