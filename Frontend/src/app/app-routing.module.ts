import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageDashboardComponent } from './features/garage-dashboard/garage-dashboard.component';
import { HomeDashboardComponent } from './features/home-dashboard/home-dashboard.component';
import { HospitalDashboardComponent } from './features/hospital-dashboard/hospital-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeDashboardComponent },
  { path: 'hospital', component: HospitalDashboardComponent },
  { path: 'garage', component: GarageDashboardComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
