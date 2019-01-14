import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public focused: Boolean = false;
  public users: Array<any> = [];
  public albums: Array<Object> = [];
  private counterPhotos: Number = 0;
  public days = [
    { id: 0, name: 'sunday', text: 'Sun' },
    { id: 1, name: 'monday', text: 'Mon' },
    { id: 2, name: 'tuesday', text: 'Tue' },
    { id: 3, name: 'wednesday', text: 'Wed' },
    { id: 4, name: 'thuersday', text: 'Thu' },
    { id: 5, name: 'friday', text: 'Fri' },
    { id: 6, name: 'saturday', text: 'Sat' }
  ];

  // Forms
  public searchField = new FormControl();
  private searchForm: FormGroup = this.formBuilder.group({ search: this.searchField });
  private controls = this.days.map(day => new FormControl(false));
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
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUsers().then((response) => {
      this.users = response;
      this.getAlbumsByUsers();
    });
    this.getPhotosByAlbum();
    this.getPostsByUser();
  }

  public minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  public getPhotosByAlbum(): void {
    this.userService.getPhotos().then((response) => {
      this.userService.getAlbums().then((albums) => {
        albums.map((album) => {
          this.users.map((user) => {
            if (user.albums) {
              const index = user.albums.findIndex(x => x.id === album.id);
              if (index !== -1) {
                user.albums[index].photos = response.filter(photo => photo.albumId === album.id);
              }
            }
          });
        });
      });
    });
  }

  public getAlbumsByUsers(): void {
    this.userService.getAlbums().then((albums) => {
      this.users.map((user) => {
        const index = this.users.findIndex(x => x.id === user.id);
        this.users[index].albums = albums.filter(test => test.userId === user.id);
      });
    });
  }

  public getCounterPhotosByUser(id: Number): Number {
    // console.log('id: ', id);
    const user = this.users.find(x => x.id === id);
    this.counterPhotos = 0;
    if (user && user.albums) {
      user.albums.map((response) => {
        if (response.photos) {
          this.counterPhotos += response.photos.length;
        }
      });
    }
    return this.counterPhotos;
  }

  public getPostsByUser(): void {
    this.userService.getPosts().then((posts) => {
      this.users.map((user) => {
        const currentUser = this.users.find(x => x.id === user.id);
        currentUser.posts = posts.filter(test => test.userId === user.id);
      });
    });
  }

  public addNewUser(): void {
    const user = {
      address: {
        city: this.registerForm.value.city,
      },
      days: [false, false, false, false, false, false, false],
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      username: this.registerForm.value.username,
    };
    if (this.registerForm.status !== 'INVALID') {
      this.userService.addNewUser(user)
        .then((response) => {
          this.users.push(response);
        })
        .catch(() => {
          alert('Erro ao cadastrar novo usuário. Tente novamente.');
        });
    } else {
      alert('Preencha todos os dados corretamente.');
    }
  }

  public resetForm(): void {
    this.registerForm.reset();
  }
}
