// Minimal JS: password gate + random music + gallery + notes + countdown

document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = [
        { src: '/gallery/1.png', caption: '1 / 13' },
        { src: '/gallery/2.png', caption: '2 / 13' },
        { src: '/gallery/3.png', caption: '3 / 13' },
        { src: '/gallery/4.png', caption: '4 / 13' },
        { src: '/gallery/5.png', caption: '5 / 13' },
        { src: '/gallery/6.png', caption: '6 / 13' },
        { src: '/gallery/7.png', caption: '7 / 13' },
        { src: '/gallery/8.png', caption: '8 / 13' },
        { src: '/gallery/im11.jpg', caption: '9 / 13' },
        { src: '/gallery/im12.jpg', caption: '10 / 13' },
        { src: '/gallery/im13.jpg', caption: '11 / 13' },
        { src: '/gallery/im14.jpg', caption: '12 / 13' },
        { src: '/gallery/im15.jpg', caption: '13 / 13' },
    ];

    const musicPlaylist = [
        "/music/SpotiDownloader.com - Soft Notes, Strong Feelings - Lloyd Frontiny.mp3",
        "/music/SpotiDownloader.com - The Color Violet - Tory Lanez.mp3"
    ];

    // Password gate (homepage)
    const PASSWORD = 'coucou';
    const passwordGate = document.getElementById('passwordGate');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordError = document.getElementById('passwordError');

    function setUnlocked(isUnlocked) {
        document.body.classList.toggle('locked', !isUnlocked);
        document.body.classList.toggle('unlocked', isUnlocked);
        if (isUnlocked) {
            if (passwordError) passwordError.textContent = '';
            if (passwordInput) passwordInput.value = '';
            initAfterUnlock();
        } else if (passwordInput) {
            passwordInput.focus?.();
        }
    }

    function tryUnlock() {
        const value = (passwordInput?.value || '').trim().toLowerCase();
        if (value === PASSWORD) {
            setUnlocked(true);
        } else if (passwordError && passwordInput) {
            passwordError.textContent = 'Mot de passe incorrect.';
            passwordInput.focus?.();
            passwordInput.select?.();
        }
    }

    // Default to locked if gate exists
    if (passwordGate && passwordInput && passwordSubmit && passwordError) {
        setUnlocked(false);
        passwordSubmit.addEventListener('click', tryUnlock);
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') tryUnlock();
        });
    }
// heree
    const bgMusic = document.getElementById('bgMusic');
let currentTrackIndex = 0;

function playCurrentTrack() {
    if (!bgMusic) return;

    bgMusic.src = musicPlaylist[currentTrackIndex];
    bgMusic.volume = 0.55;
    bgMusic.load();

    bgMusic.play().catch(err => {
        console.log('Autoplay blocked:', err);
    });
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicPlaylist.length;
    playCurrentTrack();
}

function startRandomMusic() {
    currentTrackIndex = 0;
    playCurrentTrack();
}

