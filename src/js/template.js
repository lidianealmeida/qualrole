$(document).ready(function(){
  $("#filter").click(filterSelect)
  $('#home').click(undoFilter)
  const collectionEvent = db.collection('Eventos')
  createPost(collectionEvent, "iniciar", "todos")
})

function createPost(event, category, filter){
  $("#cardSpot").html("");
  $("#cardCommon").html("");

  event
  .where("importancia", "==", "destaque")
  .where(category, "==", filter)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const info = doc.data();
      const idPost = doc.id;
      $("#cardSpot").prepend(`
      <section class="card mb-3">
        <img class="card-img-top" src="${info.foto}" alt="Imagem de capa do card">
        <section class="card-body">
          <h5 class="card-title name-evt">${info.evento}</h5>
          <p class="card-text text">${info.descricao}</p>
          <p class="card-text text"><small class="text-muted">${info.endereço}</small></p>
          <a href="map.html" id-info=${idPost} class="btn btn-primary text">Ir pro rolê</a>

        </section>
      </section>
      `)
    })
  })

}

function filterSelect(){
  const checkInput = document.getElementsByName("filter-check")
  for (let i of checkInput){
    if (i.checked) {
      createPost(collectionEvent, "categoria", i.id)
    } 
  } 
}

function undoFilter(){
  createPost(collectionEvent, "iniciar", "todos")
}

$(document).ready(function () {
  console.log("anajd")
  $('.button-logout').click(function() {
    console.log("vabab")
      window.location = `index.html`;
  })
})

$(document).ready(function () {
  console.log("anajd")
  $('.button-home').click(function() {
    console.log("vabab")
      window.location = `feed.html`;
  })
})