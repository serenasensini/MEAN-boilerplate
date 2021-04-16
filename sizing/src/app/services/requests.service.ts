import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface RequestData {
  id: string;
  owner: string;
  customer: string;
  scope: string;
  high_availability: string;
  monitoring: string;
  logging: string;
  environment: string;
  name: string;
  description: string;
  components: [];
  results: [];
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getRequests() {
    return this.http.get<RequestData[]>(environment.baseURL + '/requests');
  }

  // tslint:disable-next-line:typedef
  calculateReport(body) {
    console.log(body);
    return this.http.post(environment.baseURL + '/requests', body);
  }
}
