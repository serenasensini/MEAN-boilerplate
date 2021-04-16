import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface SizingData {
  id: string;
  name: string;
  mCPU: string;
  u_mCPU: string;
  RAM: string;
  u_RAM: string;
}

@Injectable({
  providedIn: 'root'
})
export class SizingService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getSizings() {
    return this.http.get<SizingData[]>(environment.baseURL + '/sizings');
  }

}
