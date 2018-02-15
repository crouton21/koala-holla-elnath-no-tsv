$( document ).ready( function(){
  $('#viewKoalas').on('click', '.deleteKoala', koalaDeleter);
  $('#viewKoalas').on('click', '.transfer', koalaTransfer);
  $('#changeDisplay').on('click', displayChange);
  displayChange();
  $( '#addButton' ).on( 'click', function(event){
    event.preventDefault();
    addKoala();
  });
}); // end doc ready

function getAllKoalas(){
  console.log('in getAllKoalas');
  $.ajax({
    url: '/koalas/all',
    type: 'GET',
  }).done(function(data){
    console.log('GET:', data);
    koalaDisplay(data);
  }).fail(function(error){
    console.log(error)
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function getTransferables(){
  console.log('in getTransferables');
  $.ajax({
    url: '/koalas/transferables',
    type: 'GET',
  }).done(function(data){
    console.log('GET:', data);
    koalaDisplay(data);
  }).fail(function(error){
    console.log(error)
  });
}

function getNonTransferables(){
  console.log('in getNonTransferables');
  $.ajax({
    url: '/koalas/nontransferables',
    type: 'GET',
  }).done(function(data){
    console.log('GET:', data);
    koalaDisplay(data);
  }).fail(function(error){
    console.log(error)
  });
}

function saveKoala(newKoala){
  console.log('in saveKoala', newKoala);
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala
  }).done(function(data){
    console.log('got some koalas:', data);
    displayChange();
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

function koalaDisplay(koalaArray){
  let stringToAppend = '';
  $('#viewKoalas').empty();
  for (koala of koalaArray){
    stringToAppend += `<tr>`;
    stringToAppend += `<td>${koala.name}</td>`;
    stringToAppend += `<td>${koala.age}</td>`;
    stringToAppend += `<td>${koala.gender}</td>`;
    stringToAppend += `<td>${koala.transfer}</td>`;
    stringToAppend += `<td>${koala.notes}</td>`;
    stringToAppend += `<td>${moveKoala(koala.transfer, koala.id)}</td>`
    stringToAppend += `<td><button type="button" data-id="${koala.id}" class="deleteKoala">Delete</button></td>`
    stringToAppend += `</tr>`;
  }
  $('#viewKoalas').append(stringToAppend);
  $('td').css("border-style", "solid");
  $('td').css("border-width", "1px");
  $('td').css("border-color", "#0E1828");
  $('td').css("padding-left", "10px");
  $('td').css("font-family", "monospace");
  $('td').css("color", "#0E1828");
  $('tr:odd').css("background-color", "#DCDCDE");
  $('tr:even').css("background-color", "#A4A7AB");
}

function koalaDeleter(){
  let id = $(this).data('id');
  $.ajax({
    type: 'delete',
    url: '/koalas',
    data: {'id': id}
  }).done(function(data){
    console.log('got some koalas:', data);
    displayChange();
  }).fail(function(error){
    console.log(error)
  }); //end ajax
}

function moveKoala(input, id){
  if(input=='false'){
    return `<button type="button" data-id="${id}" class="transfer">Ready to Transfer</button>`;
  }
  else{
    return '';
  }
}

function koalaTransfer(){
  let id = $(this).data('id');
  $.ajax({
    type: 'put',
    url: '/koalas',
    data: {'id': id}
  }).done(function(data){
    console.log('got some koalas:', data);
    displayChange();
  }).fail(function(error){
    console.log(error)
  }); //end ajax
}

function displayChange(){
  if($('#displaySelect').val()=='all'){
    getAllKoalas();
  } else if($('#displaySelect').val()=='transferable'){
    getTransferables();
  } else if($('#displaySelect').val()=='non-transferable'){
    getNonTransferables();
  }
}