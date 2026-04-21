import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api-endpoints';
import { Actuator } from '../models/actuator.model';
import { ActuatorState } from '../models/actuator-state.model';
import { DashboardData } from '../models/dashboard.model';
import { Location } from '../models/location.model';
import { SensorReading } from '../models/sensor-reading.model';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  getSensors(location?: string): Observable<Sensor[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<Sensor[]>(this.buildUrl(API_ENDPOINTS.sensors), { params });
  }

  getReadings(sensorId: string): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(this.buildUrl(`${API_ENDPOINTS.sensors}/${sensorId}/readings`));
  }

  getLatestReadings(location?: string): Observable<SensorReading[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<SensorReading[]>(this.buildUrl(`${API_ENDPOINTS.readings}/latest`), { params });
  }

  getActuators(location?: string): Observable<Actuator[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<Actuator[]>(this.buildUrl(API_ENDPOINTS.actuators), { params });
  }

  getActuatorStates(location?: string): Observable<ActuatorState[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<ActuatorState[]>(this.buildUrl(API_ENDPOINTS.actuatorStates), { params });
  }

  setActuatorState(actuatorId: string, status: ActuatorState['status']): Observable<ActuatorState> {
    return this.http.put<ActuatorState>(this.buildUrl(`${API_ENDPOINTS.actuators}/${actuatorId}/state`), { status });
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.buildUrl(API_ENDPOINTS.locations));
  }

  getDashboard(location: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.buildUrl(`${API_ENDPOINTS.dashboards}/${location}`));
  }

  private buildUrl(path: string): string {
    return `${API_BASE_URL}${path}`;
  }
}
