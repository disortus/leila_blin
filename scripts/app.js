(function () {
    var dom = window.AppDom;
    var desktopBehavior = window.DesktopBehavior;
    var mobileBehavior = window.MobileBehavior;

    if (!dom || !desktopBehavior || !mobileBehavior) {
        return;
    }

    var ui = dom.getUiElements();

    if (!ui.card || !ui.question || !ui.hint || !ui.stage || !ui.btnYes || !ui.btnNo) {
        return;
    }

    var isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var isMobile = window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth <= 768;

    function setInitialHint() {
        if (isDesktop) {
            dom.setHintText(ui.hint, 'Наведи курсор на кнопку «Нет» 😄');
            return;
        }

        dom.setHintText(ui.hint, 'Попробуй нажать на кнопку «Нет» на телефоне 👆');
    }

    function initCommonBehavior() {
        ui.btnYes.addEventListener('click', function () {
            dom.setSuccessState(ui);
        });
    }

    function initPlatformBehavior() {
        if (isDesktop) {
            desktopBehavior.initDesktopBehavior({
                btnNo: ui.btnNo,
                hint: ui.hint,
                stage: ui.stage,
                setHintText: dom.setHintText
            });
        }

        if (isMobile) {
            mobileBehavior.initMobileBehavior({
                btnNo: ui.btnNo,
                btnYes: ui.btnYes,
                hint: ui.hint,
                stage: ui.stage,
                setHintText: dom.setHintText
            });
        }
    }

    setInitialHint();
    initCommonBehavior();
    initPlatformBehavior();
})();