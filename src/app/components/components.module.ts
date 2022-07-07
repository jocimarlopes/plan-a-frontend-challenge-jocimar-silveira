import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from "./card-movie/card-movie.component";

@NgModule({
    declarations: [CardMovieComponent],
    imports: [IonicModule, CommonModule],
    exports: [CardMovieComponent]
})

export class ComponentsModule {

    constructor() {}
}