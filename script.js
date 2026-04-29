const lampRope = document.getElementById('lampRope');
const bgInput = document.getElementById('bgInput');
const photoInput = document.getElementById('photoInput');
const bgContainer = document.getElementById('bg-container');
const loginPhoto = document.getElementById('loginPhoto');

// 1. Tarik Lampu untuk Buka Login
lampRope.addEventListener('click', () => {
    document.body.classList.toggle('light-on');
});

// 2. Logika Upload Background Utama (Video/Foto)
bgInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            applyBackground(e.target.result, file.type);
        }
        reader.readAsDataURL(file);
    }
});

function applyBackground(src, type) {
    bgContainer.innerHTML = '';
    if (type.includes('video')) {
        bgContainer.innerHTML = `<video src="${src}" autoplay loop playsinline></video>`;
    } else {
        bgContainer.innerHTML = `<img src="${src}">`;
    }
}

// 3. Logika Upload Foto di Kolom Login
photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            applyLoginPhoto(e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

function applyLoginPhoto(src) {
    loginPhoto.src = src;
}

// 4. Simpan SEMUA ke LocalStorage
function saveAllSettings() {
    // Simpan Background Utama
    const media = bgContainer.firstChild;
    if (media) {
        localStorage.setItem('customBG', media.src);
        localStorage.setItem('customBGType', media.tagName);
    }
    
    // Simpan Foto Login
    localStorage.setItem('customLoginPhoto', loginPhoto.src);
    
    alert('Semua pengaturan (Background & Foto Login) berhasil disimpan!');
}

// Muat data saat halaman dibuka
window.onload = () => {
    // Load Background Utama
    const savedSrc = localStorage.getItem('customBG');
    const savedType = localStorage.getItem('customBGType');
    if (savedSrc) {
        if (savedType === 'VIDEO') {
            bgContainer.innerHTML = `<video src="${savedSrc}" autoplay loop playsinline></video>`;
        } else {
            bgContainer.innerHTML = `<img src="${savedSrc}">`;
        }
    }
    
    // Load Foto Login
    const savedPhoto = localStorage.getItem('customLoginPhoto');
    if (savedPhoto) {
        loginPhoto.src = savedPhoto;
    }
};

// 5. Mode Desktop (Fullscreen)
function toggleDesktop() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Submit Form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Terima kasih telah mendaftar!");
});
