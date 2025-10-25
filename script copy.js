// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ff0000" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff0000",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        }
    }
});

// Navegación entre secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Filtros de tienda
document.addEventListener('DOMContentLoaded', function() {
    // Filtros de productos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar productos
            productCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Navegación por links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
        });
    });
});

// Funciones de modales
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function showRegisterModal() {
    document.getElementById('register-modal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Simular usuario logueado (esto se conectará con Firebase)
function simulateLogin(userData) {
    document.getElementById('auth-buttons').style.display = 'none';
    document.getElementById('user-menu').style.display = 'block';
    document.getElementById('user-display-name').textContent = userData.name;
    
    // Actualizar información de licencia
    document.getElementById('license-user').textContent = userData.name;
    document.getElementById('license-pc').textContent = userData.pcName;
    document.getElementById('license-date').textContent = new Date().toLocaleDateString();
    
    // Mostrar sección de inicio
    showSection('home');
}

function logout() {
    document.getElementById('auth-buttons').style.display = 'flex';
    document.getElementById('user-menu').style.display = 'none';
    showSection('home');
}

// Datos de ejemplo para demostración
const demoUser = {
    name: "CrashOverride",
    pcName: "GAMER-PRO-2024"
};

// Para pruebas rápidas, descomenta esta línea:
// simulateLogin(demoUser);