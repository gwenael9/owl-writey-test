# owl-writey-test

### Initialisation du projet

Réalisez un `npm install` dans les dossiers `api` et `e2e`.

## Tests de performance avec K6

### Préparation

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
EMAIL=votre@email.com
PASSWORD=mot_de_passe
API_KEY=cle_api_firebase
```

### Utilisez le script suivant pour exécuter le test avec vos variables .env :

```powershell
.\run-k6.ps1
```