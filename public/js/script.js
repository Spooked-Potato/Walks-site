// function scrollNav() {
//   navScroll = document.getElementById("navbar");
//   window.addEventListener("scroll", () => {
//     const scroll_position = window.scrollY;

//     let style = "";
//     scroll_position > 400 ? (style = "#1e1e1e") : (style = "transparent");
//     navScroll.style.backgroundColor = style;
//   });
// }

function showNav() {
  const buttonNav = document.querySelector("#menu-toggle");
  buttonNav.addEventListener("click", showButton);

  let isOpen = false;

  function showButton() {
    const navShow = document.querySelector("#nav-list-container");
    isOpen = !isOpen;

    if (isOpen) {
      navShow.style.display = "block";
    } else {
      navShow.style.display = "none";
    }
  }
}

window.onload = () => {
  showNav();
  scrollNav();
};
