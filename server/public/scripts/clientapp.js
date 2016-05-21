$(document).ready(function() {

  getAnimals(); //call getAnimals on page load to populate DOM with database data
  $('#animalContainer').on('submit', createAnimal); //on submit, call function createAnimal

});

//function making ajax call create the data to be sent/POST to database
function createAnimal() {
  event.preventDefault();

  var animals = {};

  //loop through each input field and store data in an object
  $.each($('#animalContainer').serializeArray(), function (i, field) {
    animals[field.name] = field.value;
  });
  console.log(animals);
  $('#animalContainer')[0].reset();  //reset/clear form fields after clicking submit

  $.ajax({
    type: 'POST',
    url: '/animals',
    data: animals,
    success: function(response) {
      getAnimals();  //call getAnimals to get data from database
    }
  });
}


//function making ajax call to retrieve info from database
function getAnimals() {
  $.ajax({
      type: 'GET',
      url: '/animals',
      success: function (animals) {
        console.log(animals);
        $('#animalDisplay').empty();  //empty animalDisplay div so as new data is posted on DOM, data is not constantly repeated
        $('#animalDisplay').append('<tr>'+'<th>Animal</th>'+  //create table rows ANIMAL and QUANTITY
        '<th>Quantity</th>'+'</tr>');

        animals.forEach(function (animal) {  //for each returned array named animal, each object is named "animal" and data is appended into table rows
          $('#animalDisplay').append('<tr>'+'<td class="animal">'+animal.animal+'</td>'+
          '<td class=quantity>'+animal.quantity+'</td>'+'</tr>');
        });
      },
  });
}
