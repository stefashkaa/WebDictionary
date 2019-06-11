import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AbcIndexComponent } from './abc-index.component';
import { ListWordComponent } from './list-word/list-word.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AbcIndexComponent,
        ListWordComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forRoot([
            { path: 'abc-index', component: AbcIndexComponent },
            { path: 'abc-index/:letter', component: ListWordComponent }
        ])
    ],
    providers: [],
    bootstrap: [AbcIndexComponent]
})
export class AbcIndexModule { }
