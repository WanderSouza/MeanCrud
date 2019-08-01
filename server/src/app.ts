import express = require("express");
import * as bodyParser from "body-parser";
import { EmployeeRoutes } from "./routes/employee.routes";
import * as mongoose from "mongoose";
import cors = require('cors');
import basicAuth = require('express-basic-auth');

class App {

    public app: express.Application = express();
    public employeeRoutes: EmployeeRoutes = new EmployeeRoutes();
    public mongoUrl: string = 'mongodb://localhost/meandb';

    constructor() {
        this.config();
        this.mongoSetup();
        this.employeeRoutes.routes(this.app);
    }

    //Configures the server
    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //Serving static files 
        this.app.use(express.static('public'));
        //Defines the basic auth info
        this.app.use(basicAuth({
            users: { 'mean': '1234' }
        }))
    }

    //Connects to the MongoDB
    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    }

}

export default new App().app;