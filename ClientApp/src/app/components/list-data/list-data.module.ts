import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ListDataComponent } from './list-data.component';
import { ListWordComponent } from './list-word/list-word.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ListDataComponent,
        ListWordComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: 'list-data', component: ListDataComponent },
            { path: 'list-data/:letter', component: ListWordComponent }
        ])
    ],
    providers: [],
    bootstrap: [ListDataComponent]
})
export class ListDataModule { }
