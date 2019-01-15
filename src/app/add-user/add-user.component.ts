import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { Data } from 'src/providers/data';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  public daysOfWeek: Array<Object> = [
    { id: 0, name: 'sunday', text: 'Sun' },
    { id: 1, name: 'monday', text: 'Mon' },
    { id: 2, name: 'tuesday', text: 'Tue' },
    { id: 3, name: 'wednesday', text: 'Wed' },
    { id: 4, name: 'thuersday', text: 'Thu' },
    { id: 5, name: 'friday', text: 'Fri' },
    { id: 6, name: 'saturday', text: 'Sat' }
  ];
  private controls = this.daysOfWeek.map(day => new FormControl(false));
  private registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: this.formBuilder.group({
      city: [''],
    }),
    rideInGroup: ['', Validators.required],
    days: new FormArray(this.controls, this.minSelectedCheckboxes())
  });

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    private route: Router,
    private data: Data
  ) { }

  public minSelectedCheckboxes(min: Number = 1): Object | null {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value )
        .reduce((prev, element) => element ? prev + element : prev);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  public addNewUser(): void {
    if (this.registerForm.status === Status[1]) {
      this.userService.addNewUser(this.registerForm.value)
        .then((response) => {
          this.data.storage.push(response);
          this.route.navigate(['/users']);
        })
        .catch(() => {
          Swal({
            type: 'error',
            title: 'Oops...',
            text: 'Error registering new user. Try again.',
            confirmButtonColor: '#6DCAB3',
          });
        });
    } else {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Complete all the fields correctly.',
        confirmButtonColor: '#6DCAB3',
      });
    }
  }

  public resetForm(): void {
    this.registerForm.reset();
  }
}

export enum Status {
  INVALID = 0,
  VALID = 1
}
