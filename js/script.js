const nombre = document.getElementsByName("nombre-carga")[0];
const participantes = document.getElementsByName("participantes")[0];
const sorteo = document.getElementsByName("sorteos")[0];
const nombres = [];
const sorteos = [];

nombre.addEventListener("keyup", function (e) {
if (e.key === 'Enter' || e.keyCode === 13) {
	cargar();
}
});

function cargar () {
	if (nombre.value == "") {
		return false;
	}
	if (nombres.find(e=>e == nombre.value) == undefined) {
		nombres.push(nombre.value);
		participantes.value += nombres.length + ": " + nombre.value + "\n";
		nombre.value = "";
	}
	else {
		alert("Participante ya ingresado");
	}
	return true;
}

function borrarParticipantes () {
	while(nombres.length > 0) {
		nombres.pop();
	}
	participantes.value = "";
}

function borrarSorteos () {
	while(sorteos.length > 0) {
		sorteos.pop();
	}
	sorteo.value = "";
}

function sortearTodos () {
	borrarSorteos ();
	for(let i = 0; i < nombres.length; i++) {
		sorteos.push({nombre: nombres[i], puntaje: Math.random(), posicion: i+1});
	}
	sorteos.sort(function (a, b) {
		if (a.puntaje > b.puntaje) {
			return 1;
		}
		if (a.puntaje < b.puntaje) {
			return -1;
		}
			return 0;
		});
	for(let i = 0; i < sorteos.length; i++) {
		sorteo.value += (i+1) + ": " + "(" + sorteos[i].posicion + ") " + sorteos[i].nombre + "\n";
	}
}

function sortearUno () {
	var aux = [];
	if (nombres.length > sorteos.length) {
		for(let i = 0; i < nombres.length; i++) {
			if (sorteos.find(e=>e.nombre == nombres[i]) == undefined) {
				aux.push({nombre: nombres[i], puntaje: Math.random(), posicion: i+1});
			}
		}
		sorteos.push(aux.reduce((previous, current) => {
			return current.puntaje > previous.puntaje ? current : previous;
		}));
		sorteo.value += sorteos.length + ": " + "(" + sorteos[sorteos.length-1].posicion + ") " + sorteos[sorteos.length-1].nombre + "\n";
	}
}
