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
        browser.logBrowserInformation();
    }

    public get cssClassList() {
        const res = new Array<string>();

        if (browser.isMobile()) {
            res.push('app-mobile');
        }
        if (browser.isIE()) {
            res.push('app-ie');
        }

        return res;
    }
}
