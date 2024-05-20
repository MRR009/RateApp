import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { User } from '../allusers/allusersmodel.component';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface UserInfo {
  userId: number;
  firstName: string;
  lastName: string;
  lanId: string;
  roles: {
    roleId: number;
    roleName: string;
  };
  // costCenter: string;
  workEmail: string;
}
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements AfterViewInit{
  allUserProfiles: User[] = [];
  displayedColumns: string[] = ['FullName','LANID', 'Role', 'WorkEmail','edit'];
  dataSource!: MatTableDataSource<User>;
  selectedUser1: User | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userprofileserviceService: UserService,private snackbar:MatSnackBar) {
    this.userProfile()
    
  }

  onFormSubmitted(): void {
    this.userProfile(); // Refresh table data source upon form submission
  }
  userProfile() {
    this.userprofileserviceService.getAllUserProfiles().subscribe(
      (userProfiles: User[]) => {
        this.allUserProfiles = userProfiles;
        this.dataSource = new MatTableDataSource<User>(this.allUserProfiles); // Assign fetched data to dataSource
        console.log(this.allUserProfiles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error('Error fetching user profiles', error);
        // Handle error as needed
      }
    );
  }
  


  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  deleteUser(userId: number): void {
    
    this.userprofileserviceService.deleteUser1(userId).subscribe(
          (response) => {
            console.log('User deleted successfully:', response);
            this.snackbar.open('Ceiling created successfully', 'Close', {
              duration: 7000,
            });
            this.userProfile();
            // Optionally, update the UI or perform any additional actions
            // For example, update dataSource after successful deletion
            // this.dataSource = new MatTableDataSource<any>(updatedData);
          },
          (error) => {
            console.error('Error deleting user:', error);
            // Optionally, display an error message or handle the error
          }
        );

    // if (confirm('Are you sure you want to delete this user?')) {
    //   this.userprofileserviceService.deleteUser1(userId).subscribe(
    //     (response) => {
    //       console.log('User deleted successfully:', response);
    //       // Optionally, update the UI or perform any additional actions
    //       // For example, update dataSource after successful deletion
    //       // this.dataSource = new MatTableDataSource<any>(updatedData);
    //     },
    //     (error) => {
    //       console.error('Error deleting user:', error);
    //       // Optionally, display an error message or handle the error
    //     }
    //   );
    // }
  }
  

  editUser(user: User): void {
    console.log('Selected user:', user);
    this.selectedUser1 = user;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


