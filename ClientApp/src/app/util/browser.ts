import * as _ from 'lodash';
import { UAParser } from 'ua-parser-js';

import { trace } from '../diagnostic/trace';

export class Browser {
    private isTabletCached: boolean;
    private isMobileCached: boolean;
    private isIeCached: boolean;
    private isIosCached: boolean;
    private isJavaFxCached: boolean;
    private browserCached: string;
    private deviceCached: string;
    private operatingSystemCached: string;
    private userAgent: string;

    private readonly logger = trace.get('Browser');

    constructor() {
        this.userAgent = window.navigator.userAgent.toLowerCase();
    }

    public get browser(): string {
        if (!this.browserCached) {
            this.browserCached = new UAParser().getBrowser().name;
        }
        return this.browserCached;
    }

    public get device(): string {
        if (!this.deviceCached) {
            this.deviceCached = new UAParser().getDevice().model || 'PC';
        }
        return this.deviceCached;
    }

    public get operatingSystem(): string {
        if (!this.operatingSystemCached) {
            const osData = new UAParser().getOS();
            this.operatingSystemCached = _.compact([osData.name, osData.version]).join(' ');
        }
        return this.operatingSystemCached;
    }

    public isMobile(): boolean {
        if (this.isMobileCached == null) {
            const mobileUserAgentRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
            this.isMobileCached = mobileUserAgentRegex.test(this.userAgent);
        }
        return this.isMobileCached;
    }

    public isIos(): boolean {
        if (this.isIosCached == null) {
            const iosRegex = /iPad|iPhone|iPod/i;
            this.isIosCached = iosRegex.test(this.userAgent) && !(window as any).MSStream;
        }
        return this.isIosCached;
    }

    public isTablet(): boolean {
        if (this.isTabletCached == null) {
            const tabletRegex = /Tablet|iPad/i;
            this.isTabletCached = tabletRegex.test(this.userAgent);
        }
        return this.isTabletCached;
    }

    public isIE(): boolean {
        if (this.isIeCached == null) {
            const ieUserAgentRegex = /msie|trident\/7/i;
            this.isIeCached = ieUserAgentRegex.test(this.userAgent);
        }
        return this.isIeCached;
    }

    public isJavaFX(): boolean {
        if (this.isJavaFxCached == null) {
            const javaFxUserAgentRegex = /javafx/i;
            this.isJavaFxCached = javaFxUserAgentRegex.test(this.userAgent);
        }
        return this.isJavaFxCached;
    }

    public logBrowserInformation() {
        const timeZoneOffset = new Date().getTimezoneOffset();
        let gmt = (-timeZoneOffset / 60).toString(10);
        if (timeZoneOffset <= 0) {
            gmt = `+${gmt}`;
        }
        const browserInfo = {
            appCodeName: window.navigator.appCodeName,
            appName: window.navigator.appName,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor,
            userAgent: window.navigator.userAgent,
            cookieEnabled: window.navigator.cookieEnabled,
            language: window.navigator.language,
            timeZoneOffset: `${timeZoneOffset}min (GMT${gmt})`,
            screen: `${screen.width}x${screen.height}`
        };
        this.logger.info('browser info', browserInfo);
    }

    public isInIframe(): boolean {
        try {
            return window.parent && window.top !== window.self;
        } catch (e) {
            return true;
        }
    }

    private getOrientationType(): string {
        const obj = (<any>screen).orientation || (<any>screen).mozOrientation || screen.msOrientation;
        return obj ? obj.type : null;
    }

    public isLandscape(): boolean {
        const orientationType = this.getOrientationType();
        return !this.isPortraitOrientationType(orientationType) &&
            (this.isLandscapeOrientationType(orientationType) || this.isLandscapeByDimensions());
    }

    public isPortrait(): boolean {
        const orientationType = this.getOrientationType();
        return !this.isLandscapeOrientationType(orientationType) &&
            (this.isPortraitOrientationType(orientationType) || !this.isLandscapeByDimensions());
    }

    private isPortraitOrientationType(orientationType: string): boolean {
        return orientationType === 'portrait-primary' ||
            orientationType === 'portrait-secondary';
    }

    private isLandscapeOrientationType(orientationType: string): boolean {
        return orientationType === 'landscape-primary' ||
            orientationType === 'landscape-secondary';
    }

    private isLandscapeByDimensions(): boolean {
        return window.innerWidth > window.innerHeight;
    }
}

export let browser = new Browser();
