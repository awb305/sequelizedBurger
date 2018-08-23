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
  button.text("Devour it!");
  $("#button-item-" + id).append(button);

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

$(function () {
  $("body").on("click", "#submit", (e) => {
    e.preventDefault();

    let burgerName = $("#burger-name").val();

    $.ajax({
      method: "POST",
      url: "/api/burgers/" + burgerName,
      success: function (resp) {
        console.log(resp);
        let id = resp.id;
        let burger_name = resp.burger_name;
        createBurger(id, burger_name);
      }
    });
  }).on("click", ".btn-devour", function (e) {
    e.preventDefault();

    let id = $(event.target).attr('data');

    console.log("id", id);


    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id,
      success: (resp) => {
        console.log("put response", resp);
        devour(id);
      },
      error: (req, status, err) => {
        console.log('something went wrong', status, err)
      }
    });
  });
});