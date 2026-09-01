(function () {
  'use strict';

  var STATUTS = { 'en ligne': 'ok', 'brouillon': 'wip', 'archivé': 'old' };

  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  function dateFR(iso) {
    var d = new Date(iso + 'T00:00:00');
    return isNaN(d) ? iso : d.toLocaleDateString('fr-CH', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function carte(p) {
    var a = el('a', 'projet');
    a.href = p.url;

    var haut = el('div', 'projet-haut');
    haut.appendChild(el('h3', null, p.titre || 'Sans titre'));
    if (p.statut) {
      haut.appendChild(el('span', 'badge badge-' + (STATUTS[p.statut] || 'ok'), p.statut));
    }
    a.appendChild(haut);

    if (p.description) a.appendChild(el('p', 'projet-desc', p.description));

    var bas = el('div', 'projet-bas');
    (p.tags || []).forEach(function (t) { bas.appendChild(el('span', 'tag', t)); });
    if (p.date) {
      var d = el('time', 'projet-date', dateFR(p.date));
      d.setAttribute('datetime', p.date);
      bas.appendChild(d);
    }
    a.appendChild(bas);

    a._recherche = [p.titre, p.description, (p.tags || []).join(' ')].join(' ').toLowerCase();
    return a;
  }

  function rendre(projets) {
    var liste = document.getElementById('liste');
    var vide = document.getElementById('vide');
    var champ = document.getElementById('filtre');
    var compteur = document.getElementById('compteur');

    projets.sort(function (a, b) { return (b.date || '').localeCompare(a.date || ''); });

    var cartes = projets.map(carte);
    cartes.forEach(function (c) { liste.appendChild(c); });

    function majCompteur(n) {
      compteur.textContent = n + ' projet' + (n > 1 ? 's' : '');
    }
    majCompteur(cartes.length);

    if (!cartes.length) {
      vide.hidden = false;
      champ.hidden = true;
      return;
    }
    champ.hidden = cartes.length < 4;

    champ.addEventListener('input', function () {
      var q = champ.value.trim().toLowerCase();
      var n = 0;
      cartes.forEach(function (c) {
        var ok = !q || c._recherche.indexOf(q) !== -1;
        c.hidden = !ok;
        if (ok) n++;
      });
      majCompteur(n);
      vide.hidden = n > 0;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch('projects.json', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        rendre(Array.isArray(data) ? data : []);
      })
      .catch(function (e) {
        var err = document.getElementById('erreur');
        err.hidden = false;
        err.textContent = 'Impossible de lire projects.json (' + e.message + ').';
        document.getElementById('filtre').hidden = true;
        document.getElementById('compteur').textContent = '';
      });
  });
})();
