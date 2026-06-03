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

        function getMinimumMoveDistance() {
            var stageRect = stage.getBoundingClientRect();
            var maxDimension = Math.max(stageRect.width, stageRect.height);

            return Math.max(120, Math.min(maxDimension * 0.35, 180));
        }

        function handleTouchStart(event) {
            event.preventDefault();
            utils.moveButtonAvoidingAreas(btnNo, getMobileLimits(), getBlockedAreas(), {
                minDistance: getMinimumMoveDistance()
            });
        }

        btnNo.addEventListener('touchstart', handleTouchStart, { passive: false });
        btnNo.addEventListener('click', function (event) {
            event.preventDefault();
            utils.moveButtonAvoidingAreas(btnNo, getMobileLimits(), getBlockedAreas(), {
                minDistance: getMinimumMoveDistance()
            });
        });
    }

    window.MobileBehavior = {
        initMobileBehavior: initMobileBehavior
    };
})();