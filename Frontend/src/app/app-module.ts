import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BaseChartDirective } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { apiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { GarageDashboardComponent } from './features/garage-dashboard/garage-dashboard.component';
import { HomeDashboardComponent } from './features/home-dashboard/home-dashboard.component';
import { HospitalDashboardComponent } from './features/hospital-dashboard/hospital-dashboard.component';
import { ReadingChartComponent } from './shared/components/reading-chart/reading-chart.component';
import { RfidTableComponent } from './shared/components/rfid-table/rfid-table.component';
import { SummaryCardComponent } from './shared/components/summary-card/summary-card.component';
import { StatusLabelPipe } from './shared/pipes/status-label.pipe';
import { ActuatorsEffects } from './store/effects/actuators.effects';
import { ReadingsEffects } from './store/effects/readings.effects';
import { SensorsEffects } from './store/effects/sensors.effects';
import { actuatorsReducer } from './store/reducers/actuators.reducer';
import { readingsReducer } from './store/reducers/readings.reducer';
import { sensorsReducer } from './store/reducers/sensors.reducer';

@NgModule({
  declarations: [
    App,
    HomeDashboardComponent,
    HospitalDashboardComponent,
    GarageDashboardComponent,
    SummaryCardComponent,
    ReadingChartComponent,
    RfidTableComponent,
    StatusLabelPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatListModule,
    MatTableModule,
    BaseChartDirective,
    StoreModule.forRoot({
      sensors: sensorsReducer,
      readings: readingsReducer,
      actuators: actuatorsReducer,
    }),
    EffectsModule.forRoot([SensorsEffects, ReadingsEffects, ActuatorsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([apiPrefixInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
