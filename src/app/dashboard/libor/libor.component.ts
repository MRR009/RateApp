import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LiborService } from 'src/app/services/libor.service';
import { Libor } from './libormodel.component';

@Component({
  selector: 'app-libor',
  templateUrl: './libor.component.html',
  styleUrls: ['./libor.component.css']
})
export class LiborComponent {
  liborForm!: FormGroup;
  isTitleRequired:boolean = true;
  


  constructor(private formBuilder: FormBuilder, private liborService: LiborService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired=true;
  }

  initializeForm(): void {
    this.liborForm = this.formBuilder.group({
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
  addLibor(): void {
    if (this.liborForm.valid) {
      const newLibor: Libor = {
        description: this.liborForm.value.description, // Corrected assignment
        indexNumber: this.liborForm.value.indexNumber,
        floor: this.liborForm.value.floor,
        spread: this.liborForm.value.spread,
        rateId: this.liborForm.value.rateId,
        term: this.liborForm.value.term,
        isa: this.liborForm.value.isa
      };
  
      this.liborService.addLibor(newLibor).subscribe(
        (libor: Libor) => {
          console.log('Created Liborcomponent:', libor);
          console.log('Libor creation completed');
          this.snackbar.open('Libor created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating libor:', error);
        }
      );
    }
  }
  

}
