(function () {
    function initDesktopBehavior(config) {
        var btnNo = config.btnNo;
        var stage = config.stage;
        var utils = window.AppUtils;

        function handleEscape() {
            utils.moveButtonWithinRange(btnNo, utils.getStageLimits(stage, btnNo));
        }

        btnNo.addEventListener('mouseenter', handleEscape);
        btnNo.addEventListener('focus', handleEscape);
    }

    window.DesktopBehavior = {
        initDesktopBehavior: initDesktopBehavior
    };
})();