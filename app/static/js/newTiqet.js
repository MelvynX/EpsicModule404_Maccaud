$(document).ready(() => {
  categorySelectChange({ target: { value: $("#tiqet-category").val() } });
});

function categorySelectChange(event) {
  showItems(event.target.value, (items) => {
    console.log("sal");
    select = $("#select-item").html('<option value="null" selected> - </option>');
    items.map((item) => {
      select.append(`<option value="${item.id_item}">${item.name}</option>`);
    });
  });
}

function showItems(idCategory, callback) {
  $.ajax({
    url: `${API_URL}/items/${idCategory}`,
    method: "GET",
    dataType: "json",
    Accept: "application/json",
    success: (items) => {
      callback && callback(items);
    },
    error: (result) => {
      console.warn("Request status :", result.status);
      toggleSnackbar("Database has problem. Try an other time.", "danger");
    },
  });
}

function onCreate() {
  title = $("#tiqet-title").val();
  item = $("#select-item").val();

  if (title.length < 2 || title.length > 51) {
    toggleSnackbar("Title need to have between 3 and 50 caracteres", "danger");
    return;
  }

  if (item === "null") {
    toggleSnackbar("Need to have 1 selected item.", "danger");
    return;
  }

  $("#tiqet-form-new").submit();
}
