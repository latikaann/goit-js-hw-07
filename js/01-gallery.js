import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
//
//
const gallery = document.querySelector(".gallery");
const cardsMarkup = createCard(galleryItems);
// console.log(createCard(galleryItems));

gallery.insertAdjacentHTML("beforeend", cardsMarkup);

gallery.addEventListener("click", onCardClick);

function createCard(galleryItems) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
  </a>
</div>
`;
    })
    .join("");
  return markup;
}

function onCardClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(`
      <img src="${event.target.dataset.source}">
  `);

  instance.show();

  document.body.addEventListener("keydown", onCloseEsc);

  function onCloseEsc(event) {
    console.log(event.code);
    if (event.code === "Escape") {
      document.body.removeEventListener("keydown", onCloseEsc);
      instance.close();
    }
  }
}
