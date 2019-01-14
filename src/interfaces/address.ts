import { IGeolocation } from './geolocation';

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeolocation;
}
