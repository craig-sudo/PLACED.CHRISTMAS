
export enum ServiceType {
  None = 'None',
  Lights = 'Christmas Lights',
  Gutters = 'Gutter Cleaning',
  Inspection = 'Roof Inspection',
}

export enum LightingType {
  None = 'None',
  Rental = 'Rental',
  ClientOwned = 'Client-Owned',
}

export type StoriesType = '1' | '1.5' | '2' | '2+';

export interface QuoteFormData {
  serviceType: ServiceType;
  homeSizeSqFt: number;
  roofLinesLinearFeet: number;
  lightingType: LightingType;
  stories: StoriesType;
  visualizationFile: File | null;
  name: string;
  email: string;
  phone: string;
}
