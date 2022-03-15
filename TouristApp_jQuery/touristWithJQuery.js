var touristData = [];
var index = 0;
var pictureSource = "";
var updatedIndex = 0;
var nextTouristSortingState = false;
var currentSortedState = false;
var searchByName = "";

function inputTouristData() {
  event.stopPropagation();
  event.preventDefault();

  var name = $("#nameInput").val();
  var address = $("#addressInput").val();
  var rating = $("#ratingInput").val();
  var type = $("#type").val();
  index++;
  var touristObject = {
    name: name,
    address: address,
    rating: rating,
    type: type,
    picture: pictureSource,
    id: index
  };
  var formArray = ["name", "address", "rating", "picture"];
  var validationValue = true;
  for (var i = 0; i < formArray.length; i++) {
    var currentField = $("#" + formArray[i] + "Input");
    validationValue = ValidateTheInput(
      currentField[0].name + "Input",
      currentField[0].name + "Error",
      currentField[0].name + "Div"
    );
  }

  if (updatedIndex > 0) {
    for (var i = 0; i < touristData.length; i++) {
      if (touristData[i].id === updatedIndex) {
        touristData.splice(i, 1);
        break;
      }
    }
    updatedIndex = 0;
  }

  if (validationValue == true) {
    touristData.push(touristObject);
    touristData.sort(compareForSorting);
    resetTouristData();
    displayTouristData();
  }
}

function uploadTouristImage(self) {
  if (self.files && self.files[0]) {
    var reader = new FileReader();
    reader.addEventListener("load", function(e) {
      pictureSource = e.target.result;
    });
    reader.readAsDataURL(self.files[0]);
  }
}

function resetTouristData() {
  event.stopPropagation();
  event.preventDefault();
  $("#nameInput").val("");
  $("#addressInput").val("");
  $("#ratingInput").val("");
  $("#type").selectedIndex = 0;
  $("#pictureInput").val("");
}

function displayTouristData() {
  touristData.sort(compareForSorting);

  var table =
    "<table><tr> <th>Name</th> <th>Address</th> <th id=" +
    "touristRating" +
    " value=" +
    "Rating>Rating</th> <th>Type</th> <th>Image</th> <th>Action</th> </tr>";
  for (var i = 0; i < touristData.length; i++) {
    debugger;
    var searchKey = touristData[i].name.toLowerCase();
    if (!searchKey.startsWith(searchByName)) continue;
    table +=
      "<tr>" +
      "<td>" +
      touristData[i].name +
      "</td><td>" +
      touristData[i].address +
      "</td><td>" +
      touristData[i].rating +
      "</td><td>" +
      touristData[i].type +
      "</td><td>" +
      "<img src=" +
      touristData[i].picture +
      " height=100px>" +
      "</td><td>" +
      "<button type=" +
      "button" +
      " class=" +
      "updateButton" +
      " id=" +
      "updateTourist" +
      " updateTourist=" +
      touristData[i].id +
      ">Update</button>" +
      "<button type=" +
      "button" +
      " class=" +
      "deleteButton" +
      " id=" +
      "deleteTheTourist" +
      " deleteTourist=" +
      touristData[i].id +
      ">Delete</button>" +
      "</td></tr>";
  }
  table += "</table>";
  $("#dataTable").html(table);
}

function searchTourist() {
  searchByName = $("#searchName")
    .val()
    .toLowerCase();
  displayTouristData();
}

function removeTouristData(c) {
  var parseTheIndex = parseInt(c);
  var x = confirm("Do you want to delete?");
  if (x == false) return;
  for (var i = 0; i < touristData.length; i++) {
    if (touristData[i].id === parseTheIndex) {
      touristData.splice(i, 1);
      break;
    }
  }
  displayTouristData();
}

function updateTouristData(c) {
  var parseTheIndex = parseInt(c);
  var updatedTouristData;
  for (var i = 0; i < touristData.length; i++) {
    if (touristData[i].id === parseTheIndex) {
      updatedTouristData = touristData[i];
      updatedIndex = parseTheIndex;
    }
  }
  $("#nameInput").val(updatedTouristData.name);
  $("#addressInput").val(updatedTouristData.address);
  $("#ratingInput").val(updatedTouristData.rating);
  $("#type").val(updatedTouristData.type);
}

function compareForSorting(a, b) {
  if (parseInt(a.rating) < parseInt(b.rating)) {
    return currentSortedState ? 1 : -1;
  }
  if (parseInt(a.rating) > parseInt(b.rating)) {
    return currentSortedState ? -1 : 1;
  }
}

function ValidateTheInput(input, error, alertDiv) {
  debugger;
  if (
    input != "ratingInput" &&
    error != "ratingError" &&
    alertDiv != "ratingDiv"
  ) {
    //var field = document.getElementById(input);
    var field = $("#" + input);
    //var error = document.getElementById(error);
    var error = $("#" + error);
    if (field.val() == "") {
      field.css({
        "border-color": "red",
        "border-weight": "1px",
        "border-style": "solid"
      });
      $("#" + alertDiv).css("color", "red");
      error.text("Required");
      field.focus();
      return false;
    } else {
      return true;
    }
  } else if (
    input === "ratingInput" &&
    error === "ratingError" &&
    alertDiv === "ratingDiv"
  ) {
    var field = $("#" + input);
    var error = $("#" + error);
    if (field.val() == "" || field.val() < 1 || field.val() > 10) {
      field.css({
        "border-color": "red",
        "border-weight": "1px",
        "border-style": "solid"
      });
      $("#" + alertDiv).css("color", "red");
      error.text("Accepted rating Required");
      field.focus();
      return false;
    } else {
      return true;
    }
  }
}

function verify(input, error, alertDiv) {
  var field = $("#" + input);
  var error = $("#" + error);
  if (field.val() != "") {
    field.css({
      "border-color": "#5e6e66",
      "border-weight": "1px",
      "border-style": "solid"
    });
    $("#" + alertDiv).css("color", "black");
    error.html("");
  }
}

$(document).ready(function() {
  var formArray = ["name", "address", "rating", "picture"];
  for (var i = 0; i < formArray.length; i++) {
    $(document).on("blur", "#" + formArray[i] + "Input", function() {
      verify(this.name + "Input", this.name + "Error", this.name + "Div");
    });
  }
  $(document).on("change", "#pictureInput", function() {
    var self = this;
    uploadTouristImage(self);
  });

  $(document).on("click", "#submit", inputTouristData);
  $(document).on("click", "#reset", resetTouristData);
  $(document).on("keyup", "#searchName", searchTourist);

  $(document).on("click", ".deleteButton", function() {
    var holdTheDeletingIndex = $(this).attr("deleteTourist");
    removeTouristData(holdTheDeletingIndex);
  });

  $(document).on("click", ".updateButton", function() {
    var holdTheUpdatingIndex = $(this).attr("updateTourist");
    updateTouristData(holdTheUpdatingIndex);
  });

  $(document).on("click", "#touristRating", function() {
    currentSortedState = !currentSortedState;
    displayTouristData();
  });
});
