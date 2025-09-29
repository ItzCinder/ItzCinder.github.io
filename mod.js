const cardAvatarImg = document.querySelector(".card__avatar-img");
const colorThief = new ColorThief();


function pickupColor(img){
    img.addEventListener('load', () => {
        try {
            const color = colorThief.getColor(img); // [R, G, B]
            const rgbDarkened = darknessColor(color); // <-- usar aquí
            applyCSS(rgbDarkened)
            const rgb = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            console.log("Color predominante:", rgb);
            console.log("Color oscuro:", rgbDarkened);
        } catch (err) {
            console.error("Error al obtener color:", err);
        }
    });
}

function darknessColor(rgb, factor = 0.7){
    const darkened = rgb.map(c => Math.floor(c * factor));
    const rgbDarkened = `rgb(${darkened[0]}, ${darkened[1]}, ${darkened[2]})`;
    return rgbDarkened;
}

function applyCSS(rgbDarkened){
    const cardCSS = document.querySelector(".card");
    cardCSS.style.borderColor = rgbDarkened;


    let currentShadow = getComputedStyle(cardCSS).boxShadow;
    const newShadow = currentShadow.replace(/(rgba?\([^)]+\)|#[0-9a-fA-F]{3,6})/, rgbDarkened);
    cardCSS.style.boxShadow = newShadow;

    const btnSearchPkm = document.getElementById("pokemon-search-btn");
    btnSearchPkm.addEventListener('click', () =>{
        cardCSS.style.display = 'flex';
    })
}

applyCSS();
pickupColor(cardAvatarImg);
