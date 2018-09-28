import { Component } from '@angular/core';
import { Util } from '../../util/util';

@Component({
    selector: 'app-list-data',
    templateUrl: './list-data.component.html',
    styleUrls: ['./list-data.component.less']
})
export class ListDataComponent {
    public readonly letterGroups: string[][] = Util.letterGroups; 

    constructor() {
    }
}
