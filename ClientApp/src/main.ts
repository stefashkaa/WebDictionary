import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/components/app.module';
import { environment } from './environments/environment';
import { initTrace } from './app/diagnostic/trace.init';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

const providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
    enableProdMode();
}

initTrace();

platformBrowserDynamic(providers).bootstrapModule(AppModule)
    .catch(err => console.log(err));
