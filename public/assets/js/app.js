let burgerNumber = 0;

function createList(i, burgers, section) {

  burgerNumber++;

  //creates the bootstrap outline for the middle part
  let row = $("<div>");
  row.addClass("row row" + i);
  let col1 = $("<div>");
  col1.addClass("col-sm-4");
  col1.attr("id", "burger-item" + i);
  let col2 = $("<div>");
  col2.addClass("col-sm-4");
  col2.attr("id", "button-item" + i);
  let col3 = $("<div>");
  col3.addClass("col-sm-4");
  col3.attr("id", "devoured-item" + i);
  row.append(col1, col2, col3);
  section.append(row);

  // uses the database response to create the individual items 
  let item = $("<p>");
  item.attr("id", "burger-number" + i);
  item.attr("data-id", burgers[i].id);
  item.text(burgers[i].burger_name);
  $("#burger-item" + i).append(item);


  let button = $("<button>");
  button.attr("id", "btn-" + i);
  button.addClass("btn btn-primary btn-devour");
  button.text("Devour it!");
  $("#button-item" + i).append(button);


  //the final items are not displaying 
  let devouredItem = $("<p>");
  devouredItem.addClass("hidden");
  devouredItem.attr("id", "devoured-item" + burgers[i].id);
  devouredItem.text(burgers[i].burger_name);

  if (burgers[i].devoured) {
    item.addClass("hidden");
    button.addClass("hidden");
    devouredItem.addClass("visible");


  }

  console.log(burgers[i].burger_name);

}

function retrieveBurgers() {

  console.log("!");

  $.ajax({
    type: "GET",
    url: "/api/burgers"
  }).then(function (res) {

    console.log("res", res);

    if (res.length > 0) {

      let burgers = res;
      let section = $("#burger-section");
      for (let i = 0; i < burgers.length; i++) {
        console.log("1-" + i);
        createList(i, burgers, section);
      }
    }

  });


}

function insertBurger(i, name, section) {

  let row = $("<div>");
  row.addClass("row row" + i);
  let col1 = $("<div>");
  col1.addClass("col-sm-4");
  col1.attr("id", "burger-item" + i);
  let col2 = $("<div>");
  col2.addClass("col-sm-4");
  col2.attr("id", "button-item" + i);
  let col3 = $("<div>");
  col3.addClass("col-sm-4");
  col3.attr("id", "devoured-item" + i);
  row.append(col1, col2, col3);
  section.append(row);

  // uses the database response to create the individual items 
  let item = $("<p>");
  item.attr("id", "burger-number" + i);
  item.attr("data-id", name);
  //item.text(burgers[i].burger_name);
  $("#burger-item" + i).append(item);


  let button = $("<button>");
  button.attr("id", "btn-" + i);
  button.addClass("btn btn-primary btn-devour");
  button.text("Devour it!");
  $("#button-item" + i).append(button);


  //the final items are not displaying 
  let devouredItem = $("<p>");
  devouredItem.addClass("hidden");
  //devouredItem.attr("id", "devoured-item" + burgers[i].id);
  //devouredItem.text(burgers[i].burger_name);

}

$(document).ready(function () {
  // Make sure we wait to attach our handlers until the DOM is fully loaded.

  retrieveBurgers();

  $("body").on("click", "#submit", function (event) {
    event.preventDefault();
    burgerNumber++;
    let i = burgerNumber;
    let section = $("#burger-section");
    let name = $("#burger-name").val();

    $.ajax({
      method: "POST",
      url: "/api/burgers/" + name,
      success: function (resp) {
        console.log(resp);
        $("#burger-section").empty();
        insertBurger(i, name, section);
      },
      error: function (req, status, err) {
        console.log('something went wrong', status, err);
      }

    });
  }).on('click', '.btn-devour', function (event) {
    event.preventDefault();

    //jquery to change elements on page
    let target = event.target.id;
    let rowNum = target.slice(-1);
    let burgerDescription = $("#burger-number" + rowNum);
    let burgerText = burgerDescription.text();
    $("#devoured-item" + rowNum).text(burgerText);




    console.log("rowNum", rowNum);
    console.log("this", target);

    //grabs the id for database

    let dataId = $("#burger-number" + rowNum).attr("data-id");
    let url = "/api/burgers/" + dataId;

    $.ajax({
      method: "PUT",
      url: url,
      success: function (resp) {
        console.log(resp);
      },
      error: function (req, status, err) {
        console.log('something went wrong', status, err);
      }
    })


    //cleans page up
    $("#burger-number" + rowNum).remove();
    $("#btn-" + rowNum).remove();

  });



});