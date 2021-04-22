document.addEventListener("DOMContentLoaded", function(){
    
    const pokelistElm = document.querySelector(".pokelist");
    const pokefooter = document.querySelector(".pokefooter");
    
    if(pokelistElm){ //vi pakker vores kode ind i en if statement
        let url = new URLSearchParams(window.location.search);
        
        /*
        let offset;
        if (url.get("offset")){
            offset = url.get("offset")
        }else{
            offset = 0
        }*/

        let offset = url.get("offset") ? url.get("offset") : 0;
        let nextOffset;
        let prevOffset;


        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let maxOffset = data.count - data.count % 20;
                //let lastpage = data.count % 20; //se hvad modulus % gør
                console.log(maxOffset)

                nextOffset = offset >= maxOffset ? maxOffset : parseInt(offset) + 20; //offset er hentet ud af url parametret som en string, derfor bruger vi parseInt til at konvertere det til et tal eller en "integer"
                prevOffset = offset <= 0 ? 0 : parseInt(offset) - 20;


                data.results.forEach(pokemon => {
                    let li = document.createElement("li")
                    li.classList.add("pokelist__item")

                    li.innerHTML = `
                        <a href="/pokemon?name=${pokemon.name}&backpage=${offset}" class="pokelist__link">
                        ${pokemon.name}
                        </a>
                    `
                    pokelistElm.appendChild(li);
                })

                let prev = document.createElement("a");
                prev.classList.add("btn");
                if(offset == 0) prev.classList.add("btn_disabled"); //vi behøver ikke curly brackets når vi skriver if statement på én linje
                prev.setAttribute("href", `?offset=${prevOffset}`);
                let prevNode = document.createTextNode("Previous");
                prev.appendChild(prevNode);
                pokefooter.appendChild(prev);

                let next = document.createElement("a");
                next.classList.add("btn");
                if(offset >= maxOffset) next.classList.add("btn_disabled");
                next.setAttribute("href", `?offset=${nextOffset}`);
                let nextNode = document.createTextNode("Next");
                next.appendChild(nextNode);
                pokefooter.appendChild(next);
                
            })
    }
})