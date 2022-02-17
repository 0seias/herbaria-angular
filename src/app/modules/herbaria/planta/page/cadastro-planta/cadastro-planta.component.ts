import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ToastService } from "ng-uikit-pro-standard";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfigPrioridade } from "../../model/planta";
import { MatTableDataSource } from "@angular/material/table";
import { PlantaService } from "../../service/planta.service";

@Component({
  selector: "app-cadastro-planta",
  templateUrl: "./cadastro-planta.component.html",
  styleUrls: ["./cadastro-planta.component.scss"],
})
export class CadastroPlantaComponent implements OnInit {
  titulo: string | undefined;
  configPrioridade = {} as ConfigPrioridade;
  idConfigPrioridade!: string;
  isVisible = false;
  listaConfigPrioridade: ConfigPrioridade[] = [];
  email = new FormControl("", [Validators.required, Validators.email]);
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    "siglaProduto",
    "descricaoProduto",
    "indiceProduto",
    "acoes",

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
      this.idConfigPrioridade = params["id"];
    });

    if (this.idConfigPrioridade != '0' ) {
        this.plantaService
        .getConfigPrioridadeById(this.idConfigPrioridade)
        .subscribe((configPrioridade: any) => {
          this.configPrioridade = configPrioridade.dados;
          console.log(configPrioridade.dados);
          
        });
      this.titulo = "Atualizar";

    } else {
      this.titulo = "Cadastrar";
    }
  }

  saveConfigPrioridade(form: NgForm) {
    this.isVisible = true;
    const options = { opacity: 1 };
    if (this.idConfigPrioridade != '0') {
      
      this.plantaService.updateConfigPrioridade(this.configPrioridade).subscribe(() => {
        this.cleanForm(form);
        this.toast.success("", "Registro Atualizado com Sucesso", options);
      });
    } else {
      this.plantaService.saveConfigPrioridade(this.configPrioridade).subscribe(() => {
        this.cleanForm(form);
        this.toast.success("", "Registro Cadastrado com Sucesso", options)


      });
    }
    this.router.navigate(['/lista-planta']);

    this.isVisible = true;

  }
  
  deleteConfigPrioridade() {
    const options = { opacity: 1 };
    this.plantaService
      .getConfigPrioridadeByFilter(this.configPrioridade);
  }

  getConfigPrioridade() {
    const options = { opacity: 1 };
    this.isVisible = true;
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
  getConfigPrioridadeById() {
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
    this.configPrioridade = {} as ConfigPrioridade;
  }

  clear2(form: NgForm) {
    form.resetForm();
    this.configPrioridade = {} as ConfigPrioridade;
  }


  getErrorMessage() {
    if (this.email.hasError("required")) {
      return "Campo Obrigatório";
    }

    return this.email.hasError("email") ? "Não é um E-mail válido" : "";
  }
}
