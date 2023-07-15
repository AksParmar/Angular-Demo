import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { environment } from "src/environments/environment.development";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private toastr: ToastrService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (this.authService.isTokenExpired()) {
            this.authService.logout();
        }

        let reqData: any = {};
        
        reqData['url'] = environment.apiUrl + req.url; 
        
        if (token) {
            reqData['setHeaders'] = { Authorization: `Bearer ${token}` }    
        }

        req = req.clone(reqData)

        return next.handle(req).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse) {
                        if (event.status == 200 && event.body.status_code == 200) {
                            if (event.body.success == false) {
                                this.toastr.error(event.body.message, "Fulcrum");
                            }

                            if (event.body.success == true) {
                                this.toastr.success(event.body.message, "Fulcrum");
                            }
                        }


                    }
                },
                error: (error) => {
                    this.toastr.error(error.message, "Fulcrum");
                },
                finalize: () => {

                }
            })
        )
    }

}