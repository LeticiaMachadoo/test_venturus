import { Injectable } from '@angular/core';
import { IUser } from 'src/interfaces/user';

@Injectable()
export class Data {
    public storage: IUser[] = [];

    public constructor() { }

}
