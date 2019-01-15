import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from 'src/interfaces/user';
import Swal from 'sweetalert2';
import { Data } from 'src/providers/data';
import { NavigationEnd, Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public focused: Boolean = false;
  public users: IUser[] = [];
  public newUser: IUser[] = [];
  public albums: Array<Object> = [];
  private counterPhotos: number;

  // Forms
  public searchField = new FormControl();
  private searchForm: FormGroup = this.formBuilder.group({ search: this.searchField });
  private breadcrumbs = [];

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    private data: Data,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUsers().then((response) => {
      this.users = response;
      this.getAlbumsByUsers();
      this.data.storage.map((user) => this.users.push(user));
    });
    this.getPhotosByAlbum();
    this.getPostsByUser();
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
        const currentUser = this.users.find(x => x.id === user.id);
        const album = albums.filter(x => x.userId === user.id);
        if (album.length > 0) {
          currentUser.albums = album;
        }
      });
    });
  }

  public getCounterPhotosByUser(id: Number): Number {
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
        const post = posts.filter(test => test.userId === user.id);
        if (post.length > 0) {
          currentUser.posts = post;
        }
      });
    });
  }

  public removeUser(id: Number): void {
    Swal({
      title: 'Delete user',
      text: 'Do you want to delete this user?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6DCAB3',
      cancelButtonColor: '#777',
      confirmButtonText: 'Yes, delete it!'
    })
      .then((result) => {
        const index = this.users.findIndex(x => x.id === id);
        this.users.splice(index, 1);
      });
  }
}


