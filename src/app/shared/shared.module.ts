import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [
        HttpClientModule,
        MatSnackBarModule
    ],
    exports: [
        HttpClientModule,
        MatSnackBarModule
    ]
})
export class SharedModule {

}
