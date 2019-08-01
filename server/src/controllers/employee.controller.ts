import * as mongoose from 'mongoose';
import { EmployeeSchema } from '../models/employee.model';
import { Request, Response } from 'express';

const Employee = mongoose.model('Employee', EmployeeSchema);

//Controls the requests to the /employee endpoint in order to generate an appropriate response
//Deals with the logic and manipulates the employee model
export class EmployeeController {

    //Persists the employee at db
    public async addNewEmployee(req: Request, res: Response) {
        try {
            //Creates the employee obj
            let newEmployee = new Employee(req.body);

            await newEmployee.save((err, employee) => {
                if (err) {
                    res.send(err);
                }
                res.json(employee);
            });
        }
        catch (err) {
            console.log(err);
            res.send('Error creating an employee!');
        }
    }

    //Returns all the employees
    public async getEmployee(req: Request, res: Response) {
        try {
            await Employee.find({}, (err, employee) => {
                if (err) {
                    res.send(err);
                }
                res.json(employee);
            });
        }
        catch (err) {
            console.log(err);
            res.send('Error retrieving employees!');
        }
    }

    //Returns data from a specific employee
    public async getEmployeeById(req: Request, res: Response) {
        try {
            await Employee.findById(req.params.id, (err, employee) => {
                if (err) {
                    res.send(err);
                }
                res.json(employee);
            });
        }
        catch (err) {
            console.log(err);
            res.send('Error getting specific employee!');
        }
    }

    //Updates employee data
    public async updateEmployee(req: Request, res: Response) {
        try {
            await Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, employee) => {
                if (err) {
                    res.send(err);
                }
                res.json(employee);
            });
        }
        catch (err) {
            console.log(err);
            res.send('Error updating employee!');
        }
    }

    //Removes the specific employee from db
    public async deleteEmployee(req: Request, res: Response) {
        try {
            await Employee.remove({ _id: req.params.id }, (err) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted employee!' });
            });
        }
        catch (err) {
            console.log(err);
            res.send('Error deleting employee!');
        }
    }
}