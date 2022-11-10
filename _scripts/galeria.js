const URL_API = "https://rickandmortyapi.com/api/character/";

$(document).ready((e) => {
    getCharacter();  
    
    $("#character-0").click(() => console.log("teste"));

    // cliqueCard();  functio que espera o
});

const navegaDetalhesId = (id) =>{

}

const getCharacter = () => {
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

                // ***********************pegar id no clique
                $(card).click((e) => {

                    console.log(character.id);
                    cliqueCard(character.id);
                })
                
                // ***********************fim
                   
                
            });
        }
    });
}

// **********************************função para pegar caminho e concatenar com id
const cliqueCard = (cartId) =>{
    console.log("teste");
    var caminho = URL_API+cartId
    
    console.log(caminho);
    getDetails(caminho);
    
    };
// ******************************para pegar as informações, atualmente somente no console
const getDetails = (caminho) => {
    $.ajax({
        url: caminho,
        dataType: "json",
        success: (data) => {
            console.log(data.name)
        }
    });
}
// *********************************fim


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

