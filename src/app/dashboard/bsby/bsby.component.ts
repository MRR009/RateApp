import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BsbyService } from 'src/app/services/bsby.service';
import { Bsby } from './bsbymodel.component';

@Component({
  selector: 'app-bsby',
  templateUrl: './bsby.component.html',
  styleUrls: ['./bsby.component.css']
})
export class BsbyComponent {
  bsbyForm!: FormGroup;
  isTitleRequired:boolean = true;
  


  constructor(private formBuilder: FormBuilder, private bsbyService: BsbyService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired = true;
    
  }

  initializeForm(): void {
    this.bsbyForm = this.formBuilder.group({
      description: [''],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [1, Validators.required],
      term: [0, Validators.required],
      isa: [0, Validators.required]
    });
  }

  // addLibor(): void {
  //   if (this.liborForm.valid) {
  //     const newLibor: Libor = {
  //       description: this.liborForm.value.bankName,
  //       indexNumber: this.liborForm.value.indexNumber,
  //       floor: this.liborForm.value.floor,
  //       spread: this.liborForm.value.spread,
  //       rateId: this.liborForm.value.rateId,
  //       term:this.liborForm.value.term,
  //       isa:this.liborForm.value.isa
  //     };

  //     this.liborService.addLibor(newLibor).subscribe(
  //       (libor: Libor) => {
  //         console.log('Created Liborcomponent:', libor);
  //         console.log('libor creation completed');
  //         this.snackbar.open('Libor created successfully', 'Close', {
  //           duration: 3000,
  //         });

         
  //         // Reset the form or perform further actions here
  //       },
  //       (error: any) => {
  //         console.error('Error creating libor:', error);
  //       }
  //     );
  //   }
  // }
  addBsby(): void {
    if (this.bsbyForm.valid) {
      const newBsby: Bsby = {
        description: this.bsbyForm.value.description, // Corrected assignment
        indexNumber: this.bsbyForm.value.indexNumber,
        floor: this.bsbyForm.value.floor,
        spread: this.bsbyForm.value.spread,
        rateId: this.bsbyForm.value.rateId,
        term: this.bsbyForm.value.term,
        isa: this.bsbyForm.value.isa
      };
  
      this.bsbyService.addBsby(newBsby).subscribe(
        (bsby: Bsby) => {
          console.log('Created Bsbycomponent:', bsby);
          console.log('bsby creation completed');
          this.snackbar.open('Bsby created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating bsby:', error);
        }
      );
    }
  }
  

}
