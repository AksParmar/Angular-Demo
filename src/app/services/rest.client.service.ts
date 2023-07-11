import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestClientService {

  private readonly apiUrl: string = '';
  private readonly auth_token: string = '';
  private readonly headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth_token}`);

  private http: HttpClient = inject(HttpClient);

  private sendGetReq(endPoint: string) {
    return this.http.get(this.apiUrl + endPoint, { headers: this.headers });
  }

  private sendPostReq(endPoint: string, payload: any) {
    return this.http.post(this.apiUrl + endPoint, payload, { headers: this.headers });
  }

  getScopePackageData() {
    let endPoint = 'select_scope_package';
    return this.sendGetReq(endPoint);
  }

  postScopePackageData(payload: any) {
    let endPoint = 'select_scope_package';
    return this.sendPostReq(endPoint, payload);
  }

  getBasicInfoData(bookingId: string, scopePackageId: string) {
    let endPoint = `basic_info?booking_id=${bookingId}&scope_package_id=${scopePackageId}`;
    return this.sendGetReq(endPoint);
  }

  postBasicInfoData(payload: any) {
    let endPoint = 'basic_info';
    return this.sendPostReq(endPoint, payload);
  }


}
