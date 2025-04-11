# Documentation Complète du Projet RéservaSalle

## Structure du Projet
```
room-booking/
├── documentation.md
├── index.html
├── login.html
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── data/
│   │   └── bookings.json
│   └── js/
│       └── main.js
└── pages/
    ├── admin/
    │   ├── dashboard.html
    │   ├── manage-bookings.html
    │   └── manage-rooms.html
    └── user/
        ├── book-room.html
        └── my-bookings.html
```

## Contenu des Fichiers

### 1. Données (bookings.json)
```json
{
  "rooms": [
    {
      "id": "1",
      "name": "Salle de Conférence A",
      "capacity": 20,
      "description": "Grande salle équipée d'un projecteur et d'un tableau",
      "image": "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      "equipment": ["Projecteur", "Tableau blanc", "Système audio"]
    },
    {
      "id": "2",
      "name": "Salle de Réunion B",
      "capacity": 10,
      "description": "Salle moyenne idéale pour les réunions d'équipe",
      "image": "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg",
      "equipment": ["Écran TV", "Tableau blanc"]
    },
    {
      "id": "3",
      "name": "Salle de Formation C",
      "capacity": 30,
      "description": "Grande salle de formation avec disposition en classe",
      "image": "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      "equipment": ["Projecteur", "Tableaux multiples", "Système audio"]
    }
  ],
  "bookings": [
    {
      "id": "1",
      "roomId": "1",
      "userId": "user1",
      "startTime": "2024-01-20T09:00:00",
      "endTime": "2024-01-20T11:00:00",
      "purpose": "Réunion d'équipe",
      "status": "confirmed"
    }
  ],
  "users": [
    {
      "id": "admin1",
      "name": "Admin Principal",
      "role": "admin",
      "email": "admin@example.com",
      "password": "admin123"
    },
    {
      "id": "user1",
      "name": "Jean Dupont",
      "role": "user",
      "email": "jean@example.com",
      "password": "user123"
    }
  ]
}
```

### 2. Style CSS (style.css)
```css
/* Styles personnalisés pour RéservaSalle */
.toast {
    transform: translateY(100%);
    opacity: 0;
    transition: all 0.3s ease-in-out;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

.room-card {
    transition: transform 0.2s ease-in-out;
}

.room-card:hover {
    transform: translateY(-5px);
}

/* Styles pour le calendrier */
.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background-color: #e5e7eb;
    border: 1px solid #e5e7eb;
}

.calendar-day {
    background-color: white;
    padding: 1rem;
    min-height: 100px;
}

.calendar-day.today {
    background-color: #f3f4f6;
}

.calendar-day.has-booking {
    position: relative;
}

.calendar-day.has-booking::after {
    content: '';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #3b82f6;
    border-radius: 50%;
}

/* Styles pour le formulaire de réservation */
.time-picker {
    position: relative;
}

.time-picker input {
    padding-right: 2rem;
}

.time-picker i {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
}

/* Animation pour les notifications */
@keyframes slideIn {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.notification {
    animation: slideIn 0.3s ease-out forwards;
}
```

