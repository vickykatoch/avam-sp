import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { UserInfo } from "@common-model-utils/index";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  private userNotifier = new BehaviorSubject<UserInfo>(null);
  userInfo$ = this.userNotifier.asObservable();


  constructor(private http: HttpClient) { }

  authenticate(userId: string): Promise<UserInfo> {
    const url = `http://localhost:8000/users/${userId}`;
    return new Promise<UserInfo>((resolve, reject) => {
      const httpHeaders = new HttpHeaders();
      httpHeaders.append('Accept', 'application/json');
      httpHeaders.append('Content-Type', 'application/json');
      this.http.get<UserInfo>(url, { headers: httpHeaders })
        .do(user => this.userNotifier.next(user))
        .subscribe(resolve, reject);
    });
  }

}
