document.addEventListener("DOMContentLoaded", function () {
    // Elementos del reproductor
    const audio = document.getElementById("audio");
    const playButton = document.getElementById("play");
    const randomButton = document.querySelector(".RandomIcon").parentElement;
    const lastButton = document.querySelector(".LastIcon").parentElement;
    const playPauseButton = document.querySelector(".PlayIcon").parentElement;
    const nextButton = document.querySelector(".NextIcon").parentElement;
    const loopButton = document.querySelector(".LoopIcon").parentElement;
    const progress = document.getElementById("progress");
    const songList = document.getElementById("songList");

    // Lista de canciones
    const songs = [
        "placeholder.mp3",
        "La camisa negra.mp3",
        "Kamaz.mp3"
    ];

    let currentSongIndex = 0; // Índice de la canción actual

    // Función para cargar una canción
    function loadSong(index) {
        currentSongIndex = index;
        audio.src = `../SongData/Audio/${songs[currentSongIndex]}`;
        audio.play();
        playButton.textContent = "Pause";
    }

    // Función para alternar reproducción/pausa
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = "Pause";
        } else {
            audio.pause();
            playButton.textContent = "Play";
        }
    }

    // Función para cambiar la canción (anterior/siguiente)
    function changeSong(step) {
        currentSongIndex = (currentSongIndex + step + songs.length) % songs.length; // Control cíclico
        loadSong(currentSongIndex);
    }

    // Función para activar/desactivar bucle
    function toggleLoop() {
        audio.loop = !audio.loop;
        alert(`Bucle ${audio.loop ? "activado" : "desactivado"}`);
    }

    // Función para seleccionar canción aleatoria
    function playRandomSong() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentSongIndex);
        loadSong(randomIndex);
    }

    // Evento: Botón de reproducción
    playButton.addEventListener("click", togglePlayPause);

    // Evento: Botón de canción anterior
    lastButton.addEventListener("click", () => changeSong(-1));

    // Evento: Botón de reproducción/pausa desde el ícono
    playPauseButton.addEventListener("click", togglePlayPause);

    // Evento: Botón de siguiente canción
    nextButton.addEventListener("click", () => changeSong(1));

    // Evento: Botón de bucle
    loopButton.addEventListener("click", toggleLoop);

    // Evento: Botón de canción aleatoria
    randomButton.addEventListener("click", playRandomSong);

    // Evento: Actualizar progreso
    audio.addEventListener("timeupdate", function () {
        const progressValue = (audio.currentTime / audio.duration) * 100;
        progress.value = progressValue || 0; // Evita errores cuando el audio no se ha cargado completamente
    });

    // Evento: Cambiar posición con la barra de progreso
    progress.addEventListener("input", function () {
        const newTime = (progress.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });

    // Carga inicial
    loadSong(currentSongIndex);
});
