import { ViewStatusComponent } from './view-status/view-status.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{path : 'employee', component : EmployeeComponent},
{path: 'manager', component: ManagerComponent, children: [{path: 'status', component: ViewStatusComponent}]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
