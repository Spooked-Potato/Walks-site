$(function () {
  var includes = $("[data-include]");
  $.each(includes, function renderPageSection() {
    var file = $(this).data("include") + ".html";
    $(this).load(file);
  });
});

function showNav() {
  const buttonNav = document.getElementById("navshowbutton");
  buttonNav.addEventListener("click", showButton);

  function showButton() {
    alert("Show");
    const navShow = document.getElementById("navmobile");

    if (navShow.style.display === "none") {
      navShow.style.display = "block";
    } else {
      navShow.style.display = "none";
    }
  }
}

showNav();

// document.addEventListener("scroll", () => {
//   var scroll_position = window.scrollY;
//   if (scroll_position > 50) {
//     header.style.background =
//       "linear-gradient(60deg, #434343 0%,   #000000 100%)";
//   } else {
//     header.style.background = "transparent";
//   }
// });
