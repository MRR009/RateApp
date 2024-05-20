import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../allusers/allusersmodel.component';
import { Role } from './rolemodel.component';
import { Roles } from '../role-list/rolemodel.component';

@Component({
  selector: 'app-userprofileform',
  templateUrl: './userprofileform.component.html',
  styleUrls: ['./userprofileform.component.css']
})
export class UserprofileformComponent implements OnChanges {
  @Input() selectedUser: User | null = null;
  @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  userProfileForm!: FormGroup;
  roles: Role[] = [];
  showField: boolean = false; 
  constructor(
    private formBuilder: FormBuilder,
    //private userprofileformserviceService: UserprofileformserviceService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    console.log('Selected user in form component:', this.selectedUser);
    
    // Initialize form controls with selectedUser data
    this.userProfileForm = this.formBuilder.group({
      fullName: [this.selectedUser ? this.selectedUser.fullName : '', Validators.required],
      workEmail: [this.selectedUser ? this.selectedUser.email : '', [Validators.required, Validators.email]],
      lanid: [this.selectedUser ? this.selectedUser.lanid : '', Validators.required],
      userId: [this.selectedUser ? this.selectedUser.userId : '', Validators.required],
      role: ['', Validators.required]
    });
    this.fetchAllRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      console.log('Selected user in form component:', this.selectedUser);

      this.userProfileForm = this.formBuilder.group({
        fullName: [this.selectedUser ? this.selectedUser.fullName : '', Validators.required],
        workEmail: [this.selectedUser ? this.selectedUser.email : '', [Validators.required, Validators.email]],
        lanid: [this.selectedUser ? this.selectedUser.lanid : '', Validators.required],
        userId: [this.selectedUser ? this.selectedUser.userId : '', Validators.required],
        role: ['', Validators.required]
      });
      this.fetchAllRoles();
    }
  }

  fetchAllRoles() {
    this.userService.getAllRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
        console.log('Fetched roles:', this.roles);
        // Check if roles object is null
        if (!this.selectedUser?.roles) {
          // Assign a default role
          this.userProfileForm.patchValue({
            role: this.roles[0] // Assign the first role in the list as default
          });
        }
      },
      (error: any) => {
        console.error('Error fetching roles:', error);
      }
    );
  }
  
  
  onSubmit() {
    if (this.userProfileForm.valid) {
    
      const formData = this.userProfileForm.value;
      console.log(formData)
      const selectedRoleName = formData.role;
      const selectedRole = this.roles.find(role => role.roleName === selectedRoleName);
  
      if (selectedRole) {
        formData.roles = selectedRole;
        console.log(selectedRole)
        const userId = formData.userId;
        const lanId=formData.lanid;
        const userAdminDto = {
          roleId: selectedRole.roleId,
          lanid:formData.lanid


        };
        console.log(userAdminDto);
        this.userService.updateUser1(userId, userAdminDto).subscribe(
          (response) => {
            console.log('Form data successfully submitted:', response);
            this.userProfileForm.reset();
            this.formSubmitted.emit(); 
          },
          (error) => {
            console.error('Error submitting form data:', error);
          }
        );
      } else {
        console.error('Selected role not found');
      }
    } else {
      console.error('Form is invalid');
    }
  }
  
}  




