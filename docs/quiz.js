/**
 * Shared session quiz logic + explanation modal.
 * Sessions 11+: modal shows the explanation inline ("Read this").
 * Sessions 01–10: funny reminder to scroll to the explanation below.
 */
(function () {
  'use strict';

  var REMINDER_MESSAGES = [
    {
      title: 'Hold up, speedrunner!',
      text: 'You answered — cool. But the explanation below is where the actual learning lives. Your friend skips it. Don\'t be your friend.',
      sub: 'Seriously. Read the gray box. We\'ll wait.',
      emoji: '🏃💨',
      btn: 'Fine, I\'ll read it'
    },
    {
      title: 'The explanation is not decoration',
      text: 'That little gray box under your answer? It\'s not IKEA filler. It\'s the "ohhh, THAT\'S why" moment.',
      sub: 'Scroll down. Absorb. Become wise.',
      emoji: '📦❌',
      btn: 'Ok ok, reading…'
    },
    {
      title: 'Quiz goblin says: READ IT',
      text: 'You picked an answer. The green/red told you if you\'re right. The explanation tells you WHY. One of these matters more for your brain.',
      sub: 'Hint: it\'s not the color.',
      emoji: '👺',
      btn: 'I submit to the goblin'
    },
    {
      title: 'Friendly intervention',
      text: 'This modal exists because someone keeps clicking answers and sprinting past the explanation like it owes them money.',
      sub: 'Take 15 seconds. Read it. Future you sends thanks.',
      emoji: '🚨',
      btn: 'I\'m not that person (reading now)'
    },
    {
      title: 'Plot twist!',
      text: 'The quiz isn\'t over when you click. It\'s over when you understand the explanation. That\'s the real boss fight.',
      sub: 'Defeat the boss. Read the text.',
      emoji: '🎮',
      btn: 'Engage boss (read explanation)'
    },
    {
      title: 'Certificate of Almost Learning',
      text: 'You are hereby awarded one (1) answer click. To upgrade to Actual Learning™, please read the explanation below.',
      sub: 'No cheat codes. Just reading.',
      emoji: '📜',
      btn: 'Claim my upgrade'
    }
  ];

  var READ_THIS_INTROS = [
    { title: 'Read this', sub: 'This is the part your friend skips. Don\'t be your friend.', emoji: '📖', btn: 'Got it' },
    { title: 'Read this — seriously', sub: 'Right or wrong, the why matters more than the click.', emoji: '👀', btn: 'Ok, I read it' },
    { title: 'Read this before you sprint away', sub: 'The explanation is the lesson. The option was just the quiz.', emoji: '🛑', btn: 'Understood' },
    { title: 'Read this (boss fight)', sub: 'Defeat ignorance. Read the explanation in the box.', emoji: '🎮', btn: 'Next question' }
  ];

  var modalBuilt = false;
  var overlay;
  var titleEl;
  var textEl;
  var subEl;
  var emojiEl;
  var explainEl;
  var btnEl;
  var msgIndex = 0;

  function getSessionNumber() {
    var m = window.location.pathname.match(/session-(\d{2})/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function useInlineExplanationModal() {
    return getSessionNumber() >= 11;
  }

  function buildModal() {
    if (modalBuilt) return;
    modalBuilt = true;

    overlay = document.createElement('div');
    overlay.className = 'quiz-explain-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'alertdialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'quiz-explain-title');

    overlay.innerHTML =
      '<div class="quiz-explain-modal">' +
      '  <div class="quiz-explain-emoji" id="quiz-explain-emoji"></div>' +
      '  <div class="quiz-explain-body">' +
      '    <h3 id="quiz-explain-title" class="quiz-explain-title"></h3>' +
      '    <p class="quiz-explain-text" id="quiz-explain-text"></p>' +
      '    <div class="quiz-explain-explanation" id="quiz-explain-explanation" hidden></div>' +
      '    <p class="quiz-explain-sub" id="quiz-explain-sub"></p>' +
      '  </div>' +
      '  <div class="quiz-explain-actions">' +
      '    <button type="button" class="quiz-explain-btn" id="quiz-explain-btn">Got it</button>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(overlay);

    titleEl = document.getElementById('quiz-explain-title');
    textEl = document.getElementById('quiz-explain-text');
    subEl = document.getElementById('quiz-explain-sub');
    emojiEl = document.getElementById('quiz-explain-emoji');
    explainEl = document.getElementById('quiz-explain-explanation');
    btnEl = document.getElementById('quiz-explain-btn');

    btnEl.addEventListener('click', closeExplainModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeExplainModal();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.hidden && e.key === 'Escape') {
        e.preventDefault();
        closeExplainModal();
      }
    });
  }

  function showExplainModal(explanationText) {
    buildModal();
    var inlineMode = useInlineExplanationModal() && explanationText;

    if (inlineMode) {
      var intro = READ_THIS_INTROS[msgIndex % READ_THIS_INTROS.length];
      msgIndex += 1;

      emojiEl.textContent = intro.emoji;
      titleEl.textContent = intro.title;
      textEl.textContent = '';
      textEl.hidden = true;
      explainEl.textContent = explanationText;
      explainEl.hidden = false;
      subEl.textContent = intro.sub;
      btnEl.textContent = intro.btn;
    } else {
      var msg = REMINDER_MESSAGES[msgIndex % REMINDER_MESSAGES.length];
      msgIndex += 1;

      emojiEl.textContent = msg.emoji;
      titleEl.textContent = msg.title;
      textEl.textContent = msg.text;
      textEl.hidden = false;
      explainEl.textContent = '';
      explainEl.hidden = true;
      subEl.textContent = msg.sub;
      btnEl.textContent = msg.btn;
    }

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    btnEl.focus();
  }

  function closeExplainModal() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
  }

  function setupQuiz(prefix) {
    var container = document.getElementById(prefix + '-quiz');
    if (!container) return;

    var questions = container.querySelectorAll('.quiz-question');
    var btn = container.querySelector('.submit-btn');
    var answeredCount = 0;
    var correct = 0;

    var passPre = container.dataset.passPre || 'You may proceed to the lab.';
    var passPost = container.dataset.passPost || 'Session complete. Make your commit.';
    var failPre = container.dataset.failPre || 'Read the concept section carefully, then retake.';
    var failPost = container.dataset.failPost || 'Re-read the concept section and redo the lab before committing.';

    questions.forEach(function (q) {
      q.querySelectorAll('.quiz-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (q.dataset.answered) return;
          q.dataset.answered = 'true';
          answeredCount += 1;
          var answer = q.dataset.answer;

          q.querySelectorAll('.quiz-option').forEach(function (o) {
            o.style.pointerEvents = 'none';
            if (o.dataset.val === answer) o.classList.add('correct');
          });

          if (opt.dataset.val === answer) correct += 1;
          else opt.classList.add('wrong');

          var explanation = q.querySelector('.explanation');
          if (explanation) explanation.style.display = 'block';

          showExplainModal(explanation ? explanation.textContent.trim() : '');

          if (answeredCount === questions.length) btn.disabled = false;
        });
      });
    });

    btn.addEventListener('click', function () {
      var result = document.getElementById(prefix + '-result');
      var pct = Math.round((correct / questions.length) * 100);
      result.style.display = 'block';
      btn.disabled = true;

      if (correct >= 4) {
        result.className = 'quiz-result pass';
        result.innerHTML = correct + '/5 correct (' + pct + '%) — Passed. ' +
          (prefix === 'pre' ? passPre : passPost);
      } else {
        result.className = 'quiz-result fail';
        result.innerHTML = correct + '/5 correct (' + pct + '%) — Below 80%. ' +
          (prefix === 'pre' ? failPre : failPost);
      }
    });
  }

  window.setupQuiz = setupQuiz;
})();
