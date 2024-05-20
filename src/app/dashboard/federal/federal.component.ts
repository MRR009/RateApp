import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FederalService } from 'src/app/services/federal.service';
import { Federal } from './federalmodel.component';

@Component({
  selector: 'app-federal',
  templateUrl: './federal.component.html',
  styleUrls: ['./federal.component.css']
})
export class FederalComponent {
  federalForm!: FormGroup;
  isTitleRequired:boolean = true;

  constructor(private formBuilder: FormBuilder, private federalService: FederalService,private snackbar:MatSnackBar) {}
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired=true;
  }

  initializeForm(): void {
    this.federalForm = this.formBuilder.group({
      description: [''],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [1, Validators.required],
      
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
  addFederal(): void {
    if (this.federalForm.valid) {
      const newFederal: Federal= {
       
        indexNumber: this.federalForm.value.indexNumber,
        floor: this.federalForm.value.floor,
        spread: this.federalForm.value.spread,
        rateId: this.federalForm.value.rateId,
      
      };
  
      this.federalService.addFederal(newFederal).subscribe(
        (federal: Federal) => {
          console.log('Created Federalcomponent:', federal);
          console.log('Federal creation completed');
          this.snackbar.open('federal created successfully', 'Close', {
            duration: 3000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating federal:', error);
        }
      );
    }
  }
  
  


}
