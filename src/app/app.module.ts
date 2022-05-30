import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HerbariaComponent } from './modules/herbaria/herbaria.component';
import { CadastroPlantaComponent } from './modules/herbaria/planta/page/cadastro-planta/cadastro-planta.component';
import { ListaPlantaComponent } from './modules/herbaria/planta/page/lista-planta/lista-planta.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
