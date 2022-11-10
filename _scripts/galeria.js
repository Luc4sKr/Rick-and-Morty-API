const URL_API = "https://rickandmortyapi.com/api/character";
var URL_A = "https://rickandmortyapi.com/api/character";


$(document).ready((e) => {
    getCharacter();    
});




$('#btn-buscar').click((e)=>{
   
    URL_A = "https://rickandmortyapi.com/api/character";
    e.preventDefault();
    var buscaText = $('.busca').val();
    validaBusca(buscaText);
    

});




const validaBusca = (termo) =>{

    if(termo != ''){

        nomeCharacter = termo; 
        buscaPnome(URL_API, 'main'); 
        

    } else {

        console.log('O CAMPO ESTÁ EM BRANCO');
        getCharacter(); 
    }

}


const buscaPnome = (url, target) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
        
         
            for(var i=0; i < data.results.length; i++){ // COLOCAR O INPUT DA PÁGINA AQUI $(#INPUT).VAL();
        
            
               if(data.results[i].name == nomeCharacter){
        
                let id = data.results[i].id;
                URL_A += '/';
                URL_A += id;  
                console.log('filtrando por id'+URL_A);
                getCharacterByid(URL_A);
                return true;

              
                // TRAZER SOMENTE O RESULTADO PROCURADO
                
                }
            
            }

            console.log('NÃO ENCONTRADO');
            return false;
        }
    });
}









const getCharacterByid = (url) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
        
            //var termoBusca = 'Rick Sanchez';
            console.log(data.name);
            console.log(data.status);
            console.log(data.species);
            console.log(data.origin.name);
            console.log(data.image);
            console.log(data.location.name);
           
            let listCharacter = document.createElement("div");
            $(listCharacter).addClass("row d-flex justify-content-center align-items-center");
            $("#getCards").html(listCharacter);

            
                let card = document.createElement("div");
                let row = document.createElement("div");
                let columnImg = document.createElement("div");

                $(card).addClass("card m-2");
                $(card).css({
                    maxWidth: "540px"
                })

                $(card).click((e) => {
                    console.log("click")
                });

                $(row).addClass("character row g-0");
                $(columnImg).addClass("col-md-4");
                $(columnImg).attr("id", `character-${data.id}`);
                getImg(data.url, `#character-${data.id}`);
                //$(`#character-${data.id}`).attr("src", data.image);

                $(row).append(columnImg);

                let columnBody = document.createElement("div");
                $(columnBody).addClass("col-md-8");

                let cardBody = document.createElement("div");
                $(cardBody).addClass("card-body p-4 pb-2 pt-3");
                $(columnBody).append(cardBody);

                let title = document.createElement("h5");
                $(title).addClass("card-title");
                $(title).html(`${data.name}`);


                let status = document.createElement("p");
                let species = document.createElement("p");
                let origin = document.createElement("p");

                $(status).html(`Status: ${data.status}`);
                $(species).html(`Species: ${data.species}`);
                $(origin).html(`Origin: ${data.origin.name}`)

                $(cardBody).append(title)
                    .append(status)
                    .append(species)
                    .append(origin);

                $(row).append(columnBody);
                $(card).append(row);
                $(listCharacter).append(card);

                URL_A = "https://rickandmortyapi.com/api/character"; 
        }
    });

}








const getCharacter = (URL) => {
    $.ajax({
        url: URL_API,
        dataType: "json",
        success: (data) => {

            let listCharacter = document.createElement("div");
            $(listCharacter).addClass("row d-flex justify-content-center align-items-center");
            $("#getCards").html(listCharacter);

            data.results.forEach((character, i) => {
                let card = document.createElement("div");
                let row = document.createElement("div");
                let columnImg = document.createElement("div");

                $(card).addClass("card m-2");
                $(card).css({
                    maxWidth: "540px"
                })

                $(card).click((e) => {
                    console.log("click")
                });

                $(row).addClass("character row g-0");
                $(columnImg).addClass("col-md-4");
                $(columnImg).attr("id", `character-${i}`);
                getImg(character.url, `#character-${i}`);
                $(row).append(columnImg);

                let columnBody = document.createElement("div");
                $(columnBody).addClass("col-md-8");

                let cardBody = document.createElement("div");
                $(cardBody).addClass("card-body p-4 pb-2 pt-3");
                $(columnBody).append(cardBody);

                let title = document.createElement("h5");
                $(title).addClass("card-title");
                $(title).html(`${character.name}`);


                let status = document.createElement("p");
                let species = document.createElement("p");
                let origin = document.createElement("p");

                $(status).html(`Status: ${character.status}`);
                $(species).html(`Species: ${character.species}`);
                $(origin).html(`Origin: ${character.origin.name}`)

                $(cardBody).append(title)
                    .append(status)
                    .append(species)
                    .append(origin);

                $(row).append(columnBody);
                $(card).append(row);
                $(listCharacter).append(card);

                URL_A = "https://rickandmortyapi.com/api/character"; 
            });
        }
    });
}




const getImg = (url, target) => {
    return $.ajax({
        url: url,
        dataType: "json",
        success: (data) => {
            let dataHtml = document.createElement("img");

            $(dataHtml).addClass("img-fluid rounded-start");
            $(dataHtml).attr("src", data.image);

            $(target).append(dataHtml);
        }
    });
}

