import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    declarations: [
        HomeComponent,
        SearchComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [HomeComponent]
})
export class HomeModule { }
