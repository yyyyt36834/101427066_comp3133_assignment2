import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    this.employeeService.getEmployee(this.employeeId).subscribe((res: any) => {
      const emp = res.data.employee;
      this.employeeForm = this.fb.group({
        first_name: [emp.first_name],
        last_name: [emp.last_name],
        email: [emp.email],
        gender: [emp.gender],
        designation: [emp.designation],
        salary: [emp.salary],
        department: [emp.department],
        date_of_joining: [new Date(+emp.date_of_joining).toISOString().substring(0, 10)],
      });
    });
  }

  updateEmployee() {
    const updatedData = this.employeeForm.value;
    updatedData.date_of_joining = new Date(updatedData.date_of_joining).getTime();
    this.employeeService.updateEmployee(this.employeeId, updatedData).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
