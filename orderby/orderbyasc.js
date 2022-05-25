const url = 'http://localhost:3033/api/asc/'
const contenedor = document.querySelector('tbody')
let resultados = ''
//funcion para mostrar los resultados de forma ascendente
const mostrar = (libro_autor) => {
    libro_autor.forEach(libro_autor => {
        resultados += `<tr>
        <td>${libro_autor.id}</td>
        <td>${libro_autor.autor}</td>
        <td>${libro_autor.categoria}</td>
        <td>${libro_autor.edicion}</td>
        <td>${libro_autor.libro}</td>
        <td>${libro_autor.cantidad}</td>
</tr>
                        `
    })
    contenedor.innerHTML = resultados
}

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}