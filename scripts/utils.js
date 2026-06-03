(function () {
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function positionButton(button, left, top) {
        button.style.left = left + 'px';
        button.style.top = top + 'px';
        button.style.bottom = 'auto';
    }

    function moveButtonWithinRange(button, limits) {
        const nextLeft = randomBetween(limits.minLeft, limits.maxLeft);
        const nextTop = randomBetween(limits.minTop, limits.maxTop);

        positionButton(button, nextLeft, nextTop);
    }

    function getStageLimits(stage, button) {
        const stageRect = stage.getBoundingClientRect();

        return {
            minLeft: 0,
            maxLeft: Math.max(0, stageRect.width - button.offsetWidth),
            minTop: 0,
            maxTop: Math.max(0, stageRect.height - button.offsetHeight)
        };
    }

    window.AppUtils = {
        clamp: clamp,
        getStageLimits: getStageLimits,
        moveButtonWithinRange: moveButtonWithinRange,
        positionButton: positionButton,
        randomBetween: randomBetween
    };
})();