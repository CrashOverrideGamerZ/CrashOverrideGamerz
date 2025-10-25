// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    collection,
    getDocs,
    increment 
} from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

// Tu configuración de Firebase - REEMPLAZA CON TUS DATOS REALES
const firebaseConfig = {
    apiKey: "AIzaSyC1rYvL48nSmGAZ4Nx3Vvo5nZYXFxNWFjk",
    authDomain: "crashoverridegamerz-ddf1f.firebaseapp.com",
    projectId: "crashoverridegamerz-ddf1f",
    storageBucket: "crashoverridegamerz-ddf1f.firebasestorage.app",
    messagingSenderId: "465236262667",
    appId: "1:465236262667:web:b80d953b12db1b26816c0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Manejar formulario de registro
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const company = document.getElementById('register-company').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    try {
        // Crear usuario en Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            company: company,
            createdAt: new Date(),
            hardwareId: generateHardwareId(),
            licenseActive: true,
            pcName: generatePCName()
        });
        
        // Mostrar pantalla de éxito
        showSuccess(name);
        
        // Actualizar estadísticas
        await updateStatistics('registrations');
        
    } catch (error) {
        console.error("Error en registro:", error);
        alert('Error al registrar: ' + error.message);
    }
});

// Manejar formulario de login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Obtener datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            showSuccess(userData.name);
        }
        
        // Actualizar estadísticas
        await updateStatistics('logins');
        
    } catch (error) {
        console.error("Error en login:", error);
        alert('Error al iniciar sesión: ' + error.message);
    }
});

// Generar ID de hardware simulado (en la app WPF sería real)
function generateHardwareId() {
    const components = [
        Math.random().toString(36).substr(2, 9),
        Math.random().toString(36).substr(2, 9),
        Math.random().toString(36).substr(2, 9)
    ];
    return btoa(components.join('-')).substr(0, 20);
}

// Actualizar estadísticas en Firestore
async function updateStatistics(type) {
    const statsRef = doc(db, "statistics", "global");
    
    try {
        await updateDoc(statsRef, {
            [type]: increment(1),
            lastUpdate: new Date()
        });
    } catch (error) {
        // Si el documento no existe, crearlo
        await setDoc(statsRef, {
            registrations: type === 'registrations' ? 1 : 0,
            logins: type === 'logins' ? 1 : 0,
            downloads: 0,
            lastUpdate: new Date()
        });
    }
}

// Verificar si el usuario ya está logueado
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario ya logueado, mostrar pantalla de éxito
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
            if (docSnap.exists()) {
                showSuccess(docSnap.data().name);
            }
        });
    }
});