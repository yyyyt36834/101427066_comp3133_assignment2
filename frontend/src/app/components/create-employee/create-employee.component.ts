import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewEmployee } from '../../model/employee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form with empty values for a new employee
    this.employeeForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      gender: [''],
      designation: [''],
      salary: [0],
      department: [''],
      date_of_joining: [new Date().toISOString().substring(0, 10)],
    });
  }

  // Create new employee using the form data
  createEmployee() {
    const newEmployee = this.employeeForm.value;
    this.employeeService.createEmployee(newEmployee).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
  
}
