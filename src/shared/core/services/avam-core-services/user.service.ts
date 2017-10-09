import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { UserInfo } from "@common-model-utils/index";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  private userNotifier  = new BehaviorSubject<UserInfo>(null);
  userInfo$             = this.userNotifier.asObservable();
  

  constructor(private http: HttpClient) { }

  authenticate(userId: string): Observable<UserInfo> {
  return this.http.get<UserInfo>(`/api/users/${userId}`)
          .do(user=> this.userNotifier.next(user));
  }
  
}
