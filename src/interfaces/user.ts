import { IAddress } from './address';
import { ICompany } from './company';
import { IAlbums } from './albums';
import { IPosts } from './posts';

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
  rideInGroup: string;
  days: Array<Object>;
  albums: [IAlbums];
  posts: [IPosts];
}
