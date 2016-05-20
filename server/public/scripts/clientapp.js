$(document).ready(function() {

var animalQuantity = 0;
//event listeners
$('#zooAnimals').on('submit', function () {
  createAnimal();
  getQuantity();
})


});

//create employee function, called when submit button on form is clicked
function createAnimal() {
  event.preventDefault();

  var animals = {};

  $.each($('#zooAnimals').serializeArray(), function (i, field) {
    animals[field.name] = field.value;
  });
  console.log(animals);
  $('#zooAnimals')[0].reset();



  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animals, 
    success: function (response) {

    },
  });
}

function getAnimals() {
    $.ajax({
      type: 'GET',
      url: '/animals',
      success: function (data) {
        $('#animalDisplay').empty();
        data.forEach(function(animal, i) {

          $('#animalDisplay').append('<div class="newAnimal"></div');
          var $el = $('#animalDisplay').children().last();
          $el.data("id", animal.id);

          $el.append('<p>' + 'Animal: ' + animal.animal + '</p>');
          //$el.append('<p>' + 'Quantity: ' + animal.quantity + '</p>')
        });
      }
  });
}

function getQuantity() {
  $.ajax({
    type: 'GET',
    url: '/quantity',
    success: function (data) {
      console.log(data);
      animalQuantity = data[0];
      //console.log(animalQuantity);



    }
  })
}
