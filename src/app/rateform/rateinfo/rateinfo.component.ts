import { Component } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrimeService } from 'src/app/services/prime.service';
import { ViewChild } from '@angular/core';
import { Prime } from 'src/app/dashboard/prime/primemodel.component';
 
@Component({
  selector: 'app-rateinfo',
  templateUrl: './rateinfo.component.html',
  styleUrls: ['./rateinfo.component.css']
})
export class RateinfoComponent {
  primeForm!: FormGroup;
  hideRateIdField: boolean = false;
  isTitleRequired:boolean = true;
  isInputDisabled: boolean = true;
  selectedFiles : File[] = [];
  checkboxes = [
    { id: 'Prime', label: 'Prime Component', checked: false },
    { id: 'Federal Funds', label: 'Federal Funds Component', checked: false },
    { id: 'LIBOR', label: 'LIBOR Comoponent', checked: false },
    { id: 'BSBY', label: 'BSBY Component', checked: false },
    { id: 'SOFR', label: 'SOFR Component', checked: false },
    { id: 'rateIncludesOverallCeiling', label: 'Rate Includes Overall Floor Or Ceiling', checked: false }
];
 
  constructor(private formBuilder: FormBuilder, private primeService: PrimeService,private snackbar:MatSnackBar) {}
 
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired = true;
  }
 
  initializeForm(): void {
    this.primeForm = this.formBuilder.group({
      preaperdBy: ['', Validators.required],
      dateOfPrepared:['', Validators.required],
      customerName: [0, Validators.required],
      obligor:  [0, Validators.required],
      obligations: [0, Validators.required],
      nextBillDate: ['', Validators.required],
      leadDays:['', Validators.required],
      status: ['creating', Validators.required],
      attachments: this.selectedFiles,
     
    });
   
    // this.isTitleRequired = this.primeForm.value.bankName.hasValidator(Validators.required);
  }
 
  onFileSelected(event: any) {
    console.log("selected files show here")
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    console.log(this.selectedFiles.length)
  }
 
 
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    console.log(this.selectedFiles.length)
//     if (this.fileInput && this.fileInput.nativeElement) {
//       this.fileInput.nativeElement.value =this.selectedFiles.length;
// console.log(this.fileInput.length)
      // setTimeout(() => {
      //     this.fileInput.nativeElement.value = '';
      // });
  // }
   
  }
 
  addPrime(): void {
   
    if (this.primeForm.valid) {
      const newPrime: Prime = {
        bankName: this.primeForm.value.bankName,
        indexNumber: this.primeForm.value.indexNumber,
        floor: this.primeForm.value.floor,
        spread: this.primeForm.value.spread,
        rateId: this.primeForm.value.rateId
      };
 
      this.primeService.addPrime(newPrime).subscribe(
        (prime: Prime) => {
          console.log('Created primecomponent:', prime);
          console.log('prime creation completed');
          this.snackbar.open('Prime created successfully', 'Close', {
            duration: 3000,
          });
 
         
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating prime:', error);
        }
      );
    }
  }
 
  toggleCheckbox(checkbox: { id: string, label: string, checked: boolean }) {
    checkbox.checked = !checkbox.checked;
    console.log(checkbox.label + " " +  checkbox.checked)
}
 
 
 
 
 
 
 
 
 
 
 
}