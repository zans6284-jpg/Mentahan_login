const lampRope = document.getElementById('lampRope');
const fileInput = document.getElementById('fileInput');
const bgContainer = document.getElementById('bg-container');

// 1. Tarik Lampu untuk Buka Login
lampRope.addEventListener('click', () => {
    document.body.classList.toggle('light-on');
});

// 2. Logika Upload Foto/Video
fileInput.addEventListener('change', function() {
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
        // Tanpa 'muted' agar suara terdengar
        bgContainer.innerHTML = `<video src="${src}" autoplay loop playsinline></video>`;
    } else {
        bgContainer.innerHTML = `<img src="${src}">`;
    }
}

// 3. Simpan Background ke LocalStorage
function saveSettings() {
    const media = bgContainer.firstChild;
    if (media) {
        localStorage.setItem('customBG', media.src);
        localStorage.setItem('customBGType', media.tagName);
        alert('Latar belakang berhasil disimpan!');
    }
}

// Muat data saat halaman dibuka
window.onload = () => {
    const savedSrc = localStorage.getItem('customBG');
    const savedType = localStorage.getItem('customBGType');
    if (savedSrc) {
        if (savedType === 'VIDEO') {
            bgContainer.innerHTML = `<video src="${savedSrc}" autoplay loop playsinline></video>`;
        } else {
            bgContainer.innerHTML = `<img src="${savedSrc}">`;
        }
    }
};

// 4. Mode Desktop (Fullscreen)
function toggleDesktop() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// 5. Submit Form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Berhasil Mendaftar!");
});
