$( document ).ready( function(){
  getKoalas();
  $( '#addButton' ).on( 'click', function(event){
    event.preventDefault();
    addKoala();
  });
}); // end doc ready

function getKoalas(){
  console.log('in getKoalas');
  $.ajax({
    url: '/koalas',
    type: 'GET',
  }).done(function(data){
    console.log('GET:', data);
  }).fail(function(error){
    console.log(error)
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala(newKoala){
  console.log('in saveKoala', newKoala);
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala
  }).done(function(data){
    console.log('got some koalas:', data);
    getKoalas();
  }).fail(function(error){
    console.log(error)
  }); //end ajax
}

function addKoala(){
  var objectToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    transfer: $('#transferIn').val(),
    notes: $('#notesIn').val()
  }
  saveKoala(objectToSend);
}