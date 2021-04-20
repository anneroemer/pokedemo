document.addEventListener("DOMContentLoaded", function(){
    const modeBtns = document.querySelector(".buttons");
    //const lightBtnElm = document.querySelector('[data-mode="light"]');
    //const darkBtnElm = document.querySelector('[data-mode="dark"]');
    //const contrastBtnElm = document.querySelector('[data-mode="highcontrast"]');


    let setActiveColorMode = function(mode){
        let css = `link[rel="alternate stylesheet"]`;
        let stylesheets = document.querySelectorAll(css);
        //console.log(stylesheets); //vi tjekker lige om vi har fat i dem

        stylesheets.forEach(sheet => sheet.disabled=true)
        let selector = `link[title="${mode}"]`; //vi henter mode fra vores parameter "mode"
        let activeSheet = document.querySelector(selector);
        //console.log(activeSheet);
        activeSheet.disabled = false;
        localstModule.create("theme", mode);
    }

    let savedSheet = localstModule.read("theme") //vi skal lave en funktion der kan sørge for at ens valgte tema bliver husket selvom man refresher siden
    //console.log(savedSheet);
    if(savedSheet){ 
        setActiveColorMode(savedSheet)//vi sørger for at sætte et default sheet. Hvis den denne er true, så skal den bare springe resten over
    }else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){ //ellers hvis styresystemet er sat på dark mode, så skal det sættes til dark mode
        setActiveColorMode("dark")
    }else{
        setActiveColorMode("light")//og ellers skal det sættes til light mode
    }

    if(modeBtns){ //vi laver en samlet eventlistener til vores knapper 
        modeBtns.addEventListener("click", function(event){
            if(event.target !== event.currentTarget){ //hvis den div vi lytter på ikke er den vi klikker på (event.target er det element der registrerer klikket)
                setActiveColorMode(event.target.dataset.mode) //dataset referer til data attributten 
                console.log(event.target.dataset.mode); 
            }
        })
    }

})

