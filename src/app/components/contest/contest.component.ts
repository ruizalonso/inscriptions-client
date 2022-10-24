import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContestElement, Puntuacion } from '../../interfaces/interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
})
export class ContestComponent implements OnInit {
  rankingsColumns: string[] = [
    'Nombre',
    'IdCcms',
    'Puntuacion',
    'NombreConcurso',
    'NombreActividad',
  ];
  contestColumns: string[] = [
    'Nombre',
    'IdCcms',
    'NombreConcurso',
    'FechaConcurso',
  ];

  rankings: Puntuacion[] = [];
  rolSelected = '';
  contestOff: boolean = false;
  dataContest: ContestElement[] = [];
  listCiudades: Array<any> = [];
  listSexos: Array<any> = [];
  listRoles: Array<any> = [];
  listConcursos: Array<any> = [];
  developer: string = 'Jhonatan Ruiz Alonso';
  constructor(private api: ApiService, private toastr: ToastrService) {}

  Registration = new FormGroup({
    IdCcms: new FormControl('', Validators.required),
    IdRol: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Cedula: new FormControl('', Validators.required),
    IdCiudad: new FormControl('', Validators.required),
    IdSexo: new FormControl('', Validators.required),
    FechaNacimiento: new FormControl('', Validators.required),
    IdConcurso: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    this.api.request({ Case: 3 }, 'users').subscribe(
      (data: any) => {
        this.listCiudades = data.body.CitysList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 4 }, 'users').subscribe(
      (data: any) => {
        this.listRoles = data.body.RolesList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 5 }, 'users').subscribe(
      (data: any) => {
        this.listSexos = data.body.GenderList;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 5 }, 'contest').subscribe(
      (data: any) => {
        this.rankings = data.body.ContestListRanking;
      },
      (err) => {
        console.log(err);
      }
    );
    this.api.request({ Case: 2 }, 'contest').subscribe(
      (data: any) => {
        this.dataContest = data.body.ContestList;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getFormValues(value: any) {
    let params = {
      Case: 2,
      IdCcms: value.IdCcms,
      IdRol: value.IdRol,
      Nombre: value.Nombre,
      Cedula: value.Cedula,
      IdCiudad: value.IdCiudad,
      IdSexo: value.IdSexo,
      FechaNacimiento: value.FechaNacimiento,
    };
    this.sendForm(params);
  }

  onSelectCity(IdCiudad: any) {
    this.api.request({ Case: 3, IdCiudad }, 'contest').subscribe(
      (data: any) => {
        this.listConcursos = data.body.ContestListCities;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  sendForm(value: any) {
    this.api
      .request(
        {
          Case: value.Case,
          IdCcms: value.IdCcms,
          IdRol: value.IdRol,
          Nombre: value.Nombre,
          Cedula: value.Cedula,
          IdCiudad: value.IdCiudad,
          IdSexo: value.IdSexo,
          FechaNacimiento: value.FechaNacimiento,
        },
        'users'
      )
      .subscribe(
        (res: any) => {
          console.log('sendForm res', res);
          switch (value.Case) {
            case 1:
              console.log('value.case 1');
              this.setContest(res.body.UserList);
              break;
            case 2:
              console.log('value.case 2');
              if (res.body != 'User already registered') {
                this.sendForm({
                  Case: 1,
                  IdCcms: this.Registration.value.IdCcms,
                });
                this.toastr.success(res.body);
              } else if (res.body == 'User already registered') {
                this.toastr.error(res.body);
                this.Registration.disable();
              }
              break;
            case 3:
              console.log(value.Case, 'value.case 3');
              break;
            default:
              break;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  setContest(UserList: any) {
    console.log(UserList[0].IdUsuario);
    this.api
      .request(
        {
          Case: 4,
          IdConcurso: this.Registration.value.IdConcurso,
          IdUsuario: UserList[0].IdUsuario,
        },
        'contest'
      )
      .subscribe(
        (res: any) => {
          this.toastr.success(res.body);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
