document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.reflection-answer-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.reflection-item');
      const shown = item.classList.toggle('answer-revealed');
      button.setAttribute('aria-expanded', String(shown));
      button.querySelector('.reflection-answer-hint').textContent = shown ? 'Click to blur' : 'Click to reveal';
    });
  });
});
