(function () {
    function getUiElements() {
        return {
            card: document.querySelector('.card'),
            question: document.getElementById('question'),
            hint: document.getElementById('interactionHint'),
            stage: document.getElementById('buttonStage'),
            btnYes: document.getElementById('btnYes'),
            btnNo: document.getElementById('btnNo')
        };
    }

    function setSuccessState(ui) {
        ui.card.classList.add('is-success');
        ui.question.textContent = 'Я так и знал, я нравлюсь тебе ❤️❤️❤️';
    }

    function setHintText(hint, text) {
        hint.textContent = text;
    }

    window.AppDom = {
        getUiElements: getUiElements,
        setHintText: setHintText,
        setSuccessState: setSuccessState
    };
})();