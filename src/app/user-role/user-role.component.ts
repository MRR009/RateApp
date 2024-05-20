import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../user-role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { async } from 'rxjs';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css'],
})
export class UserRoleComponent implements OnInit {
  allScreens: any[] = [];
  allRoles: any[] = [];
  roleForm: FormGroup;
  selectedRole: any = {};
  accessList: any[] = [];
  selectedRoleId!: number;

  constructor(
    private userRoleService: UserRoleService,
    private formBuilder: FormBuilder
  ) {
    this.roleForm = this.formBuilder.group({
      newrole: ['', Validators.required],
      allroles: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getScreens();
    this.getRoles();
  }

  // onRoleSelectionChange(event: any): void {
  //   const selectedRoleId = event.target.value;
  //   this.selectedRole = this.allRoles.find(
  //     (role) => role.roleId === selectedRoleId
  //   );
  //selectedRoleId?: numberselectedRoleId: numberselectedRoleId: number }

  // async onRoleSelectionChange(event: Event) {
  //   var res: any[] = [];
  //   const selectedRoleId: number = Number((event.target as HTMLSelectElement)?.value);
  //   this.selectedRoleId = selectedRoleId; // Assign selectedRoleId to the component property
  //   this.selectedRole = this.allRoles.find(role => role.roleId === selectedRoleId);
  
  //   if (this.selectedRole) {
  //       console.log('Selected Role:', this.selectedRole);
  //       console.log('Role ID:', selectedRoleId);
  //       try {
  //         const data = await this.userRoleService.getUserAccess(selectedRoleId).toPromise();
  //         console.log(data);
          
  //          res.push(data);
  //       } catch (error) {
  //         console.error('Error fetching user access', error);
  //         // Handle errors or rethrow them
  //         throw error;
  //       }
  //       this.allScreens = res[0]
  //       console.log(this.allScreens)
        
  //       this.allScreens.map((screen) => ({
          
  //         screenId: screen.screenId,
  //         screenName:screen.screenName,
  //         createAccess: screen.createAccess,
  //         readAccess: screen.readAccess,
  //         updateAccess: screen.updateAccess,
  //         deleteAccess: screen.deleteAccess,
         
  //       }));
  //   } else {
  //       console.warn('No role selected.');
  //   }
  // }
  async onRoleSelectionChange(event: Event) {
    const selectedRoleId: number = Number((event.target as HTMLSelectElement)?.value);
    this.selectedRoleId = selectedRoleId;
    this.selectedRole = this.allRoles.find(role => role.roleId === selectedRoleId);

    if (this.selectedRole) {
        console.log('Selected Role:', this.selectedRole);
        console.log('Role ID:', selectedRoleId);
        try {
            const userAccess = await this.userRoleService.getUserAccess(selectedRoleId).toPromise();
            console.log('User Access Data:', userAccess); // Log userAccess for debugging
            if (userAccess) {
              this.allScreens = userAccess.map((screen: any) => ({
                screenId: screen.screenId,
                screenName: screen.screen.screenName,
                readAccess: screen.readAccess,
                updateAccess: screen.updateAccess,
                deleteAccess: screen.deleteAccess,

              }));
              console.log(this.userRoleService.getAllScreens())
              console.log('Mapped Screens:', this.allScreens);
            } else {
              console.warn('User access data is undefined.');
            }
            
        } catch (error) {
            console.error('Error fetching user access', error);
            throw error; // Rethrow the error to handle it elsewhere if needed
        }
    } else {
        console.warn('No role selected.');
    }
} 
addRole() {
  const newRoleValue = this.roleForm.value.newrole;

  // Check if newRoleValue is not empty before proceeding
  if (!newRoleValue) {
    console.error('New role value is empty');
    return;
  }

  this.userRoleService.createRole({ roleName: newRoleValue }).subscribe(
    (addedRole) => {
      console.log('New Role added:', addedRole);
      // Set the newly added role as the selected role
      this.selectedRole = addedRole;
      this.roleForm.reset();
      this.getRoles(); // Refresh roles after adding a new one
    },
    (error) => {
      console.error('Error adding new role:', error);
    }
  );
}

  getRoles() {
    this.userRoleService.getRoles().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.allRoles = response;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  getScreens() {
    this.userRoleService.getAllScreens().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.allScreens = response;
        console.log(this.allScreens)
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  createScreenAccess(roleId: number | undefined) {
    console.log('Selected Role:', this.selectedRole);
    console.log('Role ID:', roleId);

    if (!roleId) {
      
      console.error('Role ID is undefined');
      return;
    }
    this.accessList = this.allScreens.map((screen) => ({
      screenId: screen.screenId,
      createAccess: screen.createAccess,
      readAccess: screen.readAccess,
      updateAccess: screen.updateAccess,
      deleteAccess: screen.deleteAccess,
    }));

    console.log(this.accessList)
    this.userRoleService.createScreenAccess1(roleId, this.accessList).subscribe(
      (response) => {
        console.log('Screen access created:', response);
      },
      (error) => {
        console.error('Error creating screen access:', error);
      }
    );
}
}




