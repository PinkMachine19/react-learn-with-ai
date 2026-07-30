/**
 * Single lesson bookmark — click a paragraph to save, FAB to return.
 * Stored in localStorage (GitHub Pages — no backend).
 */
(function () {
  'use strict';

  var COURSE_ID = 'react-learn-with-ai';
  var STORAGE_KEY = 'tutorial_bookmark:' + COURSE_ID;
  var SELECTOR =
    'main .container p, main .container li, main .container h2, main .container h3, main .container h4';

  function detectLessonId() {
    var path = window.location.pathname.replace(/\\/g, '/');
    var sessionMatch = path.match(/\/sessions\/(session-\d{2})\//i);
    if (sessionMatch) return sessionMatch[1].toLowerCase();
    return null;
  }

  function loadBookmark() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveBookmark(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* quota or private mode */
    }
  }

  function clearBookmark() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  function excerptFrom(el) {
    var text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    if (text.length <= 72) return text;
    return text.slice(0, 72) + '…';
  }

  function assignBlockIds(lessonId) {
    var nodes = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < nodes.length; i++) {
      if (!nodes[i].dataset.bmId) {
        nodes[i].dataset.bmId = 'bm-' + lessonId + '-' + i;
      }
      nodes[i].classList.add('bookmark-target');
    }
    return nodes;
  }

  function markBookmarked(blockId) {
    document.querySelectorAll('.is-bookmarked').forEach(function (el) {
      el.classList.remove('is-bookmarked');
    });
    if (!blockId) return;
    var el = document.querySelector('[data-bm-id="' + blockId + '"]');
    if (el) el.classList.add('is-bookmarked');
  }

  function scrollToBlock(blockId) {
    var el = document.querySelector('[data-bm-id="' + blockId + '"]');
    if (!el) return false;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('bookmark-flash');
    setTimeout(function () {
      el.classList.remove('bookmark-flash');
    }, 1600);
    markBookmarked(blockId);
    return true;
  }

  function init(lessonId) {
    assignBlockIds(lessonId);

    var fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'bookmark-fab';
    fab.setAttribute('aria-label', 'Go to saved bookmark');
    fab.innerHTML =
      '<span class="bookmark-fab-icon" aria-hidden="true">🔖</span>' +
      '<span class="bookmark-fab-label">Bookmark</span>';

    var toast = document.createElement('div');
    toast.className = 'bookmark-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    document.body.appendChild(fab);
    document.body.appendChild(toast);

    var toastTimer = null;

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('visible');
      }, 2400);
    }

    function updateFab() {
      var bm = loadBookmark();
      fab.classList.toggle('has-bookmark', !!bm);
      fab.title = bm
        ? 'Go to bookmark: ' + bm.excerpt
        : 'No bookmark yet — click any paragraph to save one';
    }

    function setBookmarkFromElement(el) {
      var blockId = el.dataset.bmId;
      if (!blockId) return;

      var data = {
        pathname: window.location.pathname,
        blockId: blockId,
        lessonId: lessonId,
        excerpt: excerptFrom(el),
        savedAt: Date.now()
      };

      saveBookmark(data);
      markBookmarked(blockId);
      updateFab();
      showToast('Bookmark saved — only one at a time');
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('.bookmark-fab, .notes-fab, .notes-overlay, .quiz-explain-overlay')) {
        return;
      }
      if (e.target.closest('a, button, input, textarea, label, select, .quiz-option')) {
        return;
      }

      var block = e.target.closest(SELECTOR);
      if (!block || !block.dataset.bmId) return;

      e.preventDefault();
      setBookmarkFromElement(block);
    });

    fab.addEventListener('click', function () {
      var bm = loadBookmark();
      if (!bm) {
        showToast('No bookmark — click a paragraph to save');
        return;
      }

      if (window.location.pathname === bm.pathname) {
        if (scrollToBlock(bm.blockId)) return;
        showToast('Bookmark text not found on this page');
        return;
      }

      window.location.href = bm.pathname + '#' + bm.blockId;
    });

    fab.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      if (!loadBookmark()) return;
      clearBookmark();
      markBookmarked(null);
      updateFab();
      showToast('Bookmark cleared');
    });

    var bm = loadBookmark();
    if (bm && bm.pathname === window.location.pathname) {
      markBookmarked(bm.blockId);
    }

    var hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.indexOf('bm-') === 0) {
      requestAnimationFrame(function () {
        scrollToBlock(hash);
      });
    }

    updateFab();
  }

  var lessonId = detectLessonId();
  if (!lessonId) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init(lessonId);
    });
  } else {
    init(lessonId);
  }
})();
