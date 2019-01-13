import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  public users: Array<any> = [];
  public albums: Array<Object> = [];
  private counterPhotos: Number = 0;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().then((response) => {
      this.users = response;
      this.getAlbumsByUsers();
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
}
