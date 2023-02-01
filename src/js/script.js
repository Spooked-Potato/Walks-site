$(function () {
  var includes = $("[data-include]");
  $.each(includes, function renderPageSection() {
    var file = $(this).data("include") + ".html";
    $(this).load(file);
  });
});
