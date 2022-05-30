import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { LoginComponent } from './page/login/login.component';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [
        HttpClientModule
    ],
    declarations: [
      LoginComponent
    ]
})
export class SharedModule {

}