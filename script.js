const API = "https://fakestoreapi.com/products";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const contador = document.getElementById("contador");
const total = document.getElementById("total");


// Traducción de productos por ID
const nombresEspañol = {

    1: "Mochila Fjallraven para notebook de 15 pulgadas",
    2: "Remera casual premium de hombre",
    3: "Campera de algodón para hombre",
    4: "Ropa casual ajustada para hombre",
    5: "Pulsera dorada y plateada con diseño de dragón",
    6: "Anillo de oro macizo",
    7: "Collar de oro blanco estilo princesa",
    8: "Aros de acero inoxidable bañados en oro rosa",
    9: "Disco externo WD 2TB USB 3.0",
    10: "Disco SSD interno SanDisk 1TB",
    11: "Disco SSD Silicon Power 256GB",
    12: "Disco externo gamer WD 4TB",
    13: "Campera de invierno impermeable para mujer",
    14: "Campera de cuero sintético para mujer",
    15: "Campera impermeable deportiva para mujer",
    16: "Remera femenina manga corta",
    17: "Remera deportiva femenina",
    18: "Remera casual de algodón para mujer",
    19: "Remera premium de algodón para hombre",
    20: "Remera deportiva manga corta"

};



// Cargar productos desde API

fetch(API)

.then(res => res.json())

.then(productos => {


    productos.forEach(producto => {


        let nombreProducto =
        nombresEspañol[producto.id] || producto.title;



        const card = document.createElement("div");

        card.className = "card";



        card.innerHTML = `

        <img 
        src="${producto.image}" 
        alt="${nombreProducto}">


        <h3>${nombreProducto}</h3>


        <p>
        $${producto.price}
        </p>


        <button class="btn-agregar">
        Agregar al carrito
        </button>

        `;



        card
        .querySelector(".btn-agregar")
        .addEventListener("click",()=>{


            agregarProducto(

                producto.id,
                nombreProducto,
                producto.price,
                producto.image

            );


        });



        listaProductos.appendChild(card);


    });



    actualizarCarrito();


})

.catch(error=>{

console.log(
"Error cargando productos:",
error
);

});







// Agregar producto al carrito

function agregarProducto(id,titulo,precio,img){



    let producto =
    carrito.find(item=>item.id===id);



    if(producto){


        producto.cantidad++;


    }else{


        carrito.push({

            id:id,
            titulo:titulo,
            precio:Number(precio),
            img:img,
            cantidad:1

        });


    }



    mostrarNotificacion(
        `${titulo} agregado al carrito 🛒`
    );



    guardarCarrito();



}







// Guardar carrito

function guardarCarrito(){


localStorage.setItem(

"carrito",

JSON.stringify(carrito)

);


actualizarCarrito();


}







// Mostrar carrito

function actualizarCarrito(){


listaCarrito.innerHTML="";


let totalCompra=0;

let cantidadProductos=0;



carrito.forEach(producto=>{


cantidadProductos += producto.cantidad;


totalCompra += 
producto.precio * producto.cantidad;



const item = document.createElement("div");



item.innerHTML=`

<h4>
${producto.titulo}
</h4>


<img 
src="${producto.img}"
alt="${producto.titulo}"
width="80">


<p>
Precio:
$${producto.precio}
</p>


<label>
Cantidad:
<input 
type="number"
min="1"
value="${producto.cantidad}"
onchange="
cambiarCantidad(${producto.id},this.value)
">
</label>


<br><br>


<button onclick="
eliminarProducto(${producto.id})
">
Eliminar
</button>


<hr>

`;



listaCarrito.appendChild(item);



});



contador.textContent =
cantidadProductos;



total.textContent =
totalCompra.toFixed(2);



}







// Cambiar cantidad

function cambiarCantidad(id,cantidad){


let producto =
carrito.find(item=>item.id===id);



if(producto){


producto.cantidad =
Number(cantidad);



guardarCarrito();


}



}







// Eliminar producto

function eliminarProducto(id){


carrito =
carrito.filter(
producto=>producto.id!==id
);



guardarCarrito();



}







// Notificación

function mostrarNotificacion(texto){



const aviso =
document.createElement("div");



aviso.className =
"notificacion";



aviso.textContent =
texto;



document.body.appendChild(aviso);



setTimeout(()=>{


aviso.remove();


},3000);



}







// Validación formulario

const formulario =
document.getElementById("formulario");



if(formulario){


formulario.addEventListener(
"submit",
(e)=>{


const email =
document.getElementById("email").value;



if(!email.includes("@")){


e.preventDefault();


alert(
"Por favor ingresa un correo válido"
);


}



});

}
