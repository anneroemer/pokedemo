document.addEventListener("DOMContentLoaded", function(){
    let singleElm = document.querySelector(".single");
    let pokefooter = document.querySelector(".pokefooter");

    if (singleElm){
        let url = new URLSearchParams(window.location.search);
        let name = url.get("name");
        let backpage = url.get("backpage");

        console.log(name);

        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let div = document.createElement("div");
                div.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Weight: ${data.weight}</p>
                    <p>Height: ${data.height}</p>
                    <h3>Abilities: </h3>
                `
                let ul = document.createElement("ul")

                data.abilities.forEach(data => { //vi skal huske at skrive += her, så vi ikke overskriver det vi lige har lavet
                    let li = document.createElement("li");
                    let textnode = document.createTextNode(data.ability.name);
                    li.appendChild(textnode)
                    ul.appendChild(li)
                })
                div.appendChild(ul)
                singleElm.appendChild(div)

                let back = document.createElement("a");
                back.setAttribute("href", `/?offset=${backpage}`);
                let backNode = document.createTextNode("Back to the Pokemon list");
                back.appendChild(backNode);
                pokefooter.appendChild(back);
            })


    }
})