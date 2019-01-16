import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Data } from 'src/providers/data';
import { Days } from 'src/constants/days';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  private controls = this.days.daysOfWeek.map(day => new FormControl(false));
  private registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
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
    private data: Data,
    private days: Days
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
    const selectedDays = this.registerForm.value.days
    .map((checked, index) => checked ? this.days.daysOfWeek[index] : null)
    .filter(value => value !== null);
    this.registerForm.value.days = selectedDays;

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
