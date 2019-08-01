import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  Employee: any = [];

  constructor(private apiService: ApiService) {
    this.getEmployees();
  }

  ngOnInit() { }

  //Returns all the registered employees
  getEmployees() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    }, (error) => {
      console.log(error)
    });
  }

  //Deletes an specific employee
  removeEmployee(employee, index) {
    //Popup confirm
    if (window.confirm('Deseja deletar os dados do funcionário ' + employee.name + '?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Employee.splice(index, 1);
      }, (error) => {
        console.log(error)
      });
    }
  }

}