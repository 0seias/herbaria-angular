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

    this.getSigla();

  }

  
  getPlantaById() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
    .getPlanta()
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
        this.listaPlanta = res;
            this.dataSource = new MatTableDataSource(this.listaPlanta);
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


  getSigla() {
    const options = { opacity: 1 };
    this.plantaService
      .getPlanta()
      .subscribe((res) => {
        this.listaPlanta = res;
        this.AmbienteOptions = this.listaPlanta.map(v => v.familia)

      });
  }


  deletePlanta(id: number){
    this.plantaService.deletePlanta(id)
    .subscribe(res=>{
      this.getPlanta();
    })
  }


  updatePlanta(id: number) {
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


  getPlantaById2() {
  }






}
