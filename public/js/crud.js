$(document).ready(function () {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });
  init();
});

function init() {
  const submitBtn = document.querySelector("#addNewBtn");
  submitBtn.onclick = async function (e) {
    e.preventDefault();
    const form = document.querySelector("#addNewWalk");
    const output = {
      walk_title: form.querySelector("#walk_title").value,
      description: form.querySelector("#description").value,
      image_url: form.querySelector("#image_url").value,
      walk_date: form.querySelector("#walk_date").value,
    };
    const request = await fetch("admin/newWalk", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(output),
    });
    const result = await request.json();
    console.log(result);

    if (result.success === 1) {
      window.location.reload();
    }
  };
}
