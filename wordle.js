let filaActual = 0; // Fila actual (comença en la primera)
let posicioCuadrat = 0; // Posició dins de la fila
const intentsMaxims = 5; // Màxim de files (5 intents)
const paraulaBuscar = paraules[Math.floor(Math.random() * paraules.length)].toLowerCase(); // Paraula a endevinar


function posarLletra(lletra) {
    if (posicioCuadrat < 5) {
        let index = filaActual * 5 + posicioCuadrat + 1; // Calcular ID correcte
        let cuadre = document.getElementById(`cuadrat${index}`);
        cuadre.innerText = lletra;
        posicioCuadrat++;
    }
}

document.addEventListener('keydown', function(event) {
    let lletra = event.key.toUpperCase(); // Convertir directament a majúscules

    if (/^[A-Z]$/.test(lletra)) {
        posarLletra(lletra);
    } 
    else if (event.key === 'Backspace') {
        borrar();
    } 
    else if (event.key === 'Enter') {
        confirmar();
    }
});


function borrar() {
    if (posicioCuadrat > 0) {
        posicioCuadrat--;
        let index = filaActual * 5 + posicioCuadrat + 1;
        let cuadre = document.getElementById(`cuadrat${index}`);
        cuadre.innerText = ""; 
    }
}



function confirmar() {
    if (posicioCuadrat === 5) { // Només permetre confirmar quan hi ha 5 lletres
        let paraula = "";
        let quadrats = [];

        for (let i = 0; i < 5; i++) {
            let index = filaActual * 5 + i + 1;
            let cuadre = document.getElementById(`cuadrat${index}`);
            let lletra = cuadre.innerText.trim().toLowerCase();
            paraula += lletra;
            quadrats.push(cuadre);
        }

        if (!paraules.includes(paraula)) {
            alert("❌ Aquesta paraula no és vàlida.");
            return;
        }


        // Comprovar i pintar colors
        for (let i = 0; i < 5; i++) {
            let cuadre = quadrats[i];
            let lletra = paraula[i];

            cuadre.classList.remove("correcte", "pista", "incorrecte");

            if (paraulaBuscar[i] === lletra) {
                cuadre.classList.add("correcte"); // Verd (posició correcta)
            } else if (paraulaBuscar.includes(lletra)) {
                cuadre.classList.add("pista"); // Groc (lletra correcta, posició incorrecta)
            } else {
                cuadre.classList.add("incorrecte"); // Gris (lletra incorrecta)
            }
        }



        // Comptem quantes vegades apareix cada lletra en la paraula a buscar
        // Pas 1: Marquem les correctes (verd)
        let lletresParaulaBuscar = paraulaBuscar.split(""); // Convertir la paraula a un array
        let lletresRestants = paraulaBuscar.split(""); // Còpia per marcar les pistes

        for (let i = 0; i < 5; i++) {
            let cuadre = quadrats[i];
            let lletra = paraula[i];

            cuadre.classList.remove("correcte", "pista", "incorrecte");

            if (paraulaBuscar[i] === lletra) {
                cuadre.classList.add("correcte"); // Verd (posició correcta)
                lletresRestants[i] = null; // Elimina aquesta lletra perquè ja està ben col·locada
            }
        }

        // Pas 2: Marquem les pistes (groc) només si encara hi ha d'aquesta lletra disponible
        for (let i = 0; i < 5; i++) {
            let cuadre = quadrats[i];
            let lletra = paraula[i];

            if (!cuadre.classList.contains("correcte")) {
                let index = lletresRestants.indexOf(lletra);
                if (index !== -1) {
                    cuadre.classList.add("pista"); // Groc (posició incorrecta)
                    lletresRestants[index] = null; // Elimina la lletra per evitar repetir-la
                } else {
                    cuadre.classList.add("incorrecte"); // Gris (lletra incorrecta)
                }
            }
        }



        // Si l'usuari ha encertat, acabar el joc
        if (paraula === paraulaBuscar) {
            alert("🎉 Enhorabona! Has encertat la paraula!");
            return;
        }

        // Passar a la següent fila si encara hi ha intents
        if (filaActual < intentsMaxims - 1) {
            filaActual++;
            posicioCuadrat = 0;
        } else {
            alert(`❌ Has perdut! La paraula era: ${paraulaBuscar}`);
        }
    }
}





    

