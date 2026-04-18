
class Platform {

    isAndroid() {
        return browser.capabilities.platformName === 'Android';
    }

    isIOS() {
        return browser.capabilities.platformName === 'iOS';
    }

    isMobile() {
        return this.isAndroid() || this.isIOS();
    }

}

export default new Platform();