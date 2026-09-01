# Contenus statiques publiés sur GitHub Pages

Dépôt de publication : tout fichier déposé ici devient accessible en ligne.

## Publier une modification

```bash
cd ~/Documents/sites/github-pages
git add -A && git commit -m "maj" && git push
```

La mise en ligne prend environ une minute.

## Notes

- `.nojekyll` désactive Jekyll : les fichiers et dossiers commençant par `_` sont servis tels quels.
- `404.html` est la page d'erreur du site.
- Limites du gratuit : dépôt < 1 Go, fichier < 100 Mo, ~100 Go de trafic par mois.
