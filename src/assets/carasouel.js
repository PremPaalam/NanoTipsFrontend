const carousel = document.querySelectorAll("[class*=carousel-container]");


carousel.forEach((carouselItem) => {
  const prev = document.querySelector(
    ".prev" +
      carouselItem.className
        .split(" ")
        .find((item) => item.match("carousel-container"))
        .split("carousel-container")[1]
  );

  const next = document.querySelector(
    ".next" +
      carouselItem.className
        .split(" ")
        .find((item) => item.match("carousel-container"))
        .split("carousel-container")[1]
  );

  const track = document.querySelector(
    ".track" +
      carouselItem.className
        .split(" ")
        .find((item) => item.match("carousel-container"))
        .split("carousel-container")[1]
  );

  let width = carouselItem.offsetWidth;
  let index = 0;
  window.addEventListener("resize", function () {
    width = carouselItem.offsetWidth;
  });
  next.addEventListener("click", function (e) {
    e.preventDefault();
    index = index + 1;
    prev.classList.add("show");
    track.style.transform = "translateX(" + index * -width + "px)";
    if (track.offsetWidth - index * width < index * width) {
      next.classList.add("hide");
    }
  });
  prev.addEventListener("click", function () {
    index = index - 1;
    next.classList.remove("hide");
    if (index === 0) {
      prev.classList.remove("show");
    }
    track.style.transform = "translateX(" + index * -width + "px)";
  });
});
