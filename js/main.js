
let categoriasSistema = [];
let carrito = new Carrito([]);

//--->Clase Clientes
class Usuario{
    constructor(Nombre_Completo,Email,Telefono,Direccion,CP)
    {
        this.Nombre_Completo=Nombre_Completo;
        this.Email=Email;
        this.Telefono=Telefono;
        this.Direccion=Direccion;
        this.CP=CP;
    }
}


//--->Funciones y Métodos ---> Clases N° 4-7
initApp();


function initApp() {
    carga();
    inicioconhtml();
    mensajecompra();
    mensajedeconfirmacion();
}

function carga() {
    loadCategories();
    showCategories();
    showProducts();
}


/*Clase N°15 AJAX & Fetch*/

MostrarPersonajes()

function MostrarPersonajes()
{
  BotonMostrar()
}


function BotonMostrar()
{
    const btn = document.getElementById("ver");
    btn.addEventListener("click", ()=>{
      cargardatos();
    })
}

function cargardatos()
{
  //--->Api Harry potter
  fetch('http://hp-api.herokuapp.com/api/characters/house/gryffindor')
  .then((res)=>res.json())
  .then((json)=>mostrardatos(json))
  .catch((error)=>alert("No puedo mostrar info. Intente mas tarde "+error))

}

function mostrardatos(posts)
{
   const container = document.getElementById("productList")
   container.innerHTML=""
   posts.forEach((blogpost)=>{

        mostrarPost(blogpost, container)

   })
}

//--->Listado de la Api clase N°16
function mostrarPost(post, div)
{
     const divPost = document.createElement("div");
     divPost.innerHTML=`<h3>Nombre del Personaje: ${post.name}</h3>
                        <h3>Nombre del Actor: ${post.actor}
                        <h3>Años: ${post.dateOfBirth}</h3>
                        <h3>Casa: ${post.house}</h3>
                        <h3>Especie: ${post.species}</h3>
                        `
     divPost.setAttribute("style", "width:25%;padding:2%;border-radius:20px;border:1px solid #7F0909; margin:2%")
     div.appendChild(divPost);             
}

  

function loadCategories() {
    const categorias = products.map(element => element.category);
    const categoriasSet = new Set(categorias);
    //------>Spread Operator --->Clase 12
    const categoriasUnicas = [...categoriasSet];

    categoriasSistema = categoriasUnicas.map(element => {
        return {
            id: element,
            nombre: element,
            Descripcion:element,
        }
    })
}

function showCategories() {
    //---> DOOM --->Clase N°8
    const divCategorias = document.getElementById("categoryMenu");
    categoriasSistema.forEach(element => {
        const btn = document.createElement("button");
        btn.classList.add("catBtn");
        btn.innerText = element.nombre;
        

        btn.addEventListener("click", () => {
            showProducts(element.nombre);
        })

        divCategorias.appendChild(btn);
    })

}
//Asignación por defecto: 
//Cuando se invoca sin parámetro, asigna el valor por defecto
function showProducts(categoryName = "") {

    let productsToShow = products;

    if (categoryName !== "") {

        productsToShow = products.filter(product => product.category === categoryName);
    }


    const categoryNode = document.getElementById("categoryName");
    categoryNode.innerText = categoryName.toUpperCase();

    /*productList*/
    const productList = document.getElementById("productList")
    productList.innerHTML = "";
    productsToShow.forEach(product => {
        //--->Destructuring --->Clase 12
        const {img,nombre,precio,id}=product;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<img src="${img}">
        <div class="productInfo">
            <div class="productName">
               ${nombre}
            </div>
            <br>
            <span class="productPrice">
                Price:<b> $${precio} </b>
            </span> /
          
        </div>
        <button class="addToList" onclick="addProduct('${id}')">
            Agregar al Carrito
        </button>
        `

        productList.appendChild(div);
    })


}

function addProduct(idProducto) {
    //--->Funciones y Métodos ---> Clases N° 4-7
    const producto = products.find(element => element.id == idProducto);
    carrito.productos.push(producto);
    showCarrito();
}

function showCarrito() {

    const divLista = document.getElementById("productsInCart");
    divLista.innerHTML="";
    carrito.productos.forEach(product => {

        const nodo = document.createElement("div");
        nodo.classList.add("productInList");
        nodo.innerHTML = ` <div class="productImg">
                            <img src="${product.img}">
                            </div>
                            <div class="productName">
                                ${product.nombre}
                            </div>
                            <div class="producPrice">
                                <b>$ ${product.precio} </b>
                            </div>`
        const total = document.getElementById("total");
        const nodos = document.createElement("b");
        nodos.classList.add("totales");
        const totalAPagar = carrito.productos.reduce(
            //-->Calcular el total del carrito 
            (acumulador, precios) => acumulador + precios.precio,
            0
          );
        console.log(totalAPagar)
        
        total.innerHTML = `<b> Total:${totalAPagar} </b>`
        
          
                    
        divLista.appendChild(nodo);
                    
        total.appendChild(nodos);

    })

}


/**************************DOOM- CLASE 8**************************/
function inicioconhtml()
{   
    //buscamos segun el ID que colocamos en la clase html (en la etiqueta) e indicamos lo que va a tener.
    const sub_titulo = document.getElementById("informacion");
    sub_titulo.innerText="Harry Potter es una serie de novelas fantásticas escrita por la autora británica J. K. Rowling, en la que se describen las aventuras del joven aprendiz de magia y hechicería Harry Potter y sus amigos Hermione Granger y Ron Weasley, durante los años que pasan en el Colegio Hogwarts de Magia y Hechicería.";      
}

/*Clase N°13 - Librerias  TOASTIFY*/

function mensajecompra()
{
   const btn = document.getElementById("productList");
   btn.addEventListener("click", ()=>{

      Toastify({
         text: 'Producto Agregado al Carrito', 
         duration: 3000,
         position: 'center',
         style: {
            background: '#ffc500',
            color: 'black',
         },
      }).showToast();

   })
}

/*Clase N°13 - Librerias  SWEETALERT*/

function mensajedeconfirmacion()
{
    const boton = document.getElementById("registrar-compra");
    boton.addEventListener("click", () => {
        Swal.fire({
            title: `¡Compra Realizada con Exito!`,
            text: 'Los datos de la Compra seran enviados a su Email',
            icon: 'success',
            confirmButtonText: '¡Gracias por su Compra!',

        })
        finalizar_compra()
    })

}


/*Clase N°10 Storage*/

function finalizar_compra()
{
    let Nombre_Completo= document.getElementById("regnombre").value;
    let Email= document.getElementById("regemail").value;
    let Telefono= document.getElementById("regtel").value;
    let Direccion= document.getElementById("regdir").value;
    let CP= document.getElementById("regcp").value;
    //--->Clase N°12 Operadores Avanzados --- >OR
    if(Nombre_Completo==="" || Email==="" || Telefono==="" || Direccion===""|| CP==="")
    {
        alert("Verifique haber completado todos los campos");
    }
    else {
        const usuario = new Usuario(Nombre_Completo, Email, Telefono, Direccion,CP);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        location.reload();
    }
}


