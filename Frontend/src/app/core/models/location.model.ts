export type LocationType = 'home' | 'hospital' | 'garage' | 'road';

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  description?: string;
}
