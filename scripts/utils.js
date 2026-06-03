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

    function createRect(left, top, width, height) {
        return {
            left: left,
            top: top,
            right: left + width,
            bottom: top + height
        };
    }

    function rectanglesOverlap(firstRect, secondRect) {
        return !(
            firstRect.right <= secondRect.left ||
            firstRect.left >= secondRect.right ||
            firstRect.bottom <= secondRect.top ||
            firstRect.top >= secondRect.bottom
        );
    }

    function findAvailablePosition(limits, width, height, blockedAreas) {
        var rows = 14;
        var columns = 14;
        var rowIndex;
        var columnIndex;

        for (rowIndex = 0; rowIndex <= rows; rowIndex += 1) {
            var top = limits.minTop + ((limits.maxTop - limits.minTop) * rowIndex / rows);

            for (columnIndex = 0; columnIndex <= columns; columnIndex += 1) {
                var left = limits.minLeft + ((limits.maxLeft - limits.minLeft) * columnIndex / columns);
                var candidateRect = createRect(left, top, width, height);
                var isBlocked = blockedAreas.some(function (blockedArea) {
                    return rectanglesOverlap(candidateRect, blockedArea);
                });

                if (!isBlocked) {
                    return {
                        left: left,
                        top: top
                    };
                }
            }
        }

        return null;
    }

    function moveButtonAvoidingAreas(button, limits, blockedAreas) {
        var areas = blockedAreas || [];
        var width = button.offsetWidth;
        var height = button.offsetHeight;
        var attemptCount = 48;
        var attemptIndex;

        for (attemptIndex = 0; attemptIndex < attemptCount; attemptIndex += 1) {
            var left = randomBetween(limits.minLeft, limits.maxLeft);
            var top = randomBetween(limits.minTop, limits.maxTop);
            var candidateRect = createRect(left, top, width, height);
            var intersectsBlockedArea = areas.some(function (blockedArea) {
                return rectanglesOverlap(candidateRect, blockedArea);
            });

            if (!intersectsBlockedArea) {
                positionButton(button, left, top);
                return true;
            }
        }

        var fallbackPosition = findAvailablePosition(limits, width, height, areas);

        if (fallbackPosition) {
            positionButton(button, fallbackPosition.left, fallbackPosition.top);
            return true;
        }

        moveButtonWithinRange(button, limits);
        return false;
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
        moveButtonAvoidingAreas: moveButtonAvoidingAreas,
        moveButtonWithinRange: moveButtonWithinRange,
        positionButton: positionButton,
        randomBetween: randomBetween
    };
})();