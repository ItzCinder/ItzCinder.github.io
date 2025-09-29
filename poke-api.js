async function getPokemon(pokemon) {
    try {
        let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta");
        }

        let datos = await respuesta.json();
        let tipos = datos.types.map(x => x.type.name);
        let statsPkm = datos.stats.map(x => x.base_stat);
        let namePkm = capFirstFont(datos.name);
        let spritePkm = datos.sprites.other["official-artwork"].front_default;
        let IDPkm = datos.id;
        let statTotal = statsPkm.reduce((acum, n) => acum + n);
        await showInfo(tipos, namePkm, spritePkm, IDPkm, statsPkm, statTotal);
        
        

    } catch (error) {
        console.log("Ocurrió un error:", error);
    }
}

function translateType(type) {
    const typesES = {
        "ground": "Tierra",
        "grass": "Hierba",
        "fire": "Fuego",
        "water": "Agua",
        "electric": "Eléctrico",
        "ice": "Hielo",
        "fighting": "Lucha",
        "poison": "Veneno",
        "dragon": "Dragón",
        "dark": "Siniestro",
        "fairy": "Hada",
        "flying": "Volador",
        "bug": "Bicho",
        "rock": "Roca",
        "ghost": "Fantasma",
        "steel": "Acero",
        "psychic": "Psíquico",
        "normal": "Normal",
        "stellar": "Astral"
    };

    return typesES[type.toLowerCase()] || type;
}


async function showInfo(tipos, namePkm, spritePkm, IDPkm, statsPkm, statTotal){

    const typesContainer = document.querySelector(".card__types");
    typesContainer.innerHTML = "";

    const spritePkmElement = document.querySelector(".card__avatar-img");
    spritePkmElement.src = spritePkm;

    for (const type of tipos) {
        const typeElement = document.createElement("p");
        typeElement.textContent = translateType(`${type}`);
        typeElement.classList.add("card__type-pokemon");
        typesContainer.appendChild(typeElement);
    }

    const namePkmElement = document.querySelector(".card__name-pokemon");
    namePkmElement.textContent = namePkm;

    const IDPkmElement = document.querySelector(".card__id-pokedex");
    IDPkmElement.textContent = `#${IDPkm}`;

    let statsNameElements = [".pokemon__stats-hp", ".pokemon__stats-atk", ".pokemon__stats-def", ".pokemon__stats-spatk", ".pokemon__stats-spdef", ".pokemon__stats-speed"];
    let statsName =["HP:", "Ataque:", "Defensa:", "Ataque especial:", "Defensa especial:", "Velocidad:"]
    statsPkm.forEach((stat, index) =>{
        const statElement = document.querySelector(statsNameElements[index])
        const statName = statsName[index];
        if (statElement){
            statElement.textContent = `${statName} ${stat}`;
        }
    })

    const statTotalElement = document.querySelector(".pokemon__stats-total")
    statTotalElement.textContent =`Total: ${statTotal}`;


    

}

function searchPokemon(){
    const input = document.querySelector(".pokemon__search-input");
    const boton = document.getElementById("pokemon-search-btn");

    boton.addEventListener("click", () => {
        const texto = input.value;

        if (texto) {
            getPokemon(texto)
        }
    })
}

function capFirstFont(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
searchPokemon();
