import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ContestElement,
  Puntuacion,
  Concursos,
} from '../../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditDialog } from './edit-dialog.component';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
})
export class ContestComponent implements OnInit {
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  rankingsColumns: string[] = [
    'Nombre',
    'IdCcms',
    'Puntuacion',
    'NombreConcurso',
  ];
  concursosColumns: string[] = [
    'NombreConcurso',
    'LimiteParticipantes',
    'FechaConcurso',
    'Estado',
    'Acciones',
  ];
  concursoColumns: string[] = [
    'Nombre',
    'IdCcms',
    'NombreConcurso',
    'FechaConcurso',
  ];

  rankings: Puntuacion[] = [];
  concursos: Concursos[] = [];
  concurso: Concursos[] = [];

  listConcursos: Array<any> = [];
  isAdmin: boolean = this.api.isAdmin();
  developer: string = 'Jhonatan Ruiz Alonso';

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.api.request({ Case: 5 }, 'contest').subscribe(
      (data: any) => {
        this.rankings = data.body.ContestListRanking;
      },
      (err) => {
        console.log(err);
      }
    );
    if(!this.isAdmin){
      this.api.request({ Case: 2 }, 'contest').subscribe(
        (data: any) => {
          this.concurso = data.body.ContestList;
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.api.request({ Case: 1 }, 'contest').subscribe(
      (data: any) => {
        this.concursos = data.body.ContestList;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  inscripcion(IdConcurso: any) {
    this.api.request({ Case: 4, IdConcurso }, 'contest').subscribe(
      (res: any) => {
        this.toastr.success(res.body.Result);
      },
      (err) => {
        this.toastr.error(err.body.Result);
      }
    );
  }
  openDialog(data: any) {
    this.dialog.open(EditDialog, { data });
  }
}
