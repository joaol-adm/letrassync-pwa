document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const artist = document.getElementById("artist").value.trim();
  const title = document.getElementById("title").value.trim();
  const lyricsElement = document.getElementById("lyrics");

  lyricsElement.textContent = "Buscando...";

  try {
    const apikey = "53b176e6c6c90e1f4fccc3a579736e03"; // chave demo pública da Vagalume
    const url = `https://api.vagalume.com.br/search.php?art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(title)}&apikey=${apikey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.mus || data.mus.length === 0) {
      throw new Error("Letra não encontrada");
    }

    const letra = data.mus[0].text;
    const lines = letra.split("\n");
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
