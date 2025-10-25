// Configuración de partículas
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00ff88" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00ff88",
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

// Funciones de navegación
function showRegister() {
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('register-container').classList.add('active');
    document.getElementById('success-container').classList.remove('active');
}

function showLogin() {
    document.getElementById('register-container').classList.remove('active');
    document.getElementById('login-container').classList.add('active');
    document.getElementById('success-container').classList.remove('active');
}

function showSuccess(userName) {
    document.getElementById('login-container').classList.remove('active');
    document.getElementById('register-container').classList.remove('active');
    document.getElementById('success-container').classList.add('active');
    
    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-pc').textContent = generatePCName();
    
    // Actualizar estadísticas
    updateStats();
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function generatePCName() {
    const prefixes = ['GAMER', 'ULTRA', 'PRO', 'MASTER', 'ELITE', 'EXTREME'];
    const suffixes = ['X', 'PRO', 'MAX', 'ULTIMATE', 'V2', 'NEO'];
    const numbers = Math.floor(Math.random() * 9000) + 1000;
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return `${prefix}-${numbers}-${suffix}`;
}

function downloadApp() {
    // Redirigir a Discord para descargar el .exe
    window.location.href = 'https://discord.gg/TU_ENLACE_AQUI';
}

// Actualizar estadísticas
function updateStats() {
    const usersCount = document.getElementById('users-count');
    const licensesCount = document.getElementById('licenses-count');
    const downloadsCount = document.getElementById('downloads-count');
    
    // Simular números crecientes (en una app real vendrían de Firebase)
    animateCounter(usersCount, 1247);
    animateCounter(licensesCount, 893);
    animateCounter(downloadsCount, 1562);
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 30);
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    
    // Efectos de sonido (opcional)
    const buttons = document.querySelectorAll('.btn, .form-footer a, .toggle-password');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí podrías agregar efectos de sonido
        });
    });
});