### 3. JavaScript Principal (main.js)
```javascript
// Main JavaScript file for RéservaSalle

// Global variables
let currentUser = null;
let rooms = [];
let bookings = [];

// Utility Functions
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });
};

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Toast Notification System
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type} fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50`;
    
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };
    
    toast.classList.add(colors[type], 'text-white');
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Data Loading Functions
const loadData = async () => {
    try {
        const response = await fetch('/room-booking/assets/data/bookings.json');
        const data = await response.json();
        console.log('Loaded data:', data);
        rooms = data.rooms;
        bookings = data.bookings;
        
        // Display rooms on index page
        const roomsContainer = document.getElementById('roomsContainer');
        if (roomsContainer) {
            displayRooms(roomsContainer);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Erreur lors du chargement des données', 'error');
    }
};

// Display rooms
const displayRooms = (container) => {
    if (!container) return;
    console.log('Displaying rooms:', rooms);
    
    container.innerHTML = rooms.map(room => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden room-card">
            <img src="${room.image}" alt="${room.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${room.name}</h3>
                    <span class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                        ${room.capacity} personnes
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${room.description}</p>
                <div class="mb-4">
                    <h4 class="font-medium mb-2">Équipements:</h4>
                    <div class="flex flex-wrap gap-2">
                        ${room.equipment.map(item => `
                            <span class="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded">
                                ${item}
                            </span>
                        `).join('')}
                    </div>
                </div>
                <a href="pages/user/book-room.html?room=${room.id}" 
                   class="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Réserver
                </a>
            </div>
        </div>
    `).join('');
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
```

### 4. Pages HTML

#### 4.1 Page d'Accueil (index.html)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RéservaSalle - Accueil</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="font-[Poppins] bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex items-center">
                        <i class="fas fa-calendar-alt text-blue-600 text-2xl mr-2"></i>
                        <span class="text-xl font-semibold text-gray-800">RéservaSalle</span>
                    </a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="login.html" class="text-gray-600 hover:text-gray-900">
                        <i class="fas fa-sign-in-alt mr-1"></i>
                        Connexion
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div class="sm:text-center lg:text-left">
                        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span class="block">Réservez votre salle en</span>
                            <span class="block text-blue-600">quelques clics</span>
                        </h1>
                        <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Système simple et efficace pour la réservation de salles de réunion et de formation.
                        </p>
                        <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div class="rounded-md shadow">
                                <a href="#rooms" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                                    Voir les salles
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>

    <!-- Rooms Section -->
    <div id="rooms" class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Nos Salles
                </h2>
                <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                    Découvrez nos salles disponibles et leurs équipements
                </p>
            </div>

            <div id="roomsContainer" class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <!-- Rooms will be dynamically inserted here -->
            </div>
        </div>
    </div>

    <!-- Features Section -->
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Pourquoi choisir RéservaSalle ?
                </h2>
            </div>

            <div class="mt-12 grid gap-8 md:grid-cols-3">
                <!-- Feature 1 -->
                <div class="text-center">
                    <div class="flex justify-center">
                        <i class="fas fa-clock text-4xl text-blue-600"></i>
                    </div>
                    <h3 class="mt-4 text-xl font-semibold">Réservation rapide</h3>
                    <p class="mt-2 text-gray-500">
                        Réservez votre salle en quelques clics seulement
                    </p>
                </div>

                <!-- Feature 2 -->
                <div class="text-center">
                    <div class="flex justify-center">
                        <i class="fas fa-calendar-check text-4xl text-blue-600"></i>
                    </div>
                    <h3 class="mt-4 text-xl font-semibold">Disponibilité en temps réel</h3>
                    <p class="mt-2 text-gray-500">
                        Consultez la disponibilité des salles instantanément
                    </p>
                </div>

                <!-- Feature 3 -->
                <div class="text-center">
                    <div class="flex justify-center">
                        <i class="fas fa-tools text-4xl text-blue-600"></i>
                    </div>
                    <h3 class="mt-4 text-xl font-semibold">Équipements modernes</h3>
                    <p class="mt-2 text-gray-500">
                        Des salles équipées pour tous vos besoins
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800">
        <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div class="text-center text-gray-400">
                <p>&copy; 2024 RéservaSalle. Tous droits réservés.</p>
            </div>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>
```

#### 4.2 Page de Connexion (login.html)
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - RéservaSalle</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="font-[Poppins] bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex items-center">
                        <i class="fas fa-calendar-alt text-blue-600 text-2xl mr-2"></i>
                        <span class="text-xl font-semibold text-gray-800">RéservaSalle</span>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Login Section -->
    <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Connexion
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Accédez à votre espace personnel
                </p>
            </div>

            <!-- Role Selection -->
            <div class="flex justify-center space-x-4 mb-6">
                <button id="userBtn" class="role-btn px-4 py-2 rounded-md bg-blue-600 text-white" onclick="switchRole('user')">
                    <i class="fas fa-user mr-2"></i>
                    Utilisateur
                </button>
                <button id="adminBtn" class="role-btn px-4 py-2 rounded-md bg-gray-200 text-gray-700" onclick="switchRole('admin')">
                    <i class="fas fa-user-shield mr-2"></i>
                    Administrateur
                </button>
            </div>

            <form id="loginForm" class="mt-8 space-y-6" onsubmit="handleLogin(event)">
                <input type="hidden" name="role" id="roleInput" value="user">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email" class="sr-only">Email</label>
                        <input id="email" name="email" type="email" required 
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                            placeholder="Email">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Mot de passe</label>
                        <input id="password" name="password" type="password" required 
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                            placeholder="Mot de passe">
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" 
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Se souvenir de moi
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                            Mot de passe oublié?
                        </a>
                    </div>
                </div>

                <div>
                    <button type="submit" 
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <i class="fas fa-lock"></i>
                        </span>
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Role switching functionality
        function switchRole(role) {
            document.getElementById('roleInput').value = role;
            const userBtn = document.getElementById('userBtn');
            const adminBtn = document.getElementById('adminBtn');

            if (role === 'user') {
                userBtn.classList.remove('bg-gray-200', 'text-gray-700');
                userBtn.classList.add('bg-blue-600', 'text-white');
                adminBtn.classList.remove('bg-blue-600', 'text-white');
                adminBtn.classList.add('bg-gray-200', 'text-gray-700');
            } else {
                adminBtn.classList.remove('bg-gray-200', 'text-gray-700');
                adminBtn.classList.add('bg-blue-600', 'text-white');
                userBtn.classList.remove('bg-blue-600', 'text-white');
                userBtn.classList.add('bg-gray-200', 'text-gray-700');
            }
        }

        // Login form submission
        async function handleLogin(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('roleInput').value;

            console.log('Tentative de connexion avec:', { email, role });

            try {
                // Fetch users data
                console.log('Chargement des données...');
                const response = await fetch('/room-booking/assets/data/bookings.json');
                const data = await response.json();
                console.log('Données chargées:', data);
                
                // Find user
                const user = data.users.find(u => {
                    console.log('Vérification utilisateur:', u.email, u.role);
                    return u.email === email && 
                           u.password === password && 
                           u.role === role;
                });

                if (user) {
                    console.log('Utilisateur trouvé:', user);
                    // Store user info in localStorage
                    const userInfo = {
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        email: user.email
                    };
                    localStorage.setItem('currentUser', JSON.stringify(userInfo));

                    // Redirect based on role
                    if (role === 'admin') {
                        window.location.href = '/room-booking/pages/admin/dashboard.html';
                    } else {
                        window.location.href = '/room-booking/pages/user/book-room.html';
                    }
                } else {
                    console.log('Utilisateur non trouvé');
                    showError('Email ou mot de passe incorrect');
                }
            } catch (error) {
                console.error('Erreur lors de la connexion:', error);
                showError('Une erreur est survenue lors de la connexion');
            }
        }

        // Error display
        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4';
            errorDiv.role = 'alert';
            errorDiv.innerHTML = `
                <span class="block sm:inline">${message}</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" onclick="this.parentElement.parentElement.remove()"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>
            `;
            
            const form = document.getElementById('loginForm');
            form.parentNode.insertBefore(errorDiv, form.nextSibling);
        }
    </script>
</body>
</html>
```

## Identifiants de Connexion

### Utilisateur
- Email : jean@example.com
- Mot de passe : user123

### Administrateur
- Email : admin@example.com
- Mot de passe : admin123

## Fonctionnalités

1. **Système de Connexion**
   - Sélection du rôle (utilisateur/administrateur)
   - Authentification avec email et mot de passe
   - Stockage des informations utilisateur dans localStorage

2. **Gestion des Salles**
   - Affichage des salles disponibles
   - Détails des équipements
   - Capacité des salles
   - Images des salles

3. **Système de Réservation**
   - Sélection de la date et de l'heure
   - Vérification des disponibilités
   - Confirmation de réservation
   - Historique des réservations

4. **Interface Administrateur**
   - Tableau de bord
   - Gestion des salles
   - Gestion des réservations

5. **Notifications**
   - Système de toast notifications
   - Messages d'erreur
   - Confirmations

## Technologies Utilisées

1. **Frontend**
   - HTML5
   - CSS3 (Tailwind CSS)
   - JavaScript (Vanilla)
   - Font Awesome (Icons)
   - Google Fonts (Poppins)

2. **Données**
   - JSON pour le stockage des données
   - LocalStorage pour les sessions utilisateur

3. **Style**
   - Tailwind CSS pour le design responsive
   - Animations CSS personnalisées
   - Interface moderne et intuitive
