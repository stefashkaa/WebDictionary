import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ListDataComponent } from './list-data.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ListDataComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: 'list-data', component: ListDataComponent }
        ])
    ],
    providers: [],
    bootstrap: [ListDataComponent]
})
export class ListDataModule { }
