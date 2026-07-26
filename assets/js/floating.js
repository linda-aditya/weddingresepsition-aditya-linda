const floatingContainer = document.getElementById("floatingDecorations");

const items = [

    "✨",
    "🌸",
    "🍂"

];

function createFloating(){

    const item = document.createElement("div");

    item.classList.add("float-item");

    const icon = items[Math.floor(Math.random()*items.length)];

    item.innerHTML = icon;

    if(icon==="✨"){

        item.classList.add("gold");

    }

    if(icon==="🌸"){

        item.classList.add("flower");

    }

    if(icon==="🍂"){

        item.classList.add("leaf");

    }

    item.style.left=Math.random()*100+"vw";

    item.style.animationDuration=

        (8+Math.random()*8)+"s";

    item.style.fontSize=

        (12+Math.random()*18)+"px";

    floatingContainer.appendChild(item);

    item.addEventListener("animationend",()=>{

        item.remove();

    });

}

setInterval(createFloating,900);
