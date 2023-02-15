// $(function () {
//   var includes = $("[data-include]");
//   let totalElementCount = includes.length;
//   let i = 0;

//   $.each(includes, function renderPageSection() {
//     var file = $(this).data("include") + ".html";
//     $(this).load(file, (result) => {
//       console.log(result);
//       i++;
//       if (i >= totalElementCount) {
//         showNav();
//       }
//     });
//   });
// });

function scrollNav() {
  navScroll = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    const scroll_position = window.scrollY;

    let style = "";
    scroll_position > 400 ? (style = "#1e1e1e") : (style = "transparent");
    navScroll.style.backgroundColor = style;
  });
}

function showNav() {
  const buttonNav = document.getElementById("navshowbutton");
  buttonNav.addEventListener("click", showButton);

  let isOpen = false;

  function showButton() {
    const navShow = document.getElementById("navmobile");
    isOpen = !isOpen;

    if (isOpen) {
      navShow.style.display = "block";
    } else {
      navShow.style.display = "none";
    }
  }
}

window.onload = () => {
  const elements = document.querySelectorAll("[data-include]");
  let totalElementCount = elements.length;
  let i = 0;
  elements.forEach(async (element) => {
    const url = element.getAttribute("data-include") + ".html";
    const req = await fetch(url);
    const res = await req.text();
    element.innerHTML = res;

    i++;
    if (i >= totalElementCount) {
      scrollNav();
      showNav();
    }
  });
};
