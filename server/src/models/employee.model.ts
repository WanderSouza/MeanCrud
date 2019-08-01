import * as mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

//Defines a schema for the employee object
export const EmployeeSchema = new Schema(
    {
        _id: {
            type: objectId, auto: true
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        designation: {
            type: String
        },
        phoneNumber: {
            type: Number
        }
    },
    {
        collection: 'employees',
        versionKey: false
    });