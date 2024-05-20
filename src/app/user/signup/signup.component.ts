import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserLogin } from './usermodel.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  hide = true;
  registrationForm: FormGroup;
  loginForm: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
    {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  }
ngOnInit(){
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
}
  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    setTimeout(() => {
      container.classList.add('sign-in');
    }, 200);
  }

  toggle() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    container.classList.toggle('sign-in');
    container.classList.toggle('sign-up');
  }

  onSignUp() {
    if (this.registrationForm.valid) {
      const userData = {
        fullName: this.registrationForm.value.fullName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        role: 'preparer',
        loggedin: true
      };
// console.log(userData)
      this.userService.createUser(userData).subscribe(
        (data) => {
          console.log('User registered successfully:', data);
          // Redirect to dashboard or handle success
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error registering user:', error);
          // Handle error, such as displaying an error message
          this.errorMessage = 'Error registering user';
        }
      );
    }
  }


  // onSignIn() {
  //   console.log("Method called")
  //   if (this.loginForm.valid) {
  //     const userLogin: UserLogin = {
  //       email: this.loginForm.value.email,
  //       password: this.loginForm.value.password,
  //     };
  //     console.log(userLogin)
  
  //     this.userService.loginUser(userLogin).subscribe(
  //       (response) => {
  //         console.log('User logged in successfully:', response);
  //         // Redirect to dashboard or handle success
  //         this.router.navigateByUrl('/allusers');
  //       },
  //       (error) => {
  //         console.error('Error logging in:', error);
  //         // Display error message to user
  //         this.errorMessage = 'Incorrect email or password';
  //       }
  //     );
  //   }

  //}
  onSignIn() {
    if (this.loginForm.valid) {
      const userLogin: UserLogin = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.userService.loginUser(userLogin).subscribe(
        (response) => {
          console.log('User logged in successfully:', response);
          // Redirect to dashboard or handle success
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.error('Error logging in:', error);
          // Display error message to user
          this.errorMessage = error;
        }
      );
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
