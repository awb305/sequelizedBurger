const createBurger = (id, burger_name) => {

  let row = $("<div>");
  row.addClass("row row-" + id);
  let col1 = $("<div>");
  col1.addClass("col-sm-4");
  col1.attr("id", "burger-item-" + id);
  let col2 = $("<div>");
  col2.addClass("col-sm-4");
  col2.attr("id", "button-item-" + id);
  let col3 = $("<div>");
  col3.addClass("col-sm-4");
  col3.attr("id", "devoured-item-" + id);
  row.append(col1, col2, col3);

  let burgerSection = $("#burger-section");
  burgerSection.append(row);

  let item = $("<p>");
  item.attr("data", id);
  item.text(burger_name);
  $("#burger-item-" + id).append(item);

  let button = $("<button>");
  button.attr("data", id);
  button.addClass("btn btn-primary btn-devour");
  button.text("Finished!");
  $("#button-item-" + id).append(button);

  let clearButton = $("<button>");
  clearButton.attr("data", id);
  clearButton.addClass("btn btn-primary btn-clear");
  clearButton.text("Clear");
  $("#button-item-" + id).append(clearButton);

}

const devour = (id) => {
  let devouredItem = $("<p>");
  devouredItem.attr("id", "devoured-item-" + id);
  let burgerName = $("p[data=" + id + "]").text();
  devouredItem.attr("id", "devoured-item-" + id);
  devouredItem.text(burgerName);
  let col = $("#devoured-item-" + id);
  col.append(devouredItem);

  let hideName = $("p[data=" + id + "]");
  hideName.addClass("hidden");
  let hideButton = $("button[data=" + id + "]");
  hideButton.addClass("hidden");

}

const devoured = (id, burgerName) => {
  let row = $("<div>");
  row.addClass("row row-" + id);
  let col1 = $("<div>");
  col1.addClass("col-sm-4");
  col1.attr("id", "burger-item-" + id);
  let col2 = $("<div>");
  col2.addClass("col-sm-4");
  col2.attr("id", "button-item-" + id);
  let col3 = $("<div>");
  col3.addClass("col-sm-4");
  col3.attr("id", "devoured-item-" + id);
  row.append(col1, col2, col3);

  let burgerSection = $("#burger-section");
  burgerSection.append(row);

  let devouredItem = $("<p>");
  devouredItem.attr("id", "devoured-item-" + id);
  devouredItem.text(burgerName);

  col3.append(devouredItem);

}

const retrieveBurgers = () => {
  $.ajax({
    type: "GET",
    url: "/api/burgers"
  }).then((res) => {
    for (let i = 0; i < res.length; i++) {
      if (res[i].devoured === true) {
        devoured(res[i].id, res[i].burger_name);
      } else {
        createBurger(res[i].id, res[i].burger_name);
      }

    }
  })
}

$(function () {
  $("body").on("click", "#submit", (e) => {
    e.preventDefault();
    let burgerName = $("#burger-name").val();
    $.ajax({
      method: "POST",
      url: "/api/burgers/" + burgerName,
      success: function (resp) {
        let id = resp.id;
        let burger_name = resp.burger_name;
        createBurger(id, burger_name);
      }
    });
  }).on("click", ".btn-devour", function (e) {
    e.preventDefault();
    let id = $(event.target).attr('data');
    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id,
      success: (resp) => {
        devour(id);
      },
      error: (req, status, err) => {
        console.log('something went wrong', status, err)
      }
    });
  }).on("click", "#clear", function(e) {
    e.preventDefault();
    
    $.ajax({
      method:"DELETE",
      url: "/api/delete",
      success: (res) => {
        console.log(res);
        let items = $('#burger-section');
        items.empty();
      },
      error: (res, status, err) => {
        console.log('something went wrong', status, err);
      }
    })
  }).on("click", ".btn-clear", function(e) {
    e.preventDefault();
    let id = $(event.target).attr('data');
    $.ajax({
      method:"DELETE",
      url: "/api/delete" + id,
      success: (res) => {
        console.log(res);
        let items = $('#burger-section');
        let row = $(".row-" + id);
        row.empty();
      },
      error: (res, status, err) => {
        console.log('something went wrong', status, err);
      }
    })
  });
});

retrieveBurgers();