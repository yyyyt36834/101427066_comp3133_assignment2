import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',  
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  goToCreateEmployeePage() {
    this.router.navigate(['/create-employee']);  // Navigate to the create employee page
  }

  // Fetch employees when the component is initialized
  fetchEmployees() {
    this.employeeService.getEmployees().subscribe((data: any) => {
      this.employees = data.data.employees; // Adjust this based on your API response structure
    });
  }

  // Navigate to view employee page
  viewEmployee(id: string) {
    this.router.navigate([`/employee/${id}`]);
  }

  // Navigate to edit employee page
  editEmployee(id: string) {
    this.router.navigate([`/employee/edit/${id}`]);
  }

  // Delete employee
  deleteEmployee(id: string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.fetchEmployees(); // Refresh the list after deletion
    });
  }
}
