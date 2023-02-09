$(function () {
  var includes = $("[data-include]");
  $.each(includes, function renderPageSection() {
    var file = $(this).data("include") + ".html";
    $(this).load(file);
  });
});

function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", () => {
    alert("Message was send successfully");
  });
}
initContactForm();

function initThankYou() {
  goBack = document.getElementById("btn");

  if (!goBack) return;

  goBack.addEventListener("click", test);
  function test() {
    window.location.href = "index.html";
  }
}
initThankYou();
