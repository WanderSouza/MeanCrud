import { Employee } from './../../model/Employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Employee[];
  EmployeeProfile: any = ['Financeiro', 'RH', 'Vendas', 'Suporte', 'Técnico'];

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.updateEmployeeForm();
  }

  ngOnInit() {
    //Gets the employee data
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
  }

  //Updates the profile based on the dropdown selection
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  //Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  //Gets the employee data based on id
  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        designation: data['designation'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }

  //Sets the form
  updateEmployeeForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  //Handles the submit event
  onSubmit() {
    this.submitted = true;
    //If it's not valid, return false
    if (!this.editForm.valid) {
      return false;
    } else {
      //Popup check
      if (window.confirm('Confirma a atualização?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        //Updates the employee data
        this.apiService.updateEmployee(id, this.editForm.value)
          .subscribe(res => {
            //Goes back to the list
            this.router.navigateByUrl('/employees-list');
            console.log('Employee updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}