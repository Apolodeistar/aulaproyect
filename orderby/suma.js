const url = 'http://localhost:3033/api/sum/'
        const contenedor = document.querySelector('tbody')
        let resultados = ''
        
        
            const mostrar = (libro_autor) => {
                libro_autor.forEach(libro_autor => {
                    resultados += `<tr>
                                        <td>${libro_autor.suma}</td>
                                    </tr>
                                `    
                })
                contenedor.innerHTML = resultados   
            }
            
            fetch(url)
                .then( response => response.json() )
                .then( data => mostrar(data) )
                .catch( error => console.log(error))
             
            const on = (element, event, selector, handler) => {
                element.addEventListener(event, e => {
                    if(e.target.closest(selector)){
                        handler(e)
                    }
                })
             }