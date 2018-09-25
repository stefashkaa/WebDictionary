import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        HomeComponent,
        SearchComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ],
    providers: [],
    bootstrap: [HomeComponent]
})
export class HomeModule { }
