import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {IResponse, IPersonRequest, IPersonResponse} from '../model/person.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private urlGet: string = environment.urlPath + 'person/';
  private urlFindById: string = environment.urlPath + 'person/findById/';
  private urlCreate: string = environment.urlPath + 'person/create';
  private urlUpdate: string = environment.urlPath + 'person/update/';
  private urlDelete: string = environment.urlPath + 'person/delete/';

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get<IResponse<IPersonResponse[]>>(this.urlGet);
  }

  findById(id:number) {
    return this.http.get<IResponse<IPersonResponse>>(this.urlFindById + id);
  }

  create(req:IPersonRequest):Observable<IResponse<IPersonResponse>>{
    return this.http.post<IResponse<IPersonResponse>>(this.urlCreate,req);
  }

  update(req:IPersonRequest, id:number):Observable<IResponse<IPersonResponse>>{
    return this.http.put<IResponse<IPersonResponse>>(this.urlUpdate + id,req);
  }

  delete(id:number) {
    return this.http.delete<IResponse<any>>(this.urlDelete + id);
  }
}
