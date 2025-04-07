import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Adjust this import as per your component
import { EmployeeViewComponent } from './components/employee-view/employee-view.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component'; // Adjust this import as per your component 
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';  // Create this new component

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent }, // Adjust this as per your requirement
  { path: 'employee/:id', component: EmployeeViewComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },  // Route to the create employee page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
