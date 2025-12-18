# Projet MyPizza API

Bienvenue sur la documentation de l'API MyPizza. Ce projet est une application backend développée avec Node.js et Express, conçue pour gérer une base de données de pizzas et d'ingrédients.

## Table des matières

- [Description](#description)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Routes de l'API](#routes-de-lapi)

---

## Description

MyPizza API fournit une interface RESTful pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur des pizzas et des ingrédients. Elle est construite sur une base Node.js et utilise un serveur Express pour gérer les requêtes HTTP, et une base de données MySQL pour la persistance des données.

**Technologies utilisées :**
- **Node.js**: Environnement d'exécution JavaScript.
- **Express.js**: Framework web pour Node.js.
- **MySQL2**: Client MySQL pour Node.js.
- **Express-Validator**: Middleware pour la validation des données des requêtes.

---

## Installation

Suivez ces étapes pour mettre en place et lancer le projet en local.

**1. Prérequis**
- [Node.js](https://nodejs.org/) (version 14 ou supérieure recommandée)
- Un serveur de base de données [MySQL](https://www.mysql.com/downloads/) fonctionnel.

**2. Cloner le dépôt**
```bash
git clone <URL_DU_DEPOT>
cd mypizza
```

**3. Installer les dépendances**
Installez toutes les dépendances du projet listées dans `package.json`.
```bash
npm install
```

**4. Configurer la base de données**
- Assurez-vous que votre serveur MySQL est en cours d'exécution.
- Importez le schéma et les données initiales en utilisant le fichier `config/pizzayolo.sql`. Vous pouvez utiliser un outil comme MySQL Workbench ou la ligne de commande :
- **Important**: Le projet utilise les identifiants `root` / `root` pour se connecter à la base de données `pizzayolo` sur `localhost`. Si vos identifiants sont différents, mettez à jour le fichier `config/database.js`.

**5. Démarrer le serveur**
Une fois l'installation terminée, lancez le serveur :
```bash
npm start
```
Le serveur devrait être accessible à l'adresse `http://localhost:3000`.

---

## Structure du Projet

Voici un aperçu de l'organisation des fichiers et dossiers du projet.

```
mypizza/
├── app.js                 # Fichier principal, configuration du serveur Express
├── package.json           # Métadonnées et dépendances du projet
├── config/
│   ├── database.js        # Configuration de la connexion à la base de données MySQL
│   └── pizzayolo.sql      # Schéma et données initiales de la base de données
├── controller/
│   ├── ingredientsController.js # Logique métier pour les ingrédients
│   └── pizzaController.js       # Logique métier pour les pizzas
├── entities/
│   ├── Ingredients.js     # Modèle de données pour les ingrédients (interagit avec la BDD)
│   └── Pizza.js           # Modèle de données pour les pizzas (interagit avec la BDD)
├── public/                
└── routes/
    ├── ingredients.js     # Définition des routes de l'API pour /ingredients
    └── pizza.js           # Définition des routes de l'API pour /pizzas
```

- **`app.js`**: Le cœur de l'application. Il initialise Express, configure les middlewares (comme `morgan` pour les logs et `express.json` pour parser le JSON), et branche les routeurs.
- **`config/`**: Contient les fichiers de configuration. `database.js` gère la connexion à MySQL et `pizzayolo.sql` permet de recréer la base de données à l'identique.
- **`controller/`**: Gère la logique applicative. Les contrôleurs reçoivent les requêtes validées depuis les routes, appellent les méthodes des entités pour interagir avec la base de données, et formatent la réponse HTTP.
- **`entities/`**: Couche d'abstraction de la base de données. Ces fichiers contiennent les fonctions qui exécutent les requêtes SQL (ex: `findAll`, `findById`, `create`).
- **`routes/`**: Définit les points d'accès (endpoints) de l'API. Chaque fichier de route est associé à un préfixe (`/pizzas`, `/ingredients`) et redirige les requêtes vers la fonction appropriée du contrôleur, en y ajoutant une étape de validation si nécessaire.

---

## Routes de l'API

L'API est organisée autour de deux ressources principales : les pizzas et les ingrédients.

### Pizzas

Préfixe de la route : `/pizzas`

| Méthode | Endpoint                 | Description                                    |
|---------|--------------------------|------------------------------------------------|
| `GET`   | `/`                      | Récupère la liste de toutes les pizzas.        |
| `GET`   | `/:id`                   | Récupère une pizza par son identifiant.        |
| `GET`   | `/daily-Pizza`           | Récupère la pizza du jour (logique à définir). |
| `GET`   | `/:id/ingredients`       | Récupère les ingrédients d'une pizza.          |
| `POST`  | `/`                      | Crée une nouvelle pizza.                       |
| `PATCH` | `/:id`                   | Met à jour partiellement une pizza existante.  |
| `DELETE`| `/:id`                   | Supprime une pizza par son identifiant.        |

**Exemple de corps pour `POST` / `PATCH` :**
```json
{
  "name": "Nouvelle Pizza",
  "price": 14.50
}
```

### Ingrédients

Préfixe de la route : `/ingredients`

| Méthode | Endpoint | Description                                       |
|---------|----------|---------------------------------------------------|
| `GET`   | `/`      | Récupère la liste de tous les ingrédients.        |
| `GET`   | `/:id`   | Récupère un ingrédient par son identifiant.       |
| `POST`  | `/`      | Crée un nouvel ingrédient.                        |
| `PATCH` | `/:id`   | Met à jour partiellement un ingrédient existant. |
| `DELETE`| `/:id`   | Supprime un ingrédient par son identifiant.       |

**Exemple de corps pour `POST` / `PATCH` :**
```json
{
  "name": "Anchois"
}
```
