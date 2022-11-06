import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {
  Logs, Concurso
} from '../../interfaces/interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private api: ApiService,) { }
  logColumns: string[] = [
    'Nombre',
    'IdCcms',
    'NombreConcurso',
    'Descripcion',
    'FechaRegistro',
  ];
  concursosColumns: string[] = [
    'Nombre',
    'IdCcms',
    'NombreConcurso',
    'FechaConcurso',
  ];
  concursos: Concurso[] = [];
  logs: Logs[] = [];
  isAdmin: boolean = this.api.isAdmin();
  developer: string = 'Jhonatan Ruiz Alonso';
  ngOnInit(): void {
    this.getAllData()
  }

  getAllData() {
    this.api.request({ Case: 7 }, 'contest').subscribe(
      (data: any) => {
        this.logs = data.body.LogList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 3 }, 'contest').subscribe(
      (data: any) => {
        this.concursos = data.body.ContestList;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
