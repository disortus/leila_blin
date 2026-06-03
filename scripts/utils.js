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

    function getPositionDistance(firstPosition, secondPosition) {
        var deltaX = firstPosition.left - secondPosition.left;
        var deltaY = firstPosition.top - secondPosition.top;

        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

    function meetsDistanceRequirement(currentPosition, nextPosition, minDistance) {
        if (!currentPosition || !minDistance) {
            return true;
        }

        return getPositionDistance(currentPosition, nextPosition) >= minDistance;
    }

    function getCurrentButtonPosition(button, limits) {
        var stage = button.offsetParent || button.parentElement;
        var buttonRect = button.getBoundingClientRect();
        var stageRect = stage.getBoundingClientRect();

        return {
            left: clamp(buttonRect.left - stageRect.left, limits.minLeft, limits.maxLeft),
            top: clamp(buttonRect.top - stageRect.top, limits.minTop, limits.maxTop)
        };
    }

    function findAvailablePosition(limits, width, height, blockedAreas, currentPosition, minDistance) {
        var rows = 14;
        var columns = 14;
        var rowIndex;
        var columnIndex;

        for (rowIndex = 0; rowIndex <= rows; rowIndex += 1) {
            var top = limits.minTop + ((limits.maxTop - limits.minTop) * rowIndex / rows);

            for (columnIndex = 0; columnIndex <= columns; columnIndex += 1) {
                var left = limits.minLeft + ((limits.maxLeft - limits.minLeft) * columnIndex / columns);
                var candidateRect = createRect(left, top, width, height);
                var candidatePosition = {
                    left: left,
                    top: top
                };
                var isBlocked = blockedAreas.some(function (blockedArea) {
                    return rectanglesOverlap(candidateRect, blockedArea);
                });

                if (!isBlocked && meetsDistanceRequirement(currentPosition, candidatePosition, minDistance)) {
                    return candidatePosition;
                }
            }
        }

        return null;
    }

    function moveButtonAvoidingAreas(button, limits, blockedAreas, options) {
        var areas = blockedAreas || [];
        var config = options || {};
        var minDistance = config.minDistance || 0;
        var width = button.offsetWidth;
        var height = button.offsetHeight;
        var attemptCount = 48;
        var attemptIndex;
        var currentPosition = getCurrentButtonPosition(button, limits);

        for (attemptIndex = 0; attemptIndex < attemptCount; attemptIndex += 1) {
            var left = randomBetween(limits.minLeft, limits.maxLeft);
            var top = randomBetween(limits.minTop, limits.maxTop);
            var candidateRect = createRect(left, top, width, height);
            var candidatePosition = {
                left: left,
                top: top
            };
            var intersectsBlockedArea = areas.some(function (blockedArea) {
                return rectanglesOverlap(candidateRect, blockedArea);
            });

            if (!intersectsBlockedArea && meetsDistanceRequirement(currentPosition, candidatePosition, minDistance)) {
                positionButton(button, left, top);
                return true;
            }
        }

        var fallbackPosition = findAvailablePosition(limits, width, height, areas, currentPosition, minDistance);

        if (!fallbackPosition && minDistance > 0) {
            fallbackPosition = findAvailablePosition(limits, width, height, areas, null, 0);
        }

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