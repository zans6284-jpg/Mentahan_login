const rgbPicker = document.getElementById('rgbPicker');
const panelFileInput = document.getElementById('panelFileInput');
const panelImage = document.getElementById('panelImage');

// 1. Ubah Warna UI (RGB)
rgbPicker.addEventListener('input', (e) => {
    const color = e.target.target.value; // Dapatkan warna dari picker
    document.documentElement.style.setProperty('--main-color', color);
});

// 2. Ubah Foto Panel Login
panelFileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            panelImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 3. Simpan Semua (Background, Foto Panel, Warna)
function saveAll() {
    const bgMedia = document.getElementById('bg-container').firstChild;
    const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
    
    if (bgMedia) localStorage.setItem('customBG', bgMedia.src);
    localStorage.setItem('panelImg', panelImage.src);
    localStorage.setItem('themeColor', currentColor.trim());
    
    alert('Semua pengaturan berhasil disimpan!');
}

// 4. Muat Pengaturan Saat Refresh
window.onload = () => {
    const savedColor = localStorage.getItem('themeColor');
    const savedPanel = localStorage.getItem('panelImg');
    const savedBG = localStorage.getItem('customBG');

    if (savedColor) {
        document.documentElement.style.setProperty('--main-color', savedColor);
        rgbPicker.value = savedColor;
    }
    if (savedPanel) panelImage.src = savedPanel;
    if (savedBG) {
        // Logika muat background utama tetap sama seperti sebelumnya
        document.getElementById('bg-container').innerHTML = `<img src="${savedBG}">`;
    }
};

// Fungsi pendukung lainnya (Lampu, Desktop Mode)
document.getElementById('lampRope').onclick = () => document.body.classList.toggle('light-on');

function toggleDesktop() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
}
