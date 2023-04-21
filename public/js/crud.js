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
  setUpAddWalk();
  setUpDeletedWalk();
  setUpEditWalk();
}

function setUpAddWalk() {
  const submitBtn = document.querySelector("#addNewBtn");
  submitBtn.onclick = async function (e) {
    e.preventDefault();
    const form = document.querySelector("#addNewWalk");

    const title = form.querySelector("#walk_title").value;
    const description = form.querySelector("#description").value;
    const files = form.querySelector("#image_url").files;
    const date = form.querySelector("#walk_date").value;
    if (
      title.length === 0 ||
      description.length === 0 ||
      files.length === 0 ||
      date.length === 0
    ) {
      alert("Form not completed");
      return;
    }

    const output = new FormData();
    output.append("walk_title", title);
    output.append("description", description);
    output.append("file", files[0]);
    output.append("walk_date", date);

    const request = await fetch("admin/newWalk", {
      method: "POST",
      body: output,
    });
    const result = await request.json();

    if (result.success === 1) {
      window.location.reload();
    }
  };
}

function setUpDeletedWalk() {
  const walkItems = document.querySelectorAll(".walkItem");
  const form = document.querySelector("#deleteWalk");

  walkItems.forEach((item, index) => {
    const id = item.id.replace("walkItem-", "");
    const deleteButton = item.querySelector(".delete");
    deleteButton.onclick = () => {
      form.querySelector("#itemId").value = parseInt(id);
    };
  });

  const submitBtn = document.querySelector("#deletebtn");
  submitBtn.onclick = async function (e) {
    e.preventDefault();
    const output = {
      id: form.querySelector("#itemId").value,
    };

    const request = await fetch("admin/walkDelete", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(output),
    });
    const result = await request.json();

    if (result.success === 1) {
      window.location.reload();
    }
  };
}

function setUpEditWalk() {
  const walkItems = document.querySelectorAll(".walkItem");
  const walkData = [];

  walkItems.forEach((item, index) => {
    const title = item.querySelector(".walkItemName").innerText;
    const description = item.querySelector(".walkItemDescription").innerText;
    const date = item.querySelector(".walkItemDate").innerText;
    const image = item.querySelector(".walkItemImage").innerText;
    const id = item.id.replace("walkItem-", "");

    walkData.push({
      id: parseInt(id),
      walk_title: title,
      description: description,
      walk_date: date,
      image_url: image,
    });

    const editButton = item.querySelector(".edit");

    editButton.onclick = () => {
      document.querySelector("#itemId").value = walkData[index].id;

      document.querySelector("#editTitleInput").value =
        walkData[index].walk_title;
      document.querySelector("#editDescriptionInput").value =
        walkData[index].description;
      document.querySelector("#editDateInput").value =
        walkData[index].walk_date;
      document.querySelector("#editImageInput").value =
        walkData[index].image_url;
    };
  });

  const submitBtn = document.querySelector("#editbtn");
  submitBtn.onclick = async function (e) {
    e.preventDefault();
    const form = document.querySelector("#editWalk");

    const title = form.querySelector("#editTitleInput").value;
    const description = form.querySelector("#editDescriptionInput").value;
    const files = form.querySelector("#editImageInput").files;
    const date = form.querySelector("#editDateInput").value;
    if (title.length === 0 || description.length === 0 || date.length === 0) {
      alert("Form not completed");
      return;
    }

    const output = new FormData();
    output.append("id", form.querySelector("#itemId").value);
    output.append("walk_title", title);
    output.append("description", description);
    output.append("file", files[0]);
    output.append("walk_date", date);

    const request = await fetch("admin/updatePost", {
      method: "POST",
      body: output,
    });
    const result = await request.json();

    if (result.success === 1) {
      window.location.reload();
    }
  };
}
