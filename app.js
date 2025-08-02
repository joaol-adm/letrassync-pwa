document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsElement = document.getElementById("lyrics");

  lyricsElement.textContent = "Buscando...";

  try {
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (!response.ok) throw new Error("Letra não encontrada");
    const data = await response.json();
    const lines = data.lyrics.split("\n");
    lyricsElement.innerHTML = "";
    for (let line of lines) {
      const lineEl = document.createElement("div");
      lineEl.textContent = line;
      lyricsElement.appendChild(lineEl);
    }
  } catch (err) {
    lyricsElement.textContent = "Erro ao buscar letra. Verifique o nome do artista/música.";
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}
