const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f3bd5bffe9msh89fa1d8acb6185fp19ab4fjsn3f452a2d6f89",
    "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
  },
};
const URLS = [
  "https://movie-database-alternative.p.rapidapi.com/?r=json&i=tt0088763",
  "https://movie-database-alternative.p.rapidapi.com/?r=json&i=tt6751668",
  "https://movie-database-alternative.p.rapidapi.com/?r=json&i=tt1663202",
];
async function fetchData(url) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

(async () => {
  const movies = [
    await fetchData(URLS[0]),
    await fetchData(URLS[1]),
    await fetchData(URLS[2]),
  ];
  try {
    let view = `
    ${movies
      .map(
        (movie) =>
          `
        <div class="group relative h-100 rounded-md">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${movie.Poster}" alt="${
            movie.Title + "-img"
          }" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-lg font-bold text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${movie.Title}
                </h3>
            </div>
        </div>
        `
      )
      .join("")}
        `;
    content.innerHTML = view;
  } catch (error) {
    console.error(error);
  }
})();
