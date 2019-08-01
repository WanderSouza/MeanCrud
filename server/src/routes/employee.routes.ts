import { Request, Response, NextFunction } from "express";
import { EmployeeController } from "../controllers/employee.controller";

//Employee routes
export class EmployeeRoutes {

    public EmployeeController: EmployeeController = new EmployeeController()

    public routes(app): void {

        //Endpoint for listing or creating employees
        app.route('/api/employee')
            //GET endpoint
            .get((req: Request, res: Response, next: NextFunction) => {
                next();
            }, this.EmployeeController.getEmployee)

            //POST endpoint
            .post(this.EmployeeController.addNewEmployee);

        //Endpoint that handle requests for a specific employee
        app.route('/api/employee/:id')
            .get(this.EmployeeController.getEmployeeById)
            .put(this.EmployeeController.updateEmployee)
            .delete(this.EmployeeController.deleteEmployee);
    }
}