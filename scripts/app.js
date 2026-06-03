(function () {
    var dom = window.AppDom;
    var desktopBehavior = window.DesktopBehavior;
    var mobileBehavior = window.MobileBehavior;

    if (!dom || !desktopBehavior || !mobileBehavior) {
        return;
    }

    var ui = dom.getUiElements();

    if (!ui.card || !ui.question || !ui.stage || !ui.btnYes || !ui.btnNo) {
        return;
    }

    var isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var isMobile = window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth <= 768;

    function initCommonBehavior() {
        ui.btnYes.addEventListener('click', function () {
            dom.setSuccessState(ui);
        });
    }

    function initPlatformBehavior() {
        if (isDesktop) {
            desktopBehavior.initDesktopBehavior({
                btnNo: ui.btnNo,
                stage: ui.stage
            });
        }

        if (isMobile) {
            mobileBehavior.initMobileBehavior({
                btnNo: ui.btnNo,
                btnYes: ui.btnYes,
                stage: ui.stage
            });
        }
    }

    initCommonBehavior();
    initPlatformBehavior();
})();