import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api-endpoints';
import { Actuator } from '../models/actuator.model';
import { ActuatorState } from '../models/actuator-state.model';
import { RfidEntry } from '../models/dashboard.model';
import { SensorReading } from '../models/sensor-reading.model';
import { Sensor } from '../models/sensor.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  getSensors(location?: string): Observable<Sensor[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<Sensor[]>(this.buildUrl('/sensors'), { params });
  }

  getActuators(location?: string): Observable<Actuator[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<Actuator[]>(this.buildUrl('/actuators'), { params });
  }

  getActuatorStates(location?: string): Observable<ActuatorState[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<ActuatorState[]>(this.buildUrl('/actuator-states'), { params });
  }

  setActuatorState(actuatorId: string, status: ActuatorState['status']): Observable<ActuatorState> {
    return this.http.put<ActuatorState>(this.buildUrl(`/actuators/${actuatorId}/state`), { status });
  }

  getLatestReadings(location?: string): Observable<SensorReading[]> {
    const params = location ? new HttpParams().set('location', location) : undefined;
    return this.http.get<SensorReading[]>(this.buildUrl(`${API_ENDPOINTS.readings}/latest`), { params });
  }

  getReadingsBySensorId(sensorId: string): Observable<SensorReading[]> {
    return this.http.get<SensorReading[]>(this.buildUrl(`${API_ENDPOINTS.readings}/${sensorId}`));
  }

  getRfidLogs(): Observable<RfidEntry[]> {
    return this.http.get<RfidEntry[]>(this.buildUrl(`${API_ENDPOINTS.rfid}/5`)).pipe(
      map((rows) =>
        (rows ?? []).map((r) => ({
          ...r,
          timestamp: this.normalizeApiTimestamp((r as RfidEntry).timestamp),
          type: (r as RfidEntry).type ?? 'Access',
        })),
      ),
      catchError(() => of([])),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private buildUrl(path: string): string {
    return `${API_BASE_URL}${path}`;
  }

  private normalizeApiTimestamp(t: unknown): string {
    if (t == null) {
      return '';
    }
    if (typeof t === 'string') {
      return t;
    }
    if (t instanceof Array) {
      // Java LocalDateTime as JSON array: [y,M,d,h,m,s,n]
      return new Date(
        t[0],
        (t[1] as number) - 1,
        t[2] as number,
        t[3] as number,
        t[4] as number,
        t[5] as number,
        Math.floor((t[6] as number) / 1_000_000),
      ).toISOString();
    }
    return String(t);
  }
}
