(function () {
    function initDesktopBehavior(config) {
        var btnNo = config.btnNo;
        var hint = config.hint;
        var stage = config.stage;
        var setHintText = config.setHintText;
        var utils = window.AppUtils;

        function handleEscape() {
            utils.moveButtonWithinRange(btnNo, utils.getStageLimits(stage, btnNo));
            setHintText(hint, 'На компьютере кнопка «Нет» убегает от курсора 😄');
        }

        btnNo.addEventListener('mouseenter', handleEscape);
        btnNo.addEventListener('focus', handleEscape);
    }

    window.DesktopBehavior = {
        initDesktopBehavior: initDesktopBehavior
    };
})();