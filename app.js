async function fetchLyrics() {
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsContainer = document.getElementById("lyrics");
  lyricsContainer.innerHTML = "⏳ Buscando...";

  try {
    const url = `https://lyrics.lewagon.ai/search?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data || !data.lyrics) throw new Error("Letra não encontrada");

    const lines = data.lyrics.split("\n");
    lyricsContainer.innerHTML = "";
    lines.forEach((line, i) => {
      const div = document.createElement("div");
      div.textContent = line;
      div.className = "line";
      lyricsContainer.appendChild(div);
    });
  } catch (error) {
    lyricsContainer.innerHTML = "❌ Erro ao buscar letra. Verifique nome artista/música.";
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
