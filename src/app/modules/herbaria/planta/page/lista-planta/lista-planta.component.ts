import { computeMsgId } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastService } from "ng-uikit-pro-standard";
import { Planta } from "../../model/planta";
import { PlantaService } from "../../service/planta.service";

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
 //   "polinizacao",  
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

    this.getFamilia();

  }

  
  getPlantaById() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
    .getPlantaPorFiltro(this.planta)
    .subscribe((res) => {
      this.listaPlantaById = res;
      if (this.listaPlantaById.length !== 0) {
            this.dataSource = new MatTableDataSource(this.listaPlantaById);
            this.isVisible = true;
            console.log(this.listaPlantaById);

      } else {
        this.toast.info("", "Nenhum registro encontrado", options);
        this.isVisible = false;
      }
    });
    console.log(this.listaPlantaById);


   }

  getPlanta() {

    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService

 //sigla = familia
 //descr = com
 //indi cien

    .getPlanta()
    .subscribe((res) => {
      this.listaPlanta = res;
          if (this.listaPlanta.length !== 0) {
          if (
            this.planta.familia == undefined &&
            this.planta.nomeComum == undefined &&
            this.planta.nomeCientifico == undefined ||
            this.planta.nomeComum =='' &&
            this.planta.nomeCientifico ==  ''  &&
            this.planta.familia == '' ) 
            {
            this.dataSource = new MatTableDataSource(this.listaPlanta);
            this.isVisible = true;
            console.log('usou o get normal');
          } else {
            console.log('usou o getbyid');
        
            this.getPlantaById()
            this.dataSource = new MatTableDataSource(this.listaPlanta);
            this.isVisible = true;

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
           currentElement.nomeComum === "" ;
       // d   && currentElement.polinizacao === "" ;
  });

  }


  getFamilia() {
    const options = { opacity: 1 };
    this.plantaService
      .getPlanta()
      .subscribe((res) => {
        this.listaPlanta = res;
        this.AmbienteOptions = this.listaPlanta.map(v => v.familia)

      });
  }


  deletePlanta(id: string){
    this.plantaService.deletePlanta(id)
    .subscribe(res=>{
      this.getPlanta();
    })
  }


  updatePlanta(id: string) {
    this.plantaService.deletePlanta(id)
    .subscribe(res=>{
      this.getPlanta();
    })
  }




  clear() {
    const options = { opacity: 1 };
    this.planta.nomeCientifico = '';
    this.planta.familia = '';
    this.planta.nomeComum = '';
 //   this.planta.polinizacao = '';

  }


  close() {
    const options = { opacity: 1 };
    this.isVisible = false;

  }









}
