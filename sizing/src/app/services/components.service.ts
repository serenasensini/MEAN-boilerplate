import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface ComponentData {
  id: string;
  name: string;
  description: string;
  available_sizing: [];
}

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getComponents() {
    return this.http.get<ComponentData[]>(environment.baseURL + '/components');
  }

  // tslint:disable-next-line:typedef
  getComponent(componentId) {
    return this.http.get('https://jsonplaceholder.typicode.com/components/' + componentId);
  }
}
