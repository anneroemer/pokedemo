document.addEventListener("DOMContentLoaded", function(){
    let resultElm = document.querySelector(".result__list");
    let resultMsg = document.querySelector(".result__message");
    let pokefooter = document.querySelector(".pokefooter");

    if (resultElm){
        let url = new URLSearchParams(window.location.search);
        let search = url.get("search").toLowerCase();

        console.log(search);
        

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                let found = data.results.filter(result => result.name.includes(search)) //vi skal huske at skrive .results fordi alle pokemons ligger nede i resultsarrayet

                console.log(found);

                if(found.length){

                    let messageNode = document.createTextNode(`The search for "${search}" returned the following results:`);
                    resultMsg.appendChild(messageNode);

                    found.forEach(pokemon => {
                        let li = document.createElement("li")

                        li.innerHTML = `
                            <a href="/pokemon?name=${pokemon.name}">
                            ${pokemon.name}
                            </a>
                        `
                        resultElm.appendChild(li);
                    })
                }else{
                    let messageNode = document.createTextNode(`Sorry! The search for "${search}" did not return any results:`);
                    resultMsg.appendChild(messageNode);
                }

            })
    }
})