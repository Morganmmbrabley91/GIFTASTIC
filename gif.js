$(document).ready(function() {

  var cartoons = [
    "catdog", "rocketpower", "rugrats", "doug", "rickandmorty", "gravityfalls",
    "simpsons", "futurama"
  ];

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".cartoon-button", function() {
    $("#cartoons").empty();
    $(".cartoon-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var cartoonDiv = $("<div class=\"cartoon-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var cartoonImage = $("<img>");
          cartoonImage.attr("src", still);
          cartoonImage.attr("data-still", still);
          cartoonImage.attr("data-animate", animated);
          cartoonImage.attr("data-state", "still");
          cartoonImage.addClass("cartoon-image");

          cartoonDiv.append(p);
          cartoonDiv.append(cartoonImage);

          $("#cartoons").append(cartoonDiv);
        }
      });
  });

  $(document).on("click", ".cartoon-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    var newcartoon = $("input").eq(0).val();

    if (newcartoon.length > 2) {
      cartoons.push(newcartoon);
    }

    populateButtons(cartoons, "cartoon-button", "#cartoon-buttons");

  });

  populateButtons(cartoons, "cartoon-button", "#cartoon-buttons");
});
