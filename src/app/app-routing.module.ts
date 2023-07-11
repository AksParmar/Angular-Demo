import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { VehicleAndDriverSelectionComponent } from './components/vihicle-and-driver-selection/vehicle-and-driver-selection.component';

const routes: Routes = [
    {
      path: '',
      component: MainComponent
    },
    {
      path: 'booking_steps/:bookingID',
      component: VehicleAndDriverSelectionComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
