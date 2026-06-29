/**
 * Floating lesson notes — page-specific, localStorage, auto-save.
 * Include on session pages only; auto-detects lesson from URL.
 */
(function () {
  'use strict';

  var COURSE_ID = 'react-learn-with-ai';
  var STORAGE_PREFIX = 'tutorial_notes:';
  var DEBOUNCE_MS = 500;

  function detectLessonId() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var sessionMatch = path.match(/\/sessions\/(session-\d{2})\//i);
    if (sessionMatch) return sessionMatch[1].toLowerCase();
    return null;
  }

  function storageKey(courseId, lessonId) {
    return STORAGE_PREFIX + courseId + ':' + lessonId;
  }

  function loadNotes(key) {
    try {
      return localStorage.getItem(key) || '';
    } catch (e) {
      return '';
    }
  }

  function saveNotes(key, text) {
    try {
      if (text) {
        localStorage.setItem(key, text);
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      /* quota or private mode — fail silently */
    }
  }

  function getLessonContent() {
    var main = document.querySelector('main .container');
    if (!main) return '';
    return main.innerText.replace(/\n{3,}/g, '\n\n').trim();
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(ta);
    }
    return Promise.resolve();
  }

  function buildStandardCopy(notes, includeLesson) {
    if (!includeLesson) return notes;

    var lesson = getLessonContent();
    return '=== LESSON ===\n\n' + lesson + '\n\n=== MY NOTES ===\n\n' + notes;
  }

  function buildAiCopy(notes, includeLesson) {
    if (!includeLesson) {
      return (
        'I am studying this topic.\n\n' +
        'Here are my notes:\n\n' +
        notes +
        '\n\nPlease help answer my questions, explain what I misunderstand, and help me learn this topic better.'
      );
    }

    var lesson = getLessonContent();
    return (
      'I am studying this lesson.\n\n' +
      'Here is the lesson/tutorial content:\n\n' +
      lesson +
      '\n\nHere are my notes:\n\n' +
      notes +
      '\n\nPlease:\n\n' +
      '1. Explain difficult concepts simply\n' +
      '2. Identify misunderstandings in my notes\n' +
      '3. Answer my questions\n' +
      '4. Quiz me on the topic\n' +
      '5. Help reinforce understanding'
    );
  }

  function init(lessonId) {
    var key = storageKey(COURSE_ID, lessonId);
    var notesText = loadNotes(key);
    var saveTimer = null;
    var toastTimer = null;

    var fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'notes-fab';
    fab.setAttribute('aria-label', 'Open notes for this lesson');
    fab.innerHTML =
      '<span class="notes-fab-icon" aria-hidden="true">📝</span>' +
      '<span class="notes-fab-indicator" hidden aria-hidden="true"><span class="notes-fab-dot">•</span></span>' +
      '<span class="notes-fab-label">Notes</span>';

    var overlay = document.createElement('div');
    overlay.className = 'notes-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'notes-modal-title');

    overlay.innerHTML =
      '<div class="notes-modal">' +
      '  <div class="notes-modal-header">' +
      '    <h2 id="notes-modal-title" class="notes-modal-title">Notes for This Lesson</h2>' +
      '    <button type="button" class="notes-modal-close" aria-label="Close notes">&times;</button>' +
      '  </div>' +
      '  <div class="notes-modal-body">' +
      '    <textarea class="notes-textarea" placeholder="Type your notes here…" spellcheck="true"></textarea>' +
      '    <label class="notes-checkbox-row">' +
      '      <input type="checkbox" class="notes-include-lesson" />' +
      '      <span>Include lesson/tutorial text</span>' +
      '    </label>' +
      '  </div>' +
      '  <div class="notes-modal-actions">' +
      '    <button type="button" class="notes-btn notes-btn-copy">Copy</button>' +
      '    <button type="button" class="notes-btn notes-btn-primary notes-btn-copy-ai">Copy For AI</button>' +
      '  </div>' +
      '</div>';

    var toast = document.createElement('div');
    toast.className = 'notes-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
    document.body.appendChild(toast);

    var textarea = overlay.querySelector('.notes-textarea');
    var includeLesson = overlay.querySelector('.notes-include-lesson');
    var closeBtn = overlay.querySelector('.notes-modal-close');
    var copyBtn = overlay.querySelector('.notes-btn-copy');
    var copyAiBtn = overlay.querySelector('.notes-btn-copy-ai');
    var indicator = fab.querySelector('.notes-fab-indicator');

    function updateFabIndicator() {
      var has = textarea.value.trim().length > 0;
      fab.classList.toggle('has-notes', has);
      indicator.hidden = !has;
    }

    function scheduleSave() {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(function () {
        saveNotes(key, textarea.value);
        updateFabIndicator();
      }, DEBOUNCE_MS);
    }

    function focusTextareaTop() {
      textarea.focus();
      textarea.setSelectionRange(0, 0);
      textarea.scrollTop = 0;
    }

    function openModal() {
      textarea.value = loadNotes(key);
      updateFabIndicator();
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(focusTextareaTop);
    }

    function closeModal() {
      if (saveTimer) {
        clearTimeout(saveTimer);
        saveTimer = null;
        saveNotes(key, textarea.value);
        updateFabIndicator();
      }
      overlay.hidden = true;
      document.body.style.overflow = '';
      fab.focus();
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('visible');
      }, 2000);
    }

    textarea.value = notesText;
    updateFabIndicator();

    fab.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.hidden && e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    });

    textarea.addEventListener('input', scheduleSave);

    copyBtn.addEventListener('click', function () {
      var text = buildStandardCopy(textarea.value, includeLesson.checked);
      copyToClipboard(text).then(function () {
        showToast('Copied to clipboard');
      });
    });

    copyAiBtn.addEventListener('click', function () {
      var text = buildAiCopy(textarea.value, includeLesson.checked);
      copyToClipboard(text).then(function () {
        showToast('AI prompt copied');
      });
    });
  }

  var lessonId = detectLessonId();
  if (lessonId) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        init(lessonId);
      });
    } else {
      init(lessonId);
    }
  }
})();
