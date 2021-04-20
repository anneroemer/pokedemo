const localstModule = (function (){ //vi laver et modul som en IIFE
    
    const create = function(name, data){

        if(typeof(data) === "object"){
            console.log("hey, du skriver et objekt!");
            data = JSON.stringify(data)
        }

        localStorage.setItem(name, data)
    }

    const read = function(name){
        let readValue = localStorage.getItem(name);
        
        //console.log(!isNaN(readValue))
       
        if(readValue && readValue.charAt(0) === "{" && readValue.endsWith("}")){ //vi tjekker først om den findes derefter om første char er et { og derefter om sidste char er et }
            readValue = JSON.parse(readValue)
        }
        if(readValue && !isNaN(readValue)){
            readValue = Number(readValue) //her får vi decimalerne med, hvis der er decimaler
        }

        return readValue

    }

    const remove = function(name){
        localStorage.removeItem(name);
    }

    //vi returnerer et objekt, som indeholder vores tre funktioner
    return {
        create, 
        read, 
        remove
    }

})();