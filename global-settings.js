// global-settings.js

// --- TEMAS ---
function applyTheme(themeName) {
    const root = document.documentElement;
    const themes = {
        original: { '--color-crema': '#fdfbf5', '--color-oliva-claro': '#bec092', '--color-oliva-medio': '#5a6133', '--color-oliva-oscuro': '#272b00', },
        cafe: { '--color-crema': '#f5e6d3', '--color-oliva-claro': '#a0826d', '--color-oliva-medio': '#6f4e37', '--color-oliva-oscuro': '#3e2723', },
        azul_cielo: { '--color-crema': '#e0f7fa', '--color-oliva-claro': '#81d4fa', '--color-oliva-medio': '#29b6f6', '--color-oliva-oscuro': '#0288d1', },
        lila: { '--color-crema': '#f3e5f5', '--color-oliva-claro': '#ce93d8', '--color-oliva-medio': '#ab47bc', '--color-oliva-oscuro': '#7b1fa2', },
        rosa: { '--color-crema': '#fce4ec', '--color-oliva-claro': '#f48fb1', '--color-oliva-medio': '#ec407a', '--color-oliva-oscuro': '#d81b60', },
        amarillo: { '--color-crema': '#fffde7', '--color-oliva-claro': '#fff176', '--color-oliva-medio': '#ffee58', '--color-oliva-oscuro': '#fbc02d', },
        oscuro: { '--color-crema': '#121212', '--color-oliva-claro': '#424242', '--color-oliva-medio': '#e0e0e0', '--color-oliva-oscuro': '#ffffff', },
        custom: {} // Para el color personalizado
    };
    const theme = themes[themeName];
    if (theme) {
        Object.keys(theme).forEach(property => root.style.setProperty(property, theme[property]));
    }
}

// --- TAMAÑO DE FUENTE ---
function applyFontSize(size) {
    const root = document.documentElement;
    const sizes = { pequeno: '14px', normal: '16px', grande: '18px', extra_grande: '20px' };
    if (sizes[size]) {
        root.style.setProperty('--base-font-size', sizes[size]);
        root.style.fontSize = sizes[size];
    }
}

// --- ANIMACIONES ---
function applyAnimationSpeed(speed) {
    const root = document.documentElement;
    const durations = { lenta: '0.5s', normal: '0.3s', rapida: '0.1s' };
    if (durations[speed]) {
        root.style.setProperty('--animation-speed', durations[speed]);
        document.body.style.setProperty('--transition-speed', durations[speed]);
    }
}

// --- SONIDOS ---
const sounds = {
    click: new Audio('click.mp3'), // Necesitarás tener estos archivos de sonido
    levelUp: new Audio('levelup.mp3'),
    missionComplete: new Audio('mission.mp3')
};

function playSound(soundName) {
    const settings = JSON.parse(localStorage.getItem('skopia_settings')) || {};
    if (settings.soundEnabled && sounds[soundName]) {
        sounds[soundName].play().catch(e => console.error("Error al reproducir sonido:", e));
    }
}

// --- FUNCIÓN PRINCIPAL (AHORA EXPORTADA) ---
export function loadAndApplySettings() {
    const settings = JSON.parse(localStorage.getItem('skopia_settings')) || {};
    
    applyTheme(settings.theme || 'original');
    applyFontSize(settings.fontSize || 'normal');
    applyAnimationSpeed(settings.animationSpeed || 'normal');
    
    // Aplicar color personalizado si existe
    if (settings.theme === 'custom' && settings.accentColor) {
        document.documentElement.style.setProperty('--color-oliva-medio', settings.accentColor);
    }

    // Aplicar modo de enfoque
    if (settings.focusMode) {
        document.body.classList.add('focus-mode');
    } else {
        document.body.classList.remove('focus-mode');
    }
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAndApplySettings);
