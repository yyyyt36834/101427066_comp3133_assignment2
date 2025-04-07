import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Employee,  } from '../model/employee';  // Import the Employee model

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}`;
  public msg: string = "";

  constructor(private http: HttpClient) {}
// Employee creation method using GraphQL
createEmployee(employeeData: Employee): Observable<any> {
  console.log('createEmployee method called'); // Debug log

  // GraphQL Mutation for Employee Creation
  const mutation = `
    mutation {
      createEmployee(
        first_name: "${employeeData.first_name}",
        last_name: "${employeeData.last_name}",
        email: "${employeeData.email}",
        gender: "${employeeData.gender}",
        designation: "${employeeData.designation}",
        salary: ${employeeData.salary},
        date_of_joining: "${employeeData.date_of_joining}",
        department: "${employeeData.department}"
      ) {
        id
        first_name
        last_name
        email
        gender
        designation
        salary
        department
        date_of_joining
        created_at
        updated_at
      }
    }
  `;

  console.log(employeeData);  // Log employee data for debugging

  // Send the GraphQL request
  return this.http.post<any>(this.apiUrl, { query: mutation }).pipe(
    tap(response => {
      if (response.data) {
        console.log('Employee created successfully:', response.data.createEmployee);
      }
    }),
    catchError((error) => {
      console.error('Creation failed:', error);
      this.msg = 'Creation failed. Please try again.';
      return of(error);  // Return error to avoid breaking the stream
    })
  );
}
  

  // Get the list of employees
  getEmployees(): Observable<any> {  // Return any for simplicity (you can use Employee[] if needed)
    const body = {
      query: `
        query {
          employees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            created_at
            updated_at
          }
        }
      `
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  // Get a single employee by ID
  getEmployee(id: string): Observable<any> {  // Return any for simplicity (you can use Employee if needed)
    const body = {
      query: `
        query {
          employee(id: "${id}") {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            created_at
            updated_at
          }
        }
      `
    };
    return this.http.post<any>(this.apiUrl, body);
  }

 // Employee update method using GraphQL
updateEmployee(id: string, employeeData: Employee): Observable<any> {
  console.log('updateEmployee method called'); // Debug log

  // GraphQL Mutation for Employee Update
  const mutation = `
    mutation {
      updateEmployee(
        id: "${id}",
        first_name: "${employeeData.first_name}",
        last_name: "${employeeData.last_name}",
        email: "${employeeData.email}",
        gender: "${employeeData.gender}",
        designation: "${employeeData.designation}",
        salary: ${employeeData.salary},
        date_of_joining: "${employeeData.date_of_joining}",
        department: "${employeeData.department}"
      ) {
        id
        first_name
        last_name
        email
        gender
        designation
        salary
        department
        date_of_joining
        created_at
        updated_at
      }
    }
  `;

  // Send the GraphQL request
  return this.http.post<any>(this.apiUrl, { query: mutation }).pipe(
    tap(response => {
      if (response.data) {
        console.log('Employee updated successfully:', response.data.updateEmployee);
      }
    }),
    catchError((error) => {
      console.error('Update failed:', error);
      this.msg = 'Update failed. Please try again.';
      return of(error);  // Return error to avoid breaking the stream
    })
  );
}

  

  // Delete an employee
  // Employee deletion method using GraphQL
deleteEmployee(id: string): Observable<any> {
  console.log('deleteEmployee method called'); // Debug log

  // GraphQL Mutation for Employee Deletion
  const mutation = `
    mutation {
      deleteEmployee(id: "${id}") {
        id
      }
    }
  `;

  // Send the GraphQL request
  return this.http.post<any>(this.apiUrl, { query: mutation }).pipe(
    tap(response => {
      if (response.data) {
        console.log('Employee deleted successfully:', response.data.deleteEmployee);
      }
    }),
    catchError((error) => {
      console.error('Deletion failed:', error);
      this.msg = 'Deletion failed. Please try again.';
      return of(error);  // Return error to avoid breaking the stream
    })
  );
}
}
