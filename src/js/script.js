$(function () {
  var includes = $("[data-include]");
  $.each(includes, function renderPageSection() {
    var file = $(this).data("include") + ".html";
    $(this).load(file);
  });
});

// document.addEventListener("scroll", () => {
//   var scroll_position = window.scrollY;
//   if (scroll_position > 50) {
//     header.style.background =
//       "linear-gradient(60deg, #434343 0%,   #000000 100%)";
//   } else {
//     header.style.background = "transparent";
//   }
// });
