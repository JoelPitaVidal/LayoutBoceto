document.addEventListener("DOMContentLoaded", function() {
    // Obtiene el elemento de audio por su ID
    const audio = document.getElementById("audio");
    // Obtiene el botón de reproducción/pausa por su ID
    const playButton = document.getElementById("play");
    // Obtiene el elemento de progreso por su ID
    const progress = document.getElementById("progress");
    // Obtiene el contenedor de la lista de canciones por su ID
    const songList = document.getElementById("songList");

    // Lista de canciones en la carpeta SongData/Audio
    const songs = [
        "placeholder.mp3",
        "La camisa negra.mp3",
        "Kamaz.mp3"
    ];

    // Carga la lista de canciones en el contenedor
    songs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.textContent = song;
        songItem.addEventListener("click", function() {
            // Cambia la fuente del audio a la canción seleccionada
            audio.src = `../SongData/Audio/${song}`;
            audio.play();
            playButton.textContent = "Pause";
        });
        songList.appendChild(songItem);
    });

    // Añade un evento de clic al botón de reproducción/pausa
    playButton.addEventListener("click", function() {
        // Si el audio está pausado, lo reproduce y cambia el texto del botón a "Pause"
        if (audio.paused) {
            audio.play();
            playButton.textContent = "Pause";
        } else {
            // Si el audio está reproduciéndose, lo pausa y cambia el texto del botón a "Play"
            audio.pause();
            playButton.textContent = "Play";
        }
    });

    // Añade un evento de actualización de tiempo al elemento de audio
    audio.addEventListener("timeupdate", function() {
        // Calcula el valor del progreso como un porcentaje del tiempo actual del audio sobre la duración total
        const progressValue = (audio.currentTime / audio.duration) * 100;
        // Actualiza el valor del elemento de progreso
        progress.value = progressValue;
    });

    // Añade un evento de entrada al elemento de progreso
    progress.addEventListener("input", function() {
        // Calcula el nuevo tiempo del audio basado en el valor del progreso
        const newTime = (progress.value / 100) * audio.duration;
        // Actualiza el tiempo actual del audio
        audio.currentTime = newTime;
    });
});