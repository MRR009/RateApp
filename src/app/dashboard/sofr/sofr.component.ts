import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SofrService } from 'src/app/services/sofr.service';
import { Sofr } from './sofrmodel.component';

@Component({
  selector: 'app-sofr',
  templateUrl: './sofr.component.html',
  styleUrls: ['./sofr.component.css']
})
export class SofrComponent {
  sofrForm!: FormGroup;
  isTitleRequired:boolean = true;
  astrick:any= '<span  class="red-star">*</span>';
  


  constructor(private formBuilder: FormBuilder, private sofrService: SofrService,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired=true;
  }

  initializeForm(): void {
    this.sofrForm = this.formBuilder.group({
      description: ['', Validators.required],
      indexNumber:[0, Validators.required],
      spread: [0, Validators.required],
      floor:  [0, Validators.required],
      rateId: [1, Validators.required],
      term: [0, Validators.required],
      isa: [0, Validators.required]
    });
   
  }

  addSofr(): void {
    if (this.sofrForm.valid) {
      const newSofr: Sofr = {
        description: this.sofrForm.value.bankName,
        indexNumber: this.sofrForm.value.indexNumber,
        floor: this.sofrForm.value.floor,
        spread: this.sofrForm.value.spread,
        rateId: this.sofrForm.value.rateId,
        term:this.sofrForm.value.term,
        isa:this.sofrForm.value.isa
      };

      this.sofrService.addSofr(newSofr).subscribe(
        (sofr: Sofr) => {
          console.log('Created sofrcomponent:', sofr);
          console.log('sofr creation completed');
          this.snackbar.open('sofr created successfully', 'Close', {
            duration: 3000,
          });

         
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating sofr:', error);
        }
      );
    }
  }
}
