import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { VehicleAndDriverSelectionComponent } from './components/vihicle-and-driver-selection/vehicle-and-driver-selection.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [authGuard]
  },

  {
    path: 'booking/wizard',
    component: MainComponent,
    canActivate: [authGuard],
  },

  {
    path: 'booking/wizard/booking_steps/:bookingID',
    component: VehicleAndDriverSelectionComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
