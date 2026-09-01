document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('ping');
  var out = document.getElementById('out');
  var n = 0;
  btn.addEventListener('click', function () {
    n++;
    out.textContent = 'JavaScript actif — ' + n + ' clic' + (n > 1 ? 's' : '') +
      ' · ' + new Date().toLocaleTimeString('fr-CH');
  });

  // Vérifie que le .txt est bien servi par GitHub Pages
  fetch('notes.txt', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
    .then(function (t) { document.getElementById('txt').textContent = t.trim(); })
    .catch(function (e) { document.getElementById('txt').textContent = 'échec du chargement (' + e + ')'; });
});
