import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { ScopePackageComponent } from './components/scope-package/scope-package.component';
import { BookingTypeSelectorComponent } from './components/booking-type-selector/booking-type-selector.component';
import { VehicleAndDriverSelectionComponent } from './components/vihicle-and-driver-selection/vehicle-and-driver-selection.component';
import { MainComponent } from './components/main/main.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    ScopePackageComponent,
    BookingTypeSelectorComponent,
    VehicleAndDriverSelectionComponent,
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
