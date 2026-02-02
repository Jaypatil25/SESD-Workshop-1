import { Request, Response, NextFunction } from 'express';
import { Employee } from '../models/Employee';

export class EmployeeController {
    createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await Employee.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Employee created successfully',
                data: employee
            });
        } catch (error) {
            next(error);
        }
    };

    getEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await Employee.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: employee
            });
        } catch (error) {
            next(error);
        }
    };

    getAllEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;
            
            let query: any = {};
            if (req.query.department) query.department = req.query.department;
            if (req.query.status) query.status = req.query.status;
            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                    { role: { $regex: req.query.search, $options: 'i' } }
                ];
            }

            const sortBy = req.query.sortBy as string || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

            const employees = await Employee.find(query)
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit);

            const total = await Employee.countDocuments(query);

            res.status(200).json({
                success: true,
                data: employees,
                pagination: {
                    page,
                    totalPages: Math.ceil(total / limit),
                    total,
                    limit
                }
            });
        } catch (error) {
            next(error);
        }
    };

    updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json({
                success: true,
                message: 'Employee updated successfully',
                data: employee
            });
        } catch (error) {
            next(error);
        }
    };

    deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await Employee.findByIdAndDelete(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Employee deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    };

    getEmployeeStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const stats = await Employee.aggregate([
                {
                    $group: {
                        _id: '$department',
                        count: { $sum: 1 },
                        avgSalary: { $avg: '$salary' }
                    }
                }
            ]);
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            next(error);
        }
    };
}