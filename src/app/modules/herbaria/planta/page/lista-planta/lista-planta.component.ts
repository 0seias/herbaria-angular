import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastService } from "ng-uikit-pro-standard";
import { ConfigPrioridade } from "../../model/planta";
import { PlantaService } from "../../service/planta.service";

/*export interface PeriodicElement {
  indiceProduto: string;
  siglaProduto: string;
  descricaoProduto: string;
} */

@Component({
  selector: "app-lista-planta",
  templateUrl: "./lista-planta.component.html",
  styleUrls: ["./lista-planta.component.scss"],
})
export class ListaPlantaComponent implements OnInit {
  configPrioridade = {} as ConfigPrioridade;
  listaConfigPrioridade: ConfigPrioridade[] = [];
  listaConfigPrioridadeById: ConfigPrioridade[] = [];
  isVisible = false;
  dataSource!: MatTableDataSource<any>;

  AmbienteOptions: Array<any> = [];

  displayedColumns: string[] = [
    "siglaProduto",
    "descricaoProduto",
    "indiceProduto",
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

  
  getConfigPrioridadeById() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
    .getConfigPrioridadeByFilter(this.configPrioridade)
    .subscribe((res) => {
      this.listaConfigPrioridadeById = res;
      if (this.listaConfigPrioridadeById.length !== 0) {
            this.dataSource = new MatTableDataSource(this.listaConfigPrioridadeById);
            this.isVisible = true;
            console.log('2');
            console.log(this.listaConfigPrioridadeById);

      } else {
        this.toast.info("", "Nenhum registro encontrado", options);
        this.isVisible = false;
      }
    });
    console.log('1');
    console.log(this.listaConfigPrioridadeById);

    
  }

  getConfigPrioridade() {
    const options = { opacity: 1 };
    this.isVisible = true;
    this.plantaService
      .getConfigPrioridade()
      .subscribe((res) => {
        this.listaConfigPrioridade = res.dados;        
        if (this.listaConfigPrioridade.length !== 0) {
          if (
            this.configPrioridade.siglaProduto == undefined &&
            this.configPrioridade.descricaoProduto == undefined &&
            this.configPrioridade.indiceProduto == undefined ||
            this.configPrioridade.descricaoProduto =='' &&
            this.configPrioridade.indiceProduto ==  ''  &&
            this.configPrioridade.siglaProduto == '' ) 
            {
            this.dataSource = new MatTableDataSource(this.listaConfigPrioridade);
            this.isVisible = true;
            console.log('usou o get normal');
          } else {
            console.log('usou o getbyid');
            
            this.getConfigPrioridadeById()
          }

        } else {
          this.toast.info("", "Nenhum registro encontrado", options);
          this.isVisible = false;
        }


      });
  }


  filtr(){
  let v = this.listaConfigPrioridade.filter(function (currentElement) {


    return currentElement.siglaProduto === "" &&
           currentElement.descricaoProduto === "" &&
           currentElement.indiceProduto === "";
  });

  }


  getSigla() {
    const options = { opacity: 1 };
    this.plantaService
      .getConfigPrioridade()
      .subscribe((res) => {
        this.listaConfigPrioridade = res.dados;
        this.AmbienteOptions = this.listaConfigPrioridade.map(v => v.siglaProduto)

      });
  }

  deleteConfigPrioridade(sigla: string) {
    const options = { opacity: 1 };
    this.plantaService
      .deleteConfigPrioridade(sigla);

  }



  updateConfigPrioridade() {
    const options = { opacity: 1 };
    this.plantaService
      .updateConfigPrioridade(this.configPrioridade);
  }




  clear() {
    const options = { opacity: 1 };
    this.configPrioridade.descricaoProduto = '';
    this.configPrioridade.siglaProduto = '';
    this.configPrioridade.indiceProduto = '';

  }


  close() {
    const options = { opacity: 1 };
    this.isVisible = false;

  }


  getConfigPrioridadeById2() {
    const options = { opacity: 1 };
    this.plantaService
      .getConfigPrioridadeByFilter(this.configPrioridade)
      .subscribe((listaConfigPrioridade: ConfigPrioridade[]) => {
        this.listaConfigPrioridade = listaConfigPrioridade;
        if (this.listaConfigPrioridade.length !== 0) {
          this.dataSource = new MatTableDataSource(this.listaConfigPrioridade);
          this.isVisible = true;
        } else {
          this.toast.info("", "Nenhum registro encontrado", options);
          this.isVisible = false;
        }
      });
  }






}