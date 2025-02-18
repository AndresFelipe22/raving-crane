// Elementos del DOM
const menuButton = document.getElementById('menuButton');
const timeButton = document.getElementById('timeButton');
const userButton = document.getElementById('userButton');
const pickupLocation = document.getElementById('pickupLocation');
const dropLocation = document.getElementById('dropLocation');
const serviceItems = document.querySelectorAll('.service-item');
const mainContent = document.querySelector('.main-content');

// Estado de la aplicación
let isMenuOpen = false;
let currentService = null;

// Manejador del menú
menuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        showMenu();
    } else {
        hideMenu();
    }
});

function showMenu() {
    // Crear y mostrar el menú
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.innerHTML = `
        <div class="menu-overlay">
            <div class="menu-content">
                <a href="#" class="menu-item">Mi Perfil</a>
                <a href="#" class="menu-item">Mis Viajes</a>
                <a href="#" class="menu-item">Configuración</a>
                <a href="#" class="menu-item">Ayuda</a>
            </div>
        </div>
    `;
    document.body.appendChild(menu);
    // Añadir clase para la animación
    setTimeout(() => menu.classList.add('active'), 10);
    
    // Cerrar menú al hacer clic fuera
    menu.addEventListener('click', (e) => {
        if (e.target.classList.contains('menu-overlay')) {
            hideMenu();
        }
    });
}

function hideMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.remove('active');
        setTimeout(() => menu.remove(), 300);
    }
    isMenuOpen = false;
}

// Manejador de botones de tiempo y usuario
timeButton.addEventListener('click', () => {
    const timeOptions = ['Recoger ya', 'Programar'];
    const currentText = timeButton.textContent.trim();
    const newText = currentText === timeOptions[0] ? timeOptions[1] : timeOptions[0];
    
    // Animación del cambio
    timeButton.style.opacity = '0';
    setTimeout(() => {
        timeButton.textContent = newText;
        timeButton.style.opacity = '1';
    }, 200);
});

userButton.addEventListener('click', () => {
    const userOptions = ['Para mí', 'Para otro'];
    const currentText = userButton.textContent.trim();
    const newText = currentText === userOptions[0] ? userOptions[1] : userOptions[0];
    
    // Animación del cambio
    userButton.style.opacity = '0';
    setTimeout(() => {
        userButton.textContent = newText;
        userButton.style.opacity = '1';
    }, 200);
});

// Manejador de inputs de ubicación
function setupLocationInput(input) {
    const wrapper = input.parentElement;
    
    input.addEventListener('focus', () => {
        wrapper.classList.add('input-focused');
        showLocationSuggestions(input);
    });

    input.addEventListener('blur', () => {
        wrapper.classList.remove('input-focused');
        setTimeout(hideLocationSuggestions, 200);
    });

    input.addEventListener('input', debounce(() => {
        if (input.value.length > 2) {
            updateLocationSuggestions(input);
        }
    }, 300));
}

function showLocationSuggestions(input) {
    const suggestions = document.createElement('div');
    suggestions.className = 'location-suggestions';
    suggestions.innerHTML = `
      
    `;
    input.parentElement.appendChild(suggestions);
}

function hideLocationSuggestions() {
    const suggestions = document.querySelector('.location-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

function updateLocationSuggestions(input) {
    // Aquí iría la lógica para buscar ubicaciones basadas en el input
    console.log(`Buscando ubicaciones para: ${input.value}`);
}

// Aplicar manejadores a los inputs de ubicación
setupLocationInput(pickupLocation);
setupLocationInput(dropLocation);

// Manejador de servicios
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        const serviceType = item.dataset.service;
        currentService = serviceType;
        
        // Quitar selección previa
        serviceItems.forEach(i => i.classList.remove('selected'));
        // Añadir selección actual
        item.classList.add('selected');
        
        // Animar selección
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 100);
        
        updateUIForService(serviceType);
    });
});

function updateUIForService(serviceType) {
    // Actualizar la UI según el servicio seleccionado
    const serviceConfigs = {
        viaje: {
            dropoffRequired: true,
            timeSelection: true
        },
        articulo: {
            dropoffRequired: true,
            timeSelection: false
        },
        hourly: {
            dropoffRequired: false,
            timeSelection: true
        },
        reservar: {
            dropoffRequired: true,
            timeSelection: true
        }
    };

    const config = serviceConfigs[serviceType];
    dropLocation.parentElement.style.display = config.dropoffRequired ? 'flex' : 'none';
    timeButton.style.display = config.timeSelection ? 'flex' : 'none';
}

// Función debounce para optimizar eventos de input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para verificar el tamaño de la pantalla y ajustar la UI
function checkScreenSize() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    // Ajustar la UI según el tamaño de pantalla
    mainContent.classList.toggle('mobile-view', isMobile);
    mainContent.classList.toggle('small-mobile-view', isSmallMobile);

    // Ajustar altura del mapa
    const mapSection = document.querySelector('.map-section');
    mapSection.style.height = isMobile ? '150px' : '200px';
}

// Escuchar cambios en el tamaño de la ventana
window.addEventListener('resize', debounce(checkScreenSize, 250));

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    checkScreenSize();
    updateUIForService('viaje'); // Servicio por defecto
});