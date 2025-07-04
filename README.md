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

---

3. Configuration des utilisateurs pour les tests end-to-end (e2e)

Avant d'exécuter les tests end-to-end, copiez le fichier `e2e/users.tpl.json` en `e2e/users.json` :

```sh
cp e2e/users.tpl.json e2e/users.json
```

Dans le fichier `users.json`, renseignez les informations de deux utilisateurs valides existant sur le site web (email, nom, mot de passe). Par exemple :

```json
{
  "TOTO": {
    "email": "utilisateur1@exemple.com",
    "name": "Utilisateur 1",
    "password": "motdepasse1"
  },
  "TOTO2": {
    "email": "utilisateur2@exemple.com",
    "name": "Utilisateur 2",
    "password": "motdepasse2"
  }
}
```

4. Lancez l'interface Playwright pour exécuter les tests :
   ```bash
   npm run e2e:open
   ```

> Le choix entre BDD ou non dépend de la variable `PLAYWRIGHT_USE_BDD` dans le `.env`.
> Si `PLAYWRIGHT_USE_BDD="1"`, Playwright utilisera les fichiers `.feature` et les steps associés.
> Sinon, il utilisera les fichiers de test classiques du dossier `tests/`.

Ces utilisateurs doivent être valides et pouvoir se connecter sur le site web pour que les tests fonctionnent correctement.
