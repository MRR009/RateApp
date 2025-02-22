// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PreparerdashboardComponent } from './dashboard/preparerdashboard/preparerdashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RateinfoComponent } from './rateform/rateinfo/rateinfo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PrimeComponent } from './rateform/prime/prime.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SofrComponent } from './rateform/sofr/sofr.component';
import { LiborComponent } from './rateform/libor/libor.component';
import { FederalComponent } from './rateform/federal/federal.component';
import { CeilingComponent } from './rateform/ceiling/ceiling.component';
import { BsbyComponent } from './rateform/bsby/bsby.component';
import { RoleListComponent } from './role-list/role-list.component';
import { AllusersComponent } from './allusers/allusers.component';
// import { RoleassignmentComponent } from './roleassignment/roleassignment.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserprofileformComponent } from './userprofileform/userprofileform.component';
// import { AllUsersComponent } from './all-users/all-users.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PreparerdashboardComponent,
    RateinfoComponent,
    PrimeComponent,
    SofrComponent,
    LiborComponent,
    FederalComponent,
    CeilingComponent,
    BsbyComponent,
    RoleListComponent,
    AllusersComponent,
    // RoleassignmentComponent,
    UserRoleComponent,
    UserprofileComponent,
    UserprofileformComponent,
    // AllUsersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
