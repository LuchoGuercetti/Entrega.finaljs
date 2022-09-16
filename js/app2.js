//solicitare los datos del api

let u = document.querySelector("#ubicacion")
let s = document.querySelector("#vehiculo")
let ch = document.querySelector("#distancia")

fetch('testApi2.json')
.then(function(res){
	//console.log(res)	
	return res.json()
})
.then(function(json){
	//para listar los barrios en lista desplegable	
	//console.log(json[0].Caba)
	let barriosCaba = json[0].Caba
	let barriosGba = json[0].Gba 	

	u.innerHTML +=`<optgroup label="Barrios de Caba">`;

	barriosCaba.forEach(function(b){
		//console.log(b.nombre)
		u.innerHTML +=`<option value='${b.nombre}'>${b.nombre}</option>`
		
	})

	u.innerHTML += `</optgroup>`

	u.innerHTML +=`<optgroup label="Barrios Gba">`;

	barriosGba.forEach(function(g){
		//console.log(b.nombre)
		u.innerHTML +=`<option value='${g.nombre}'>${g.nombre}</option>`
		
	})
	u.innerHTML += `</optgroup>`

	let vh = json[0].Precios[0]
	//console.log(vh)
	//console.log(json[0].Precios[0])

	for(t in vh){
		//console.log(t) 
		s.innerHTML +=`<option value='${t}'>${t}</option>`
	}

	u.addEventListener("change",cambiarDistancia)

	function cambiarDistancia(){
		//ch.value=this.b.distancia
		let loc = u.value;		
		for (var i = 0; i < barriosCaba.length; i++) {
			//console.log(barriosCaba[i].distancia)
			if(loc==barriosCaba[i].nombre){
				//console.log(barriosCaba[i].distancia)
				ch.value = barriosCaba[i].distancia	
			}
			
		}

		for (var i = 0; i < barriosGba.length; i++) {
			//console.log(barriosCaba[i].distancia)
			if(loc==barriosGba[i].nombre){
				//console.log(barriosGba[i].distancia)
				ch.value = barriosGba[i].distancia	
			}
			
		}
		
	}

})
.catch(function(err){
	console.log("No existe el api")
})


class Servicio {
    constructor(nombre, apellido, email, costoTraslado, tiempoDeEspera) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.costoTraslado = costoTraslado;
        this.tiempoDeEspera = tiempoDeEspera;
        //this.distancia = distancia;
        
    }
}

let miformulario = document.querySelector("#formulario");

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("nombre")) {
        cargarTabla();
    }
} )

//miformulario.addEventListener("submit",validarFormulario,);
$('#submit').on('click', guardar);
//$('#submit').on('click', historial);

function guardar(){
	let nombre = document.querySelector("#nombre").value;
	let apellido = document.querySelector("#apellido").value;
	let email = document.querySelector("#email").value;

	localStorage.setItem("nombre", nombre);
	localStorage.setItem("apellido", apellido);
	localStorage.setItem("email", email);

}

//Guardamos la informacion del servicio en el storage
/*function historial(){
	let nombre = document.querySelector("#nombre").value;
	let apellido = document.querySelector("#apellido").value;

}*/

function historial(jsonVh, dCaba, dGba) {

    var nombre = document.querySelector("#nombre").value;
    var apellido = document.querySelector("#apellido").value;
    var costoDelTraslado = tipoVehiculo(jsonVh) * distanciaDeTraslado();
    var tiempoDeEspera = demoraDelServicio(dCaba,dGba);


    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("costoDelTraslado", costoDelTraslado);
    localStorage.setItem("tiempoDeEspera", tiempoDeEspera);

    cargarTabla();
    miformulario.reset();
    
}

$("#submit").click(function(e){
	e.preventDefault();

	let miformulario = e.target

	fetch('testApi2.json')
	.then(function(res){
		return res.json()
	})
	.then(function(json){
		let vh = json[0].Precios[0]
		let barriosCaba = json[0].Caba		
		let barriosGba = json[0].Gba 

		//validarFormulario()
		//console.log(vh)
		//console.log(barriosCaba)
		//console.log(barriosGba)

		validarFormulario(vh, barriosCaba, barriosGba)
		historial(vh, barriosCaba, barriosGba)
		
		//miformulario.reset();
		/*document.querySelector("#nombre").value="";
		document.querySelector("#apellido").value="";
		document.querySelector("#email").value="";

		document.querySelector("#ubicacion").value=""
		document.querySelector("#vehiculo").value=""
		document.querySelector("#distancia").value=""*/

	})
	.catch(function(err){
		console.log(err)
	})

})



