import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CeilingService } from 'src/app/services/ceiling.service';
import { Ceiling } from './ceilingmodel.component';

@Component({
  selector: 'app-ceiling',
  templateUrl: './ceiling.component.html',
  styleUrls: ['./ceiling.component.css']
})
export class CeilingComponent {
  ceilingForm!: FormGroup;
  isTitleRequired:boolean = true;

  constructor(private formBuilder: FormBuilder, private ceilingService: CeilingService,private snackbar:MatSnackBar) {}
  ngOnInit(): void {
    this.initializeForm();
    this.isTitleRequired=true;
  }

  initializeForm(): void {
    this.ceilingForm = this.formBuilder.group({
     
      compositeRateOverallFloor:[0, Validators.required],
      compositeRateOverallCeiling: [0, Validators.required],
      rateId: [1, Validators.required],
      
    });
  }

  
  addCeiling(): void {
    if (this.ceilingForm.valid) {
      const newCeiling: Ceiling= {
       
        compositeRateOverallFloor: this.ceilingForm.value.compositeRateOverallFloor,
        compositeRateOverallCeiling: this.ceilingForm.value.compositeRateOverallCeiling,
        rateId: this.ceilingForm.value.rateId,
      
      };
  
      this.ceilingService.addCeiling(newCeiling).subscribe(
        (ceiling: Ceiling) => {
          console.log('Created Ceilingcomponent:', ceiling);
          console.log('Ceiling creation completed');
          this.snackbar.open('Ceiling created successfully', 'Close', {
            duration: 7000,
          });
          // Reset the form or perform further actions here
        },
        (error: any) => {
          console.error('Error creating ceiling:', error);
        }
      );
    }
  }
  


}
