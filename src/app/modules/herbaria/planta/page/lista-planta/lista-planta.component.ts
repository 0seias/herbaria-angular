import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastService } from "ng-uikit-pro-standard";
import { Planta } from "../../model/planta";
import { PlantaService } from "../../service/planta.service";

/*export interface PeriodicElement {
  nomeComum: string;
  familia: string;
  nomeCientifico: string;
} */

@Component({
  selector: "app-lista-planta",
  templateUrl: "./lista-planta.component.html",
  styleUrls: ["./lista-planta.component.scss"],
})
export class ListaPlantaComponent implements OnInit {
  planta = {} as Planta;
  listaPlanta: Planta[] = [];
  listaPlantaById: Planta[] = [];
  isVisible = false;
  dataSource!: MatTableDataSource<any>;

  AmbienteOptions: Array<any> = [];

  displayedColumns: string[] = [
    "familia",
    "nomeCientifico",
    "nomeComum",
    "acoes",

  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private plantaService: PlantaService,
    private toast: ToastService
  ) { }

  ngOnInit() {

    this.getSigla();

  }

  
  getPlantaById() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
    .getPlantaByFilter(this.planta)
    .subscribe((res) => {
      this.listaPlantaById = res;
      if (this.listaPlantaById.length !== 0) {
            this.dataSource = new MatTableDataSource(this.listaPlantaById);
            this.isVisible = true;
            console.log('2');
            console.log(this.listaPlantaById);

      } else {
        this.toast.info("", "Nenhum registro encontrado", options);
        this.isVisible = false;
      }
    });
    console.log('1');
    console.log(this.listaPlantaById);

    
  }

  getPlanta() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
      .getPlanta()
      .subscribe((res) => {
        this.listaPlanta = res.dados;        
        if (this.listaPlanta.length !== 0) {
          if (
            this.planta.familia == undefined &&
            this.planta.nomeCientifico == undefined &&
            this.planta.nomeComum == undefined ||
            this.planta.nomeCientifico =='' &&
            this.planta.nomeComum ==  ''  &&
            this.planta.familia == '' ) 
            {
            this.dataSource = new MatTableDataSource(this.listaPlanta);
            this.isVisible = true;
            console.log('usou o get normal');
          } else {
            console.log('usou o getbyid');
            
            this.getPlantaById()
          }

        } else {
          this.toast.info("", "Nenhum registro encontrado", options);
          this.isVisible = false;
        }


      });
  }


  filtr(){
  let v = this.listaPlanta.filter(function (currentElement) {


    return currentElement.familia === "" &&
           currentElement.nomeCientifico === "" &&
           currentElement.nomeComum === "";
  });

  }


  getSigla() {
    const options = { opacity: 1 };
    this.plantaService
      .getPlanta()
      .subscribe((res) => {
        this.listaPlanta = res.dados;
        this.AmbienteOptions = this.listaPlanta.map(v => v.familia)

      });
  }

  deletePlanta(sigla: string) {
    const options = { opacity: 1 };
    this.plantaService
      .deletePlanta(sigla);

  }



  updatePlanta() {
    const options = { opacity: 1 };
    this.plantaService
      .updatePlanta(this.planta);
  }




  clear() {
    const options = { opacity: 1 };
    this.planta.nomeCientifico = '';
    this.planta.familia = '';
    this.planta.nomeComum = '';

  }


  close() {
    const options = { opacity: 1 };
    this.isVisible = false;

  }


  getPlantaById2() {
    const options = { opacity: 1 };
    this.plantaService
      .getPlantaByFilter(this.planta)
      .subscribe((listaPlanta: Planta[]) => {
        this.listaPlanta = listaPlanta;
        if (this.listaPlanta.length !== 0) {
          this.dataSource = new MatTableDataSource(this.listaPlanta);
          this.isVisible = true;
        } else {
          this.toast.info("", "Nenhum registro encontrado", options);
          this.isVisible = false;
        }
      });
  }






}