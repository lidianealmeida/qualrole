const collectionEvent = db.collection('Eventos')
const createEvent = document.getElementById('createEvent');

createEvent.addEventListener('submit', (e) => {
    e.preventDefault();
    collectionEvent.add({
        evento: createEvent['event'].value, 
        data: createEvent['date'].value,
        categoria: createEvent['category'].value ,
        ingresso: createEvent['price'].value,
        endereço: createEvent['address'].value,
        descricao: createEvent['description'].value,
        iniciar: "todos",
        importancia: "destaque",
        foto: createEvent['photo'].value

    }).then(()=>{
        modalOne.style.display = "none"
    })
})
