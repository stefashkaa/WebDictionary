import { Component } from '@angular/core';

import { Util } from '../../util/util';

@Component({
    selector: 'app-abc-index',
    templateUrl: './abc-index.component.html',
    styleUrls: ['./abc-index.component.less']
})
export class AbcIndexComponent {
    public readonly letterGroups: string[][] = Util.letterGroups;

    constructor() {
    }
}
