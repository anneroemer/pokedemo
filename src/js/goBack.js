document.addEventListener("DOMContentLoaded", function(){

    let goBackElm = document.querySelector(".goBack");

    if(goBackElm){
        goBackElm.addEventListener("click", function(){
            history.back();
        })
    }

})