import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreparerdashboardComponent } from './dashboard/preparerdashboard/preparerdashboard.component';
import { PrimeComponent } from './dashboard/prime/prime.component';
import { SofrComponent } from './dashboard/sofr/sofr.component';
import { LiborComponent } from './dashboard/libor/libor.component';
import { FederalComponent } from './dashboard/federal/federal.component';
import { CeilingComponent } from './dashboard/ceiling/ceiling.component';
import { BsbyComponent } from './dashboard/bsby/bsby.component';
import { SignupComponent } from './user/signup/signup.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AllusersComponent } from './allusers/allusers.component';
import { RoleassignmentComponent } from './roleassignment/roleassignment.component';
import { RateinfoComponent } from './rateform/rateinfo/rateinfo.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserRoleComponent } from './user-role/user-role.component';



const routes: Routes = [ { path: '', redirectTo: 'allroles', pathMatch: 'full' },
{ path: 'home', component: SignupComponent},
{path: 'primeinfo', component:PrimeComponent},
{path: 'sofr', component:SofrComponent},
{path: 'libor',component:LiborComponent},
{path:'federal',component:FederalComponent},
{path: 'ceiling',component:CeilingComponent},
{path: 'bsby',component:BsbyComponent},
{path:'allroles',component:RoleListComponent},
{path:'allusers',component:AllusersComponent},
{path:'roleassign',component:RoleassignmentComponent},
{path: 'rateinfo', component:RateinfoComponent},
{path:'userprofileform',component:UserprofileComponent},
{path:'useraccess',component:UserRoleComponent},
{ path: 'dashboard', component: PreparerdashboardComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
