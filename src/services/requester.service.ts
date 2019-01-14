import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {
  private url: String = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
  ) { }

  public get(path: string): Promise<any> {
    const url = this.url + path;
    return this.http.get(url, { headers: new HttpHeaders(this.getHttpOptions()) }).toPromise();
  }

  public post(path: string, payload: Object = {}): Promise<any> {
    const url = this.url + path;
    return this.http.post(url, payload, { headers: new HttpHeaders(this.getHttpOptions()) }).toPromise();
  }

  private getHttpOptions(): any {
    const options: Object = {
      'Content-Type': 'application/json'
    };
    return options;
  }
}
