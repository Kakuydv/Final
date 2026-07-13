const API = "https://fakestoreapi.com/products";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const contador = document.getElementById("contador");
const total = document.getElementById("total");


// Traducción de nombres de productos
const traducciones = {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops":
        "Mochila Fjallraven para notebook de 15 pulgadas",

    "Mens Casual Premium Slim Fit T-Shirts":
        "Remera casual premium de hombre",

    "Mens Cotton Jacket":
        "Campera de algodón para hombre",

    "Mens Casual Slim Fit":
        "Ropa casual ajustada para hombre",

    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet":
        "Pulsera dorada y plateada con diseño de dragón",

    "Solid Gold Petite Micropave":
        "Anillo de oro macizo con micropiedras",

    "White Gold Plated Princess":
        "Collar de oro blanco con diseño princesa",

    "Pierced Owl Rose Gold Plated Stainless Steel Double":
        "Aros de acero inoxidable bañados en oro rosa",

    "WD 2TB Elements Portable External Hard Drive - USB 3.0":
        "Disco externo portátil WD 2TB USB 3.0",

    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s":
        "Disco SSD interno SanDisk 1TB",

    "Silicon Power 256GB SSD 3D NAND A55":
        "Disco SSD Silicon Power 256GB",

    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive":
        "Disco externo gamer WD 4TB",

    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats":
        "Campera de invierno impermeable para mujer",

    "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket":
        "Campera de cuero sintético para mujer",

    "Rain Jacket Women Windbreaker Striped Climbing Raincoats":
        "Campera impermeable deportiva para mujer",

    "MBJ Women's Solid Short Sleeve Boat Neck V":
        "Remera femenina manga corta",

    "Opna Women's Short Sleeve Moisture":
        "Remera deportiva femenina",

    "DANVOUY Womens T Shirt Casual Cotton Short":
        "Remera casual de algodón para mujer",

    "Mens Short Sleeve Premium Cotton":
        "Remera premium de algodón para hombre"
};



fetch(API)

.then(res => res.json())

.then(productos => {

    productos.forEach(producto => {

        let nombreEspañol =
            traducciones[producto.title] || producto.title;


        let card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `

        <img src="${producto.image}" 
        alt="${nombreEspañol}">

        <h3>${nombreEspañol}</h3>

        <p>$${producto.price}</p>

        <button>
        Agregar al carrito
        </button>

        `;


        card.querySelector("button")
        .addEventListener("click",()=>{

            agregar(
                producto.id,
                nombreEspañol,
                producto.price,
                producto.image
            );

        });


        listaProductos.appendChild(card);

    });


    actualizarCarrito();

});





function agregar(id,titulo,precio,img){


let producto =
carrito.find(p=>p.id===id);



if(producto){

    producto.cantidad++;

}
else{

    carrito.push({

        id,
        titulo,
        precio,
        img,
        cantidad:1

    });

}


// Notificación
mostrarNotificacion(
`${titulo} fue agregado al carrito 🛒`
);


guardar();

}







function mostrarNotificacion(texto){


let aviso=document.createElement("div");

aviso.className="notificacion";

aviso.textContent=texto;


document.body.appendChild(aviso);



setTimeout(()=>{

    aviso.remove();

},3000);


}







function guardar(){

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);


actualizarCarrito();

}







function actualizarCarrito(){

listaCarrito.innerHTML="";


let suma=0;
let cantidadTotal=0;



carrito.forEach(producto=>{


cantidadTotal+=producto.cantidad;

suma+=producto.precio * producto.cantidad;



let div=document.createElement("div");


div.innerHTML=`

<h4>${producto.titulo}</h4>

<p>
Cantidad:
<input 
type="number"
min="1"
value="${producto.cantidad}"
onchange="cambiarCantidad(${producto.id},this.value)">
</p>


<p>
Precio: $${producto.precio}
</p>


<button onclick="eliminar(${producto.id})">
Eliminar
</button>

<hr>

`;


listaCarrito.appendChild(div);


});


contador.textContent=cantidadTotal;

total.textContent=suma.toFixed(2);


}







function cambiarCantidad(id,cantidad){


let producto =
carrito.find(p=>p.id===id);


producto.cantidad=Number(cantidad);


guardar();


}






function eliminar(id){

carrito =
carrito.filter(p=>p.id!==id);


guardar();

}






// Validación formulario

document
.getElementById("formulario")
.addEventListener("submit",(e)=>{


let email =
document.getElementById("email").value;


if(!email.includes("@")){

e.preventDefault();

alert("Correo inválido");

}

});const API = "https://fakestoreapi.com/products";


let carrito =
JSON.parse(localStorage.getItem("carrito"))
|| [];



const listaProductos =
document.getElementById("lista-productos");



const listaCarrito =
document.getElementById("lista-carrito");



const contador =
document.getElementById("contador");



const total =
document.getElementById("total");





// CONSUMO API


fetch(API)

.then(res=>res.json())

.then(productos=>{


productos.forEach(producto=>{


let card=document.createElement("div");

card.className="card";


card.innerHTML=`

<img src="${producto.image}" 
alt="${producto.title}">


<h3>${producto.title}</h3>


<p>
$${producto.price}
</p>


<button onclick="agregar(${producto.id},
'${producto.title}',
${producto.price},
'${producto.image}')">

Agregar

</button>

`;


listaProductos.appendChild(card);


});


actualizarCarrito();


});







function agregar(id,titulo,precio,img){


let producto =
carrito.find(p=>p.id===id);



if(producto){

producto.cantidad++;

}else{


carrito.push({

id,
titulo,
precio,
img,
cantidad:1

});


}


guardar();

}







function guardar(){


localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);


actualizarCarrito();

}







function actualizarCarrito(){


listaCarrito.innerHTML="";


let suma=0;
let cantidadTotal=0;



carrito.forEach(producto=>{


cantidadTotal+=producto.cantidad;


suma+=producto.precio *
producto.cantidad;



let div=document.createElement("div");


div.innerHTML=`

<h4>${producto.titulo}</h4>

<p>
Cantidad:
<input 
type="number"
value="${producto.cantidad}"
min="1"
onchange="cambiarCantidad(${producto.id},this.value)">
</p>


<p>
Precio:
$${producto.precio}
</p>


<button onclick="eliminar(${producto.id})">
Eliminar
</button>

<hr>

`;



listaCarrito.appendChild(div);



});



contador.textContent=cantidadTotal;

total.textContent=suma.toFixed(2);


}







function cambiarCantidad(id,cantidad){


let producto =
carrito.find(p=>p.id===id);


producto.cantidad=
Number(cantidad);


guardar();


}







function eliminar(id){


carrito =
carrito.filter(p=>p.id!==id);


guardar();


}







// VALIDACION FORMULARIO


document
.getElementById("formulario")
.addEventListener(
"submit",
(e)=>{


let email =
document.getElementById("email").value;


if(!email.includes("@")){

e.preventDefault();

alert(
"Correo inválido"
);

}


});
