import { Component } from '@angular/core';

import { browser } from '../util/browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public title = 'app';

    constructor() {
    }

    public get cssClassList() {
        const res = new Array<string>();

        if (browser.isMobile()) {
            res.push('app-mobile');
        }

        return res;
    }
}
