import { LoginComponent } from './../shared/page/login/login.component';
import { HerbariaComponent } from './../modules/herbaria/herbaria.component';
import { CadastroPlantaComponent } from './../modules/herbaria/planta/page/cadastro-planta/cadastro-planta.component';
import { ListaPlantaComponent } from './../modules/herbaria/planta/page/lista-planta/lista-planta.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutDefaultComponent } from './layout-default/layout-default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { ToastModule } from "ng-uikit-pro-standard";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    LayoutDefaultComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    HerbariaComponent,
    CadastroPlantaComponent,
    ListaPlantaComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ToastModule.forRoot(),
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule, 
    MatMenuModule, 
    MatButtonToggleModule,
    MatListModule
  ]
})
export class CoreModule { }
