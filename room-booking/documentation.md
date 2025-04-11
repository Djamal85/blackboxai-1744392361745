# Documentation RéservaSalle

## Structure du Projet

```
room-booking/
├── assets/
│   ├── css/
│   │   └── style.css          # Styles personnalisés et composants Tailwind
│   ├── js/
│   │   └── main.js           # Fonctions JavaScript partagées
│   └── data/
│       └── bookings.json     # Données des salles, réservations et utilisateurs
├── pages/
│   ├── admin/
│   │   ├── dashboard.html    # Tableau de bord administrateur
│   │   ├── manage-rooms.html # Gestion des salles
│   │   └── manage-bookings.html # Gestion des réservations
│   └── user/
│       ├── book-room.html    # Page de réservation
│       └── my-bookings.html  # Mes réservations
├── index.html                # Page d'accueil
└── login.html               # Page de connexion
```

## Description des Fichiers

### Pages Principales

1. **index.html**
   - Page d'accueil du site
   - Présentation des salles disponibles
   - Accès à la réservation et à la connexion
   - Design moderne avec Tailwind CSS

2. **login.html**
   - Système d'authentification
   - Support des rôles utilisateur et administrateur
   - Formulaire de connexion sécurisé

### Section Administrateur

3. **pages/admin/dashboard.html**
   - Vue d'ensemble des statistiques
   - Nombre total de salles et réservations
   - Alertes pour les conflits de réservation
   - État actuel des salles

4. **pages/admin/manage-rooms.html**
   - Ajout, modification et suppression des salles
   - Gestion des équipements
   - Upload des images
   - Configuration des capacités

5. **pages/admin/manage-bookings.html**
   - Liste complète des réservations
   - Système de filtrage avancé
   - Gestion des conflits
   - Validation des réservations

### Section Utilisateur

6. **pages/user/book-room.html**
   - Formulaire de réservation
   - Sélection de salle et date
   - Vérification des disponibilités
   - Confirmation de réservation

7. **pages/user/my-bookings.html**
   - Liste des réservations personnelles
   - Modification des réservations
   - Annulation des réservations
   - Historique des réservations

### Assets

8. **assets/css/style.css**
   ```css
   /* Styles personnalisés pour :
    * - Composants de calendrier
    * - Cartes de salles
    * - Formulaires
    * - Notifications
    * - Animations
    * - Responsive design
    */
   ```

9. **assets/js/main.js**
   ```javascript
   // Fonctionnalités principales :
   // - Gestion de l'authentification
   // - Vérification des disponibilités
   // - Gestion des réservations
   // - Notifications
   // - Validation des formulaires
   ```

10. **assets/data/bookings.json**
    ```json
    {
      "rooms": [
        {
          "id": "1",
          "name": "Salle de Conférence A",
          "capacity": 20,
          "equipment": ["Projecteur", "Tableau"]
        }
      ],
      "bookings": [
        {
          "id": "1",
          "roomId": "1",
          "userId": "user1",
          "startTime": "2024-01-20T09:00:00",
          "endTime": "2024-01-20T11:00:00",
          "purpose": "Réunion"
        }
      ],
      "users": [
        {
          "id": "admin1",
          "name": "Admin",
          "role": "admin"
        }
      ]
    }
    ```

## Fonctionnalités Principales

1. **Gestion des Salles**
   - Création et modification des salles
   - Gestion des équipements
   - Suivi de la disponibilité

2. **Système de Réservation**
   - Réservation intuitive
   - Vérification des conflits
   - Notifications en temps réel

3. **Administration**
   - Tableau de bord complet
   - Gestion des utilisateurs
   - Résolution des conflits

4. **Interface Utilisateur**
   - Design responsive
   - Navigation intuitive
   - Feedback visuel

## Technologies Utilisées

- **Frontend**
  - HTML5
  - Tailwind CSS
  - JavaScript vanilla
  - Font Awesome (icônes)
  - Google Fonts

- **Données**
  - JSON pour le stockage
  - LocalStorage pour les sessions

## Sécurité

- Authentification utilisateur
- Contrôle d'accès basé sur les rôles
- Validation des données
- Protection contre les conflits de réservation

## Guide d'Utilisation

### Pour les Utilisateurs
1. Créer un compte ou se connecter
2. Consulter les salles disponibles
3. Effectuer une réservation
4. Gérer ses réservations

### Pour les Administrateurs
1. Se connecter en tant qu'admin
2. Gérer les salles via le dashboard
3. Superviser les réservations
4. Résoudre les conflits éventuels
