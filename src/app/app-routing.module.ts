import { AuthGuard } from './auth/auth.guard';
import { ViewStatusComponent } from './view-status/view-status.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGuard } from './auth/manager.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [{path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard]},
{path: 'manager', component: ManagerComponent, canActivate: [ManagerGuard], children: [{path: 'status', component: ViewStatusComponent}]},
{path: 'access-denied', component: AccessDeniedComponent},
{path: 'login', component: LoginComponent},
{path: 'view-status', component: ViewStatusComponent},
{path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
