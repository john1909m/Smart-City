import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { GarageDashboardComponent } from './features/garage-dashboard/garage-dashboard.component';
import { HomeDashboardComponent } from './features/home-dashboard/home-dashboard.component';
import { HospitalDashboardComponent } from './features/hospital-dashboard/hospital-dashboard.component';
import { RoadDashboardComponent } from './features/road-dashboard/road-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeDashboardComponent },
  { path: 'hospital', component: HospitalDashboardComponent },
  { path: 'garage', component: GarageDashboardComponent },
  { path: 'road', component: RoadDashboardComponent },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
