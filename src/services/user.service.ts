import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';
import { Url } from '../constants/url';

@Injectable()
export class UserService {

  constructor(
    public requesterService: RequesterService
  ) {}

  /**
   * Retorna listagem de usuários.
   */
  public getUsers(): Promise<any> {
    return this.requesterService.get(Url.USERS);
  }

  /**
   * Retorna listagem de albuns.
   */
  public getAlbums(): Promise<any> {
    return this.requesterService.get(Url.ALBUMS);
  }

  /**
   * Retorna listagem de fotos.
   */
  public getPhotos(): Promise<any> {
    return this.requesterService.get(Url.PHOTOS);
  }

  /**
   * Retorna listagem de posts.
   */
  public getPosts(): Promise<any> {
    return this.requesterService.get(Url.POSTS);
  }
}
