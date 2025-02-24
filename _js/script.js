// Elementos del DOM utilizados
const timeButton = document.getElementById('timeButton');
const userButton = document.getElementById('userButton');
const pickupLocation = document.getElementById('pickupLocation');
const dropLocation = document.getElementById('dropLocation');

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
  suggestions.innerHTML = ``; 
  input.parentElement.appendChild(suggestions);
}

function hideLocationSuggestions() {
  const suggestions = document.querySelector('.location-suggestions');
  if (suggestions) {
    suggestions.remove();
  }
}

function updateLocationSuggestions(input) {
  // Lógica para actualizar las sugerencias según el input
  console.log(`Buscando ubicaciones para: ${input.value}`);
}

// Aplicar los manejadores a los inputs de ubicación
setupLocationInput(pickupLocation);
setupLocationInput(dropLocation);