function validarFormulario(jsonVh, dCaba, dGba)
{	
	const nombre = document.querySelector("#nombre").value; 
    const apellido = document.querySelector("#apellido").value;
    const email = document.querySelector("#email").value;	
	let costoDelTraslado = tipoVehiculo(jsonVh) * distanciaDeTraslado()
	let tiempoDeEspera = demoraDelServicio(dCaba, dGba)

	const servicio = new Servicio(nombre, apellido, email, costoDelTraslado, tiempoDeEspera);
	localStorage.setItem('historial', JSON.stringify(servicio));
	console.log(servicio)
	imprimir(servicio)

	//console.log(calculoPrecio)
	//console.log(aviso)
	$('#submit').on('click', aplicarEstilo());
    
    function aplicarEstilo() {
        document.getElementById("vent").style.display="block"
        
    };
}

function tipoVehiculo(vh){
	let vehiculo = s.value

	for(t in vh){		
		if(t==vehiculo){
			return vh[t] 
			//console.log(vh[t])
		}
		//console.log(vh[t])
	}

	//console.log(vh)
}

function distanciaDeTraslado(){

	let resultado = ch.value;

	//console.log(resultado)
	return resultado
	//console.log(dC)
	//console.log(dG)
}

function demoraDelServicio(dCaba, dGba){
	let ubicacion = u.value;
	for (var i = 0; i < dCaba.length; i++) {
			//console.log(dCaba[i])
		if(ubicacion==dCaba[i].nombre){
			//console.log("menor a 2 hs")
			return "menor a 2 hs";
			//ch.value = barriosCaba[i].distancia	
		}
			
	}

	for (var i = 0; i < dGba.length; i++) {
		//console.log(dGba[i])
		if(ubicacion==dGba[i].nombre){
			//console.log("menor a 4 horas")
			return "menor a 4 horas";
			//ch.value = barriosGba[i].distancia	
		}
		
	}   
}

function imprimir(servicio) {

    const nuevoDiv = document.createElement ("div");

    nuevoDiv.classList.add("item");
    nuevoDiv.setAttribute("class", "ventana");

    //console.log(servicio.nombre)
    //console.log(servicio.costoTraslado)

    const h1 = document.createElement("h1");
    h1.textContent = `Hola ${servicio.nombre}, tu tiempo de espera sera ${servicio.tiempoDeEspera } y el costo total es de $${servicio.costoTraslado}.`;
    nuevoDiv.setAttribute("class","text-center");
    nuevoDiv.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = `En menos de 2 minutos te llegara un email a ${servicio.email} para que puedas seguir en tiempo real el servicio.`;
    nuevoDiv.appendChild(p);
    p.setAttribute("class", "text-center");

    const img = document.createElement("img");
    img.src = "imagenes/like.png";
    nuevoDiv.appendChild(img);

    let base = document.querySelector("#vent");
    
    base.innerHTML = '';
    base.appendChild(nuevoDiv);

 
    document.getElementById("vent").style.display="none";
    $("#vent").slideDown(800).slideUp(15000);
}

function cargarTabla() {

    //Inserto los datos en la tabla
  
    var tr1 = document.createElement("tr");
    table.appendChild(tr1);

    var th4 = document.createElement("th");
    th4.textContent = `${localStorage.getItem("nombre")}`;
    tr1.appendChild(th4);

    var td1 = document.createElement("td");
    td1.textContent = `${localStorage.getItem("apellido")}`;
    tr1.appendChild(td1);

    var td2 = document.createElement("td");
    td2.textContent = `${localStorage.getItem("costoDelTraslado")}`;
    tr1.appendChild(td2);

    var td3 = document.createElement("td");
    td3.textContent = `${localStorage.getItem("tiempoDeEspera")}`;
    tr1.appendChild(td3);

    let base1 = document.querySelector("#table").style.border="none";
    $(base1).hide()

    $(base1).slideDown(1000);
}