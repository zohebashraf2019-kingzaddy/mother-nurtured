// Mother Nurtured — site scripts
(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.tabs a').forEach(function (a) {
      a.addEventListener('click', function () { document.body.classList.remove('menu-open'); });
    });
  }

  // Scroll reveal
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });

  // Looping videos: play only while visible
  var vids = document.querySelectorAll('video[data-loop]');
  vids.forEach(function (v) { v.muted = true; v.loop = true; v.playsInline = true; });
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vo.observe(v); });
  } else {
    vids.forEach(function (v) { v.play(); });
  }

  // Sound toggles (one unmuted at a time)
  document.querySelectorAll('.sound-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.parentElement.querySelector('video');
      var willUnmute = v.muted;
      document.querySelectorAll('video[data-loop]').forEach(function (o) { o.muted = true; });
      document.querySelectorAll('.sound-btn').forEach(function (o) { o.classList.remove('unmuted'); o.setAttribute('aria-label', 'Turn sound on'); });
      if (willUnmute) {
        v.muted = false; v.play();
        b.classList.add('unmuted'); b.setAttribute('aria-label', 'Turn sound off');
      }
    });
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
