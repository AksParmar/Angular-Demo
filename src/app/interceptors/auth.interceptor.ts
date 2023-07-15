import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private toastr: ToastrService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if(this.authService.isTokenExpired()) {
            this.authService.logout();
        }

        if (token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            })
        }
        


        return next.handle(req).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse) {
                        if (event.status == 200 && event.body.status_code == 200) {
                            if(event.body.success == false) {
                                this.toastr.error(event.body.message, "Fulcrum - Error");
                            }
                            
                            if(event.body.success == true) {
                                this.toastr.success(event.body.message, "Fulcrum - Success");
                            }
                        }
                        
                        
                    }
                },
                error: (error) => {
                    this.toastr.error(error.message, "Fulcrum - Error");
                },
                finalize: () => {

                }
            })
        )
    }

}