import { IPhotos } from './photos';

export interface IAlbums {
  userId: number;
  id: number;
  title: string;
  photos: [IPhotos];
}
