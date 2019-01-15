import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { Router, NavigationExtras } from '@angular/router';
import Swal from 'sweetalert2';
import { IUser } from 'src/interfaces/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  public daysOfWeek = [
    { id: 0, name: 'sunday', text: 'Sun' },
    { id: 1, name: 'monday', text: 'Mon' },
    { id: 2, name: 'tuesday', text: 'Tue' },
    { id: 3, name: 'wednesday', text: 'Wed' },
    { id: 4, name: 'thuersday', text: 'Thu' },
    { id: 5, name: 'friday', text: 'Fri' },
    { id: 6, name: 'saturday', text: 'Sat' }
  ];
  private newUser: IUser[] = [];

  private controls = this.daysOfWeek.map(day => new FormControl(false));
  private registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    city: [''],
    rideInGroup: ['', Validators.required],
    days: new FormArray(this.controls, this.minSelectedCheckboxes(1))
  });
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    private route: Router
  ) { }


  public minSelectedCheckboxes(min = 1): Object | null {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  public addNewUser(): void {
    const selectedDays = this.registerForm.value.days
    .map((checked, index) => checked ? this.daysOfWeek[index].id : null)
    .filter(value => value !== null);

    const user = {
      address: {
        city: this.registerForm.value.city,
      },
      rideInGroup: this.registerForm.value.rideInGroup,
      days: selectedDays,
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
    };

    if (this.registerForm.status !== Status[0]) {
      this.userService.addNewUser(user)
        .then((response) => {
          this.newUser.push(response);
          const navigationExtras: NavigationExtras = {
            queryParams: this.newUser[0]
          };
          this.route.navigate(['/users'], navigationExtras);
        })
        .catch(() => {
          Swal({
            type: 'error',
            title: 'Oops...',
            text: 'Error registering new user. Try again.',
          });
        });
    } else {
      Swal({
        type: 'error',
        title: 'Oops...',
        text: 'Complete all the fields correctly.',
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
