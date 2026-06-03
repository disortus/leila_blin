(function () {
    function initDesktopBehavior(config) {
        var btnNo = config.btnNo;
        var btnYes = config.btnYes;
        var stage = config.stage;
        var utils = window.AppUtils;

        function getBlockedAreas() {
            var yesRect = btnYes.getBoundingClientRect();
            var stageRect = stage.getBoundingClientRect();
            var safeOffset = 16;

            return [{
                left: utils.clamp(yesRect.left - stageRect.left - safeOffset, 0, stageRect.width),
                top: utils.clamp(yesRect.top - stageRect.top - safeOffset, 0, stageRect.height),
                right: utils.clamp(yesRect.right - stageRect.left + safeOffset, 0, stageRect.width),
                bottom: utils.clamp(yesRect.bottom - stageRect.top + safeOffset, 0, stageRect.height)
            }];
        }

        function handleEscape() {
            utils.moveButtonAvoidingAreas(btnNo, utils.getStageLimits(stage, btnNo), getBlockedAreas());
        }

        btnNo.addEventListener('mouseenter', handleEscape);
        btnNo.addEventListener('focus', handleEscape);
    }

    window.DesktopBehavior = {
        initDesktopBehavior: initDesktopBehavior
    };
})();