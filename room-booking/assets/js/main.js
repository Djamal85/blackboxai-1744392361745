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
        console.log('Loaded data:', data); // Debug log
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
    console.log('Displaying rooms:', rooms); // Debug log
    
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
