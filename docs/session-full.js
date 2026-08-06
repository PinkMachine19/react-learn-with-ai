document.addEventListener('DOMContentLoaded', function () {
  setupQuiz('pre');
  setupQuiz('post');

  document.querySelectorAll('.concept-explanation-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      const card = button.closest('.concept-card');
      const shown = card.classList.toggle('explanation-revealed');
      button.setAttribute('aria-expanded', String(shown));
      button.querySelector('.concept-explanation-hint').textContent = shown ? 'Click to hide' : 'Click to reveal';
    });
  });
});
