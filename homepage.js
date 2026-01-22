// my key kHhk981FNHovRzyUCrIrWy82t2J8wPHFpCEmM6yvOxF9WK3XIM3agPgO
// https://api.pexels.com/v1/search?query=hamsters

// const DogUrl = "https://api.pexels.com/v1/search?query=dog"; alla fine niente per associarlo a più ricerche
// https://api.pexels.com/v1/search?query=tigers

const btnPrimary = document.getElementById("Load");
const btnSecondary = document.getElementById("Load2");

// Per non riscrivere la fetch uso parametro funzione nell event listener del bottone associato
btnPrimary.addEventListener("click", () => {
  getImgs("dog");
});

btnSecondary.addEventListener("click", () => {
  getImgs("tigers");
});

const getImgs = function (query) {
  const url = `https://api.pexels.com/v1/search?query=${query}`;
  fetch(url, {
    headers: {
      Authorization: "kHhk981FNHovRzyUCrIrWy82t2J8wPHFpCEmM6yvOxF9WK3XIM3agPgO",
    },
  })
    .then((res) => {
      console.log("RESPONSE", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("La response ha un problema");
      }
    })
    .then((data) => {
      console.log(" ANIMALI RICEVUTI:", data);

      //per cambiare immagini e non farlo esplodere se ottengo meno immagini della card o viceversa if
      // se no ciclo tutte ma vado a creare più card di quelle che avevo in partenza e non so se vanno bene
      const images = document.querySelectorAll(".card img");
      const NumToId = document.querySelectorAll(".card .text-muted");

      data.photos.forEach((photo, index) => {
        if (images[index]) {
          images[index].src = photo.src.medium;
          if (NumToId[index]) {
            NumToId[index].innerText = `ID: ${photo.id}`;
          }
        }
      });
      //metto qui cosi son sicura che la pagina ha finito di caricare
      const allHideButtons = document.querySelectorAll(".hideBtn");

      allHideButtons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          const cardColumn = event.target.closest(".col-md-4");
          if (cardColumn) {
            cardColumn.remove();
          }
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE NELLA FETCH", err);
    });
};

getImgs("whales");

//per search field utente stessa funzione

const searchBtn = document.getElementById("searchBtn");
const searchField = document.getElementById("searchField");

searchBtn.addEventListener("click", () => {
  const userQuery = searchField.value;

  if (userQuery !== "") {
    getImgs(userQuery);
  } else {
    alert("Scrivi qualcosa prima di cercare!");
  }
});
