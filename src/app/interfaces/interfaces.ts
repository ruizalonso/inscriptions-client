export interface ContestElement {
  Nombre: string;
  FechaConcurso: Date;
  NombreConcurso: string;
  IdCcms: number;
}

export interface Cases {
  Case: number;
  IdUsuario?: number;
  IdConcurso?: number;
}

export interface Users {
  Case: number;
  IdCcms: number;
  Nombre: string;
  Cedula: number;
  IdCiudad: number;
  IdSexo: number;
  FechaNacimiento: Date;
}

export interface Puntuacion {
  Nombre: string;
  IdCcms: number;
  Cedula: number;
  Puntuacion: number;
  NombreConcurso: string;
  NombreActividad: string;
}
