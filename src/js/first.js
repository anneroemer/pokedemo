document.addEventListener("DOMContentLoaded", function(){
    
    const pokelistElm = document.querySelector(".pokelist");
    const pokefooter = document.querySelector(".pokefooter");

    fetch("https://pokeapi.co/api/v2/pokemon")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.results.forEach(pokemon => {
                let li = document.createElement("li")

                li.innerHTML = `
                    ${pokemon.name}
                `
                pokelistElm.appendChild(li)
            })

            let next = document.createElement("a");
            next.setAttribute("href", data.next);
            let nextNode = document.createTextNode("Next");

            next.appendChild(nextNode)
            pokefooter.appendChild(next)
            
        })
})