(function () {
    function initMobileBehavior(config) {
        var btnNo = config.btnNo;
        var btnYes = config.btnYes;
        var hint = config.hint;
        var stage = config.stage;
        var setHintText = config.setHintText;
        var utils = window.AppUtils;

        function getMobileLimits() {
            var stageLimits = utils.getStageLimits(stage, btnNo);
            var yesRect = btnYes.getBoundingClientRect();
            var stageRect = stage.getBoundingClientRect();
            var reservedLeft = Math.max(yesRect.right - stageRect.left + 12, stageRect.width * 0.42);

            return {
                minLeft: utils.clamp(reservedLeft, 0, stageLimits.maxLeft),
                maxLeft: stageLimits.maxLeft,
                minTop: 0,
                maxTop: stageLimits.maxTop
            };
        }

        function handleTouchStart(event) {
            event.preventDefault();
            utils.moveButtonWithinRange(btnNo, getMobileLimits());
            setHintText(hint, 'На телефоне кнопка «Нет» убегает от касания 👆');
        }

        btnNo.addEventListener('touchstart', handleTouchStart, { passive: false });
        btnNo.addEventListener('click', function (event) {
            event.preventDefault();
        });
    }

    window.MobileBehavior = {
        initMobileBehavior: initMobileBehavior
    };
})();