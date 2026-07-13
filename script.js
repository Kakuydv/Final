const API = "https://fakestoreapi.com/products";


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
