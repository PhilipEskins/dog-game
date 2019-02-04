$(document).ready(function() {
  $("form#formOne").submit(function(event){
    event.preventDefault();
    console.log("submitted")
    var ownerInput = $("input#ownerName").val();
    var dogInput = $("input#dogName").val();
    $("#answers").text(test(userInput));
  })
})
