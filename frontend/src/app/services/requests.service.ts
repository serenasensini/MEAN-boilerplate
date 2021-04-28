import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

// STEP 1: definizione interfaccia (opzionale)

export interface RequestData {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  // STEP 2: import HttpClient per eseguire richieste HTTP
  constructor(private http: HttpClient) {
  }

  // STEP 3: definizione metodo per il recupero delle richieste
  // tslint:disable-next-line:typedef
  getRequests() {
    return this.http.get<RequestData[]>(environment.baseURL + '/requests');
  }

  // tslint:disable-next-line:typedef
  // insertRequest(body) {
  //   console.log(body);
  //   return this.http.post(environment.baseURL + '/requests', body);
  // }
}
