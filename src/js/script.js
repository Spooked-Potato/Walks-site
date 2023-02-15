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
    const url = element.getAttribute("include") + ".html";
    const req = await fecth(url);
    const res = await req.text();
    element.innerHTML = res;

    i++;
    if (i >= totalElementCount) {
      showNav();
    }
  });
};

// document.addEventListener("scroll", () => {
//   var scroll_position = window.scrollY;
//   if (scroll_position > 50) {
//     header.style.background =
//       "linear-gradient(60deg, #434343 0%,   #000000 100%)";
//   } else {
//     header.style.background = "transparent";
//   }
// });
