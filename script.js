const postsData = {
    'post-1': {
        title: 'Anuncio Gira 2026',
        date: '25 FEB 2026',
        //image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        content: `
            <p>Nos preparamos para nuevos destinos. ¡Prepárense para la brutalidad y la sinfonía!</p>
            <p>La gira abarcará más de 15 ciudades. Hemos preparado un setlist que cubre desde nuestros primeros demos hasta tocar el álbum completo "Tequendama".</p>
            <p>Llevaremos nuestra música melódica a través de las montañas de Colombia. informacion de la gira en nuestra página oficial.</p>
        `
    },
    'post-2': {
        title: 'Grabación del Nuevo Videoclip',
        date: '10 FEB 2026',
        //image: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        content: `
            <p>Detrás de cámaras de la grabación de nuestro último sencillo épico "El Mohán".</p>
            <p>Este video captura la esencia misma de SADIGUA, usando pirotecnia real, orquestación en vivo y un escenógrafo de primer nivel. Grabado en las ruinas industriales de las afueras de la ciudad, el video será una obra de arte visual.</p>
        `
    },
    'post-3': {
        title: 'Entrevista Exclusiva en Metal Magazine',
        date: '22 ENE 2026',
        //image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
        content: `
            <p>Nuestra charla profunda sobre el proceso creativo del último álbum y las raíces del metal melódico.</p>
            <p>"No intentamos hacer ruido, intentamos contar una historia en cada acorde", mencionó el vocalista en la revista número uno de música pesada de este mes. Lee cómo componemos, qué guitarras usamos y hacia dónde va nuestra música.</p>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Internal Details Modal (Posts) ---
    const detailsModal = document.getElementById('details-modal');
    window.openDetailsModal = function (postId) {
        const post = postsData[postId];
        if (post && detailsModal) {
            document.getElementById('dynamic-post-image').style.backgroundImage = `url('${post.image}')`;
            document.getElementById('dynamic-post-title').textContent = post.title;
            document.getElementById('dynamic-post-date').textContent = post.date;
            document.getElementById('dynamic-post-content').innerHTML = post.content;

            detailsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeDetailsModal = function () {
        if (detailsModal) {
            detailsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Close Modals when clicking outside the box
    document.querySelectorAll('.content-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // --- Lightbox Modal (Gallery) ---
    const lightboxModal = document.getElementById('lightbox-modal');
    window.openLightbox = function (imageSrc, captionText) {
        if (lightboxModal) {
            document.getElementById('lightbox-image').src = imageSrc;
            document.getElementById('lightbox-caption').textContent = captionText;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeLightbox = function () {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }


    // --- Ambient Audio / Random 10s Previews Control ---
    const ambientAudio = document.getElementById('ambient-audio');
    const btnAudio = document.getElementById('btn-audio');
    const audioIcon = document.getElementById('audio-icon');
    let isPlaying = false;

    // The Discography Tracks for 10s Previews (Tequendama + Tales from the white man)
    const playlist = [
        "SADIGUA - TEQUENDAMA mp3/ABISMO DE BACATA - SADIGUA.mp3",
        "SADIGUA - TEQUENDAMA mp3/EL MOHAN - SADIGUA.mp3",
        "SADIGUA - TEQUENDAMA mp3/EL SACRIFICIO DE LOS MOHA - SADIGUA.mp3",
        "SADIGUA - TEQUENDAMA mp3/HUITACA - SADIGUA.mp3",
        "SADIGUA - TEQUENDAMA mp3/INTRO (Chyquy).mp3",
        "SADIGUA - TEQUENDAMA mp3/MONTAÑA DE JUAICA - SADIGUA.mp3",
        "SADIGUA - TEQUENDAMA mp3/TEQUENDAMA - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/1. APOCALIPSIS - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/2. OUR KINGDOM - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/3. EL ANGEL CAIDO - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/4. THE PRINCIPLE TO BE A KING - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/5. KARMAS DARK SIDE - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/6. THE PAGAN RESTLESS SOUL - SADIGUA.mp3",
        "SADIGUA - TALES FROM THE WHITE MAN mp3/7. ZOOLOGICO ESPACIAL - SADIGUA.mp3"
    ];

    // Function to pick and play a random track
    function playRandomTrack() {
        // Pick a random index
        const randomIndex = Math.floor(Math.random() * playlist.length);
        const selectedTrack = playlist[randomIndex];
        console.log("Playing preview:", selectedTrack);

        ambientAudio.src = selectedTrack;
        ambientAudio.volume = 0.5; // Half volume for ambient vibes
        // Start from beginning or a specific point if desired, here we start from 0
        ambientAudio.currentTime = 0;

        let playPromise = ambientAudio.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                audioIcon.classList.remove('fa-volume-xmark');
                audioIcon.classList.add('fa-volume-high');
                btnAudio.classList.add('active');
                isPlaying = true;
            })
                .catch(error => {
                    console.log("Auto-play was prevented by the browser. Waiting for user interaction.");
                });
        }
    }

    // 60-Second Snippet Logic
    ambientAudio.addEventListener('timeupdate', () => {
        // Enforce the 90-second preview limit
        if (ambientAudio.currentTime >= 90) {
            console.log("90 seconds reached. Skipping to next preview.");
            playRandomTrack();
        }
    });

    // Automatically trigger next random track when the current one ends just in case it's shorter than 30s
    ambientAudio.addEventListener('ended', () => {
        console.log("Track ended prematurely. Loading next preview.");
        playRandomTrack();
    });

    // Manual Toggle logic for the navbar button
    btnAudio.addEventListener('click', () => {
        if (isPlaying) {
            ambientAudio.pause();
            audioIcon.classList.remove('fa-volume-high');
            audioIcon.classList.add('fa-volume-xmark');
            btnAudio.classList.remove('active');
            isPlaying = falset;
        } else {
            // If the audio source is empty (first time play), pick a random track
            if (!ambientAudio.getAttribute('src')) {
                playRandomTrack();
            } else {
                // Keep playing the same track if already loaded
                ambientAudio.play();
                audioIcon.classList.remove('fa-volume-xmark');
                audioIcon.classList.add('fa-volume-high');
                btnAudio.classList.add('active');
                isPlaying = true;
            }
        }
    });


    // --- Payment Modal Logic ---
    const paymentModal = document.getElementById('payment-modal');
    let currentDownloadAlbum = "";

    window.openPaymentModal = function (albumName, price) {
        currentDownloadAlbum = albumName;
        // Inject dynamic album info into modal text
        const albumNameEl = document.getElementById('modal-album-name');
        if (albumNameEl) albumNameEl.textContent = albumName;

        const priceEl = document.getElementById('btn-pay-price');
        if (priceEl) priceEl.textContent = price;

        // Update WhatsApp Link dynamically
        const whatsappBtn = document.getElementById('btn-whatsapp-proof');
        if (whatsappBtn) {
            const phoneNumber = "573175747095"; // Reemplazar con el número real de Nequi/WhatsApp
            const message = `Hola, quiero comprar el álbum "${albumName}" por Nequi/PSE. Adjunto mi comprobante de pago por el valor de $${price} USD.`;
            const encodedMessage = encodeURIComponent(message);
            whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        }

        if (paymentModal) paymentModal.classList.add('active');
    };

    window.closePaymentModal = function () {
        if (paymentModal) paymentModal.classList.remove('active');
    };

    if (paymentModal) {
        paymentModal.addEventListener('click', (e) => {
            if (e.target === paymentModal) {
                closePaymentModal();
            }
        });
    }

});