// 🔥 Attach ONCE
if (bgMusic) {
    bgMusic.addEventListener('ended', playNextTrack);
}


    function startRandomMusic() {
        currentTrackIndex = 0;
        playNextTrack();
    }

    function initAfterUnlock() {
        initNav();
        initGallery();
        initNotes();
        initCountdown();
        initSurprise();
        startRandomMusic();
    }

    function initNav() {
        const buttons = Array.from(document.querySelectorAll('.nav-btn[data-view]'));
        const views = Array.from(document.querySelectorAll('.view'));
        if (buttons.length === 0 || views.length === 0) return;

        function setView(name) {
            for (const btn of buttons) {
                const active = btn.dataset.view === name;
                btn.classList.toggle('is-active', active);
                btn.setAttribute('aria-selected', active ? 'true' : 'false');
            }
            for (const v of views) {
                v.classList.toggle('is-active', v.id === `view-${name}`);
            }
        }

        buttons.forEach((btn) => {
            btn.addEventListener('click', () => setView(btn.dataset.view));
        });

        setView('gallery');
    }

    function initGallery() {
        const img = document.getElementById('galleryImage');
        const caption = document.getElementById('galleryCaption');
        const prev = document.getElementById('galleryPrev');
        const next = document.getElementById('galleryNext');
        if (!img || !caption || !prev || !next) return;

        let index = 0;

        function render() {
            const item = galleryImages[index];
            img.classList.add('is-fading');
            window.setTimeout(() => {
                img.src = item.src;
                caption.textContent = item.caption;
                img.classList.remove('is-fading');
            }, 160);
        }

        function go(delta) {
            index = (index + delta + galleryImages.length) % galleryImages.length;
            render();
        }

        prev.addEventListener('click', () => go(-1));
        next.addEventListener('click', () => go(1));

        // keyboard support when view is active
        document.addEventListener('keydown', (e) => {
            const galleryView = document.getElementById('view-gallery');
            if (!galleryView?.classList.contains('is-active')) return;
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'ArrowRight') go(1);
        });

        render();
    }

    function initNotes() {
        const historyEl = document.getElementById('notesHistory');
        const form = document.getElementById('notesForm');
        const input = document.getElementById('notesInput');
        const sender = document.getElementById('notesSender');
        const clearBtn = document.getElementById('notesClear');
        if (!historyEl || !form || !input || !sender || !clearBtn) return;

        const STORAGE_KEY = 'psg-notes-v1';
        let items = [];

        function loadMessages() {
            try {
                const raw = window.localStorage.getItem(STORAGE_KEY);
                if (!raw) return [];
                const parsed = JSON.parse(raw);
                if (!Array.isArray(parsed)) return [];
                return parsed;
            } catch (err) {
                console.error('Error loading messages from localStorage:', err);
                return [];
            }
        }

        function saveMessages(messages) {
            try {
                window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            } catch (err) {
                console.error('Error saving messages to localStorage:', err);
            }
        }

        function formatTime(isoDate) {
            const d = new Date(isoDate);
            return d.toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function render(messages) {
            historyEl.innerHTML = '';
            for (const m of messages) {
                const wrap = document.createElement('div');
                wrap.className = `msg ${m.sender === 'coumba' ? 'her' : 'me'}`;

                const p = document.createElement('p');
                p.className = 'msg-text';
                p.textContent = m.text;

                const meta = document.createElement('div');
                meta.className = 'msg-meta';
                meta.textContent = `${m.sender === 'coumba' ? 'Coumba' : 'Le C'} · ${formatTime(m.created_at)}`;

                wrap.appendChild(p);
                wrap.appendChild(meta);
                historyEl.appendChild(wrap);
            }
            historyEl.scrollTop = historyEl.scrollHeight;
        }
        items = loadMessages();
        render(items);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = (input.value || '').trim();
            if (!text) return;

            input.disabled = true;

            const message = {
                id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
                sender: sender.value === 'coumba' ? 'coumba' : 'Le C',
                text: text,
                created_at: new Date().toISOString()
            };

            items.push(message);
            saveMessages(items);
            render(items);
            input.value = '';
            input.focus();
            input.disabled = false;
        });

        clearBtn.addEventListener('click', () => {
            if (!confirm('Êtes-vous sûr de vouloir effacer tout l\'historique?')) return;

            items = [];
            saveMessages(items);
            render(items);
        });
    }

    function initSurprise() {
        const button = document.getElementById('surpriseButton');
        const overlay = document.getElementById('surpriseOverlay');
        const surpriseImg = document.getElementById('surpriseImage');
        if (!button || !overlay || !surpriseImg) return;

        let isPlaying = false;

        function playButSequence() {
            if (isPlaying) return;
            isPlaying = true;

            const sequence = [
                '/gallery/but1.jpg',
                '/gallery/but2.webp',
                '/gallery/but3.jpeg'
            ];

            let i = 0;

            function showNext() {
                const item = sequence[i];
                if (!item) return;
                surpriseImg.src = item;
                i += 1;
                if (i < sequence.length) {
                    window.setTimeout(showNext, 2000);
                } else {
                    window.setTimeout(() => {
                        isPlaying = false;
                        overlay.classList.remove('is-visible');
                        overlay.setAttribute('aria-hidden', 'true');
                    }, 2000); // keep last image for 2s
                }
            }

            overlay.classList.add('is-visible');
            overlay.setAttribute('aria-hidden', 'false');
            showNext();
        }

        button.addEventListener('click', playButSequence);
        overlay.addEventListener('click', () => {
            if (!isPlaying) {
                overlay.classList.remove('is-visible');
                overlay.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function initCountdown() {
        const elDays = document.getElementById('cdDays');
        const elHours = document.getElementById('cdHours');
        const elMinutes = document.getElementById('cdMinutes');
        const elSeconds = document.getElementById('cdSeconds');
        const elMeta = document.getElementById('cdMeta');
        if (!elDays || !elHours || !elMinutes || !elSeconds || !elMeta) return;

        const birthMonth = 8; // September (0-based)
        const birthDay = 19;
        const birthYear = 2005;

        function pad2(n) {
            return String(n).padStart(2, '0');
        }

        function nextBirthday(from) {
            const year = from.getFullYear();
            const thisYear = new Date(year, birthMonth, birthDay, 0, 0, 0, 0);
            if (from <= thisYear) return thisYear;
            return new Date(year + 1, birthMonth, birthDay, 0, 0, 0, 0);
        }

        function currentAge(onDate) {
            let age = onDate.getFullYear() - birthYear;
            const bdThisYear = new Date(onDate.getFullYear(), birthMonth, birthDay);
            if (onDate < bdThisYear) age -= 1;
            return age;
        }

        function tick() {
            const now = new Date();
            const target = nextBirthday(now);
            const diffMs = Math.max(0, target.getTime() - now.getTime());
            const totalSeconds = Math.floor(diffMs / 1000);
            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            elDays.textContent = String(days);
            elHours.textContent = pad2(hours);
            elMinutes.textContent = pad2(minutes);
            elSeconds.textContent = pad2(seconds);

            // Age that she will turn on the target birthday
            const turning = target.getFullYear() - birthYear;
            elMeta.textContent = `Coumba aura ${turning} ans le ${target.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}.`;
        }

        tick();
        window.setInterval(tick, 1000);
    }

    // Simple fade-in on load
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});