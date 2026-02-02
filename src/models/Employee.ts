import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    status: { type: String, default: 'active' }
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema);