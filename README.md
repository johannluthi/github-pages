# Projets publiés sur GitHub Pages

En ligne : <https://johannluthi.github.io/github-pages/>

La page d'accueil est un **index de projets** généré depuis `projects.json`.

## Ajouter un projet

1. Créer un dossier avec un `index.html` :

   ```bash
   mkdir mon-projet && $EDITOR mon-projet/index.html
   ```

2. Ajouter une entrée dans `projects.json` :

   ```json
   {
     "titre": "Mon projet",
     "url": "mon-projet/",
     "description": "En une phrase.",
     "tags": ["HTML", "SVG"],
     "date": "2026-09-01",
     "statut": "en ligne"
   }
   ```

   `statut` : `en ligne`, `brouillon` ou `archivé`. Tri par `date` décroissante.
   Le champ de filtre apparaît à partir de 4 projets.

3. Publier :

   ```bash
   git add -A && git commit -m "ajout mon-projet" && git push
   ```

   Mise en ligne en ~1 minute.

## Structure

| Chemin | Rôle |
|---|---|
| `index.html` | l'index des projets |
| `projects.json` | la liste — **le seul fichier à éditer** pour ajouter un projet |
| `hub.js` | rendu et filtrage de la liste |
| `style.css` | styles partagés par l'index et les pages projet |
| `404.html` | page d'erreur |
| `demo/` | page de test des formats servis |

## Notes

- `.nojekyll` désactive Jekyll : les fichiers et dossiers commençant par `_` sont servis tels quels.
- Site de **projet** : la racine des URLs est `/github-pages/`, pas `/`.
  Dans `404.html` les chemins doivent donc être absolus **avec** ce préfixe ; ailleurs, préférer le relatif.
- Dépôt public : aucune clé d'API ni donnée personnelle.
- Limites du gratuit : dépôt < 1 Go, fichier < 100 Mo, ~100 Go de trafic par mois.
