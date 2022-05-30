import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastService } from "ng-uikit-pro-standard";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Planta } from "../../model/planta";
import { MatTableDataSource } from "@angular/material/table";
import { PlantaService } from "../../service/planta.service";

@Component({
  selector: "app-cadastro-planta",
  templateUrl: "./cadastro-planta.component.html",
  styleUrls: ["./cadastro-planta.component.scss"],
})
export class CadastroPlantaComponent implements OnInit {
  titulo: string | undefined;
  planta = {} as Planta;
  idPlanta!: string;
  isVisible = false;
  listaPlanta: Planta[] = [];
  email = new FormControl("", [Validators.required, Validators.email]);
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    "familia",
    "nomeCientifico",
    "nomeComum",
    "acoes",
    "polinizacao",

  ];

  constructor(

    private router: Router,
    private plantaService: PlantaService,
    private toast: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.route.params.subscribe((params) => {
      this.idPlanta = params["id"];
    });

    if (this.idPlanta != '0' ) {
        this.plantaService
        .getPlantaById(this.idPlanta)
        .subscribe((planta: any) => {
          this.planta = planta.dados;
          console.log(planta.dados);
          
        });
      this.titulo = "Atualizar";

    } else {
      this.titulo = "Cadastrar";
    }
  }

  savePlanta(form: NgForm) {
    this.isVisible = true;
    const options = { opacity: 1 };
    if (this.idPlanta != '0') {
      
      this.plantaService.updatePlanta(this.planta).subscribe(() => {
        this.cleanForm(form);
        this.toast.success("", "Registro Atualizado com Sucesso", options);
      });
    } else {
      this.plantaService.savePlanta(this.planta).subscribe(() => {
        this.cleanForm(form);
        this.toast.success("", "Registro Cadastrado com Sucesso", options)


      });
    }
    this.router.navigate(['/lista-planta']);

    this.isVisible = true;

  }
  
  deletePlanta() {
    const options = { opacity: 1 };
    this.plantaService
      .getPlantaByFilter(this.planta);
  }

  getPlanta() {
    const options = { opacity: 1 };
    this.isVisible = true;
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
  getPlantaById() {
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


  close() {
    const options = { opacity: 1 };
    this.isVisible = false;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  cleanForm(form: NgForm) {
    form.resetForm();
    this.planta = {} as Planta;
  }

  clear2(form: NgForm) {
    form.resetForm();
    this.planta = {} as Planta;
  }


  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "Campo Obrigatório";
    }

    return this.email.hasError("email") ? "Não é um E-mail válido" : "";
  }
}
