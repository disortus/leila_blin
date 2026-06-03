(function () {
    function initMobileBehavior(config) {
        var btnNo = config.btnNo;
        var btnYes = config.btnYes;
        var stage = config.stage;
        var utils = window.AppUtils;

        function getMobileLimits() {
            return utils.getStageLimits(stage, btnNo);
        }

        function getBlockedAreas() {
            var stageLimits = utils.getStageLimits(stage, btnNo);
            var yesRect = btnYes.getBoundingClientRect();
            var stageRect = stage.getBoundingClientRect();
            var safeOffset = 12;

            return [{
                left: utils.clamp(yesRect.left - stageRect.left - safeOffset, 0, stageRect.width),
                top: utils.clamp(yesRect.top - stageRect.top - safeOffset, 0, stageRect.height),
                right: utils.clamp(yesRect.right - stageRect.left + safeOffset, 0, stageRect.width),
                bottom: utils.clamp(yesRect.bottom - stageRect.top + safeOffset, 0, stageRect.height)
            }];
        }

        function handleTouchStart(event) {
            event.preventDefault();
            utils.moveButtonAvoidingAreas(btnNo, getMobileLimits(), getBlockedAreas());
        }

        btnNo.addEventListener('touchstart', handleTouchStart, { passive: false });
        btnNo.addEventListener('click', function (event) {
            event.preventDefault();
            utils.moveButtonAvoidingAreas(btnNo, getMobileLimits(), getBlockedAreas());
        });
    }

    window.MobileBehavior = {
        initMobileBehavior: initMobileBehavior
    };
})();