export interface Title {
  id: number;
  name: string;
  synopsis: string;
  genres: string[];
  maturity: string;
  year: number;
  durationMinutes: number;
  match: number;
  accent: string;
  videoUrl: string;
}

export interface Row {
  label: string;
  titleIds: number[];
}

export interface CatalogResponse {
  catalog: Title[];
  rows: Row[];
  featuredId: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
}
