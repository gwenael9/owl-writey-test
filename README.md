# owl-writey-test

### Préparation

Copiez le fichier `.env.example` à la racine du projet et renommez-le en `.env`.
Modifiez les informations à l'intérieur selon vos besoins (email, mot de passe, clé API, etc.).

## Tests de performance avec K6

### Powershell :

```powershell
.\run-k6.ps1
```

### Bash :

```bash
chmod +x run-k6.sh
./run-k6.sh
```

---

## Tests unitaires (api/)

1. Ouvrez un terminal et placez-vous dans le dossier `api` :
   ```bash
   cd api
   ```
2. Lancez les tests unitaires en mode watch :
   ```bash
   npm run test:watch
   ```

---

## Tests end-to-end (e2e/)

1. Ouvrez un terminal et placez-vous dans le dossier `e2e` :
   ```bash
   cd e2e
   ```
2. Avant de lancer les tests, modifiez la variable d'environnement dans votre fichier `.env` :
   - Pour exécuter les tests en mode BDD (Gherkin) :
     ```
     PLAYWRIGHT_USE_BDD="1"
     ```
   - Pour exécuter les tests classiques (fichiers `.spec.ts`) :
     ```
     PLAYWRIGHT_USE_BDD="0"
     ```
3. Lancez l'interface Playwright pour exécuter les tests :
   ```bash
   npm run e2e:open
   ```

> Le choix entre BDD ou non dépend de la variable `PLAYWRIGHT_USE_BDD` dans le `.env`.
> Si `PLAYWRIGHT_USE_BDD="1"`, Playwright utilisera les fichiers `.feature` et les steps associés.
> Sinon, il utilisera les fichiers de test classiques du dossier `tests/`.
