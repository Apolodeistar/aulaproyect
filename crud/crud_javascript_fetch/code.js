//Definición de variables
const url = 'http://localhost:3033/api/libro_autor/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const autor = document.getElementById('autor')
const categoria = document.getElementById('categoria')
const edicion = document.getElementById('edicion')
const libro = document.getElementById('libro')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    autor.value = ''
    categoria.value = ''
    edicion.value = ''
    libro.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (libro_autor) => {
    libro_autor.forEach(libro_autor => {
        resultados += `<tr>
                            <td>${libro_autor.id}</td>
                            <td>${libro_autor.autor}</td>
                            <td>${libro_autor.categoria}</td>
                            <td>${libro_autor.edicion}</td>
                            <td>${libro_autor.libro}</td>
                            <td>${libro_autor.cantidad}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
</tr>`
    })
    contenedor.innerHTML = resultados

}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const autor = fila.children[1].innerHTML
    const categoria = fila.children[2].innerHTML
    const edicion = fila.children[3].innerHTML
    const libro = fila.children[4].innerHTML
    const cantidad = fila.children[5].innerHTML

    autor.value = autorForm
    categoria.value = categoriaForm
    edicion.value = edicionForm
    libro.value = libroForm
    cantidad.value = cantidadForm
    opcion = 'editar'
    modalArticulo.show()

})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                autor: autor.value,
                categoria: categoria.value,
                edicion: edicion.value,
                libro: libro.value,
                cantidad: cantidad.value

            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({

                autor: autor.value,
                categoria: categoria.value,
                edicion: edicion.value,
                libro: libro.value,
                cantidad: cantidad.value

            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})

