const body = document.body;
const lampRope = document.getElementById('lamp-rope');
const bgInput = document.getElementById('bg-input');
const bgImage = document.getElementById('bg-image');
const bgVideo = document.getElementById('bg-video');
const cardPhotoInput = document.getElementById('card-photo-input');
const cardPhoto = document.getElementById('card-photo');
const saveBtn = document.getElementById('save-btn');
const desktopBtn = document.getElementById('desktop-toggle');

// 1. Logika Lampu Interaktif
lampRope.addEventListener('click', () => {
    body.classList.toggle('light-on');
    // Jika ada video, nyalakan suara saat lampu nyala (interaksi user diperlukan)
    if (body.classList.contains('light-on')) {
        bgVideo.muted = false;
        bgVideo.play();
    } else {
        bgVideo.muted = true;
    }
});

// 2. Logika Ganti Background (Foto/Video)
bgInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        if (file.type.includes('video')) {
            bgImage.style.display = 'none';
            bgVideo.style.display = 'block';
            bgVideo.src = url;
            bgVideo.play();
        } else {
            bgVideo.style.display = 'none';
            bgImage.style.display = 'block';
            bgImage.src = url;
        }
    }
});

// 3. Logika Ganti Foto di Dalam Panel Login
cardPhotoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        cardPhoto.src = url;
    }
});

// 4. Logika Desktop Mode (Fullscreen)
desktopBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        desktopBtn.innerText = "Exit Desktop Mode";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            desktopBtn.innerText = "Desktop Mode";
        }
    }
});

// 5. Simpan Pengaturan (LocalStorage)
// Catatan: LocalStorage hanya bisa menyimpan string kecil. 
// Untuk menyimpan gambar/video permanen biasanya butuh server.
// Di sini kita simpan status terahir.
saveBtn.addEventListener('click', () => {
    const settings = {
        bgType: bgVideo.style.display === 'block' ? 'video' : 'image',
        lastBg: bgVideo.style.display === 'block' ? bgVideo.src : bgImage.src,
        innerPhoto: cardPhoto.src
    };
    localStorage.setItem('login_settings', JSON.stringify(settings));
    alert('Pengaturan disimpan lokal! (Catatan: File blob hanya berlaku di sesi ini)');
});

// 6. Login Logic Simple
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sign Up Berhasil! (Ini hanya demo)');
});
