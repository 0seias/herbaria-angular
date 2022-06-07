import { CreateUserComponent } from './shared/page/create-user/create-user.component';
import { LoginComponent } from './shared/page/login/login.component';
import { HerbariaComponent } from './modules/herbaria/herbaria.component';
import { CadastroPlantaComponent } from './modules/herbaria/planta/page/cadastro-planta/cadastro-planta.component';
import { ListaPlantaComponent } from './modules/herbaria/planta/page/lista-planta/lista-planta.component';
import { LayoutDefaultComponent } from './core/layout-default/layout-default.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: LayoutDefaultComponent,
    children: [
      { path: "lista-planta", component: ListaPlantaComponent },
      { path: "cadastro-planta/:id", component: CadastroPlantaComponent },
      { path: "herbaria", component: HerbariaComponent },
      { path: "", component: LoginComponent},
      { path: "create-user", component: CreateUserComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
