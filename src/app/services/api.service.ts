import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly bookingURL = environment.apiUrl + 'booking/wizard/';
  // private readonly auth_token: string = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JldGEtYi53ai1mdWxjcnVtLmNvLnVrL2FwaXYxL2xvZ2luIiwiaWF0IjoxNjg5MTY4NDU2LCJleHAiOjE2ODk0Mjc2NTYsIm5iZiI6MTY4OTE2ODQ1NiwianRpIjoibWFrRnFob1Y3UTVOWnJlWiIsInN1YiI6IjEyMDQ5IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.2vxiSC3zXkZP12eXdZ1hVdQhHSlB_DgTs9jYawOMEwE';
  // private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);

  private http: HttpClient = inject(HttpClient);

  private sendGetReq(endPoint: string) {
    return this.http.get(endPoint);
  }

  private sendPostReq(endPoint: string, payload: any) {
    return this.http.post(endPoint, payload);
  }

  getScopePackageData() {
    let endPoint = 'booking/wizard/select_scope_package';
    return this.sendGetReq(endPoint);
  }

  postScopePackageData(payload: any) {
    let endPoint = 'booking/wizard/select_scope_package';
    return this.sendPostReq(endPoint, payload);
  }

  getBasicInfoData(bookingId: string, scopePackageId: string) {
    let endPoint = `booking/wizard/basic_info?booking_id=${bookingId}&scope_package_id=${scopePackageId}`;
    return this.sendGetReq(endPoint);
  }

  postBasicInfoData(payload: any) {
    let endPoint = 'basic_info';
    return this.sendPostReq(endPoint, payload);
  }
}
