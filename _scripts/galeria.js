const URL_API = "https://rickandmortyapi.com/api/character";

$(document).ready((e) => {
    listCharacter();    
});


const listCharacter = () => {
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

                $(row).addClass("row g-0");
                $(columnImg).addClass("character col-md-4");
                $(columnImg).attr("id", `img-character-${i}`);
                getImg(character.url, `#img-character-${i}`);
                $(row).append(columnImg);

                $(columnImg).click((e) => {
                    getContent(character.id);
                });

                let columnBody = document.createElement("div");
                $(columnBody).addClass("col-md-8");

                let cardBody = document.createElement("div");
                $(cardBody).addClass("card-body p-2");
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
            $(dataHtml).attr("id", data.id);

            $(target).append(dataHtml);
        }
    });
}

const getContent = (idCharacter) => {
    $.ajax({
        url: "../conteudo.html",
        dataType: 'html',
        success: (pagina) => {
            $(".character-card").html(pagina);
            
            $.ajax({
                url: `${URL_API}/${idCharacter}`,
                dataType: "json",
                success: (data) => {
                    
                    // Head
                    $("#character-name").html(`${data.name}`);
                    $("#character-image").attr("src", data.image);
                    $("#character-image").css({
                        "width": "200px"
                    });

                    // Infos
                    $("#character-status").html(`Status: ${data.status}`);
                    $("#character-species").html(`Species: ${data.species}`);
                    $("#character-gender").html(`Gender: ${data.gender}`);
                    $("#character-origin").html(`Origin: ${data.origin.name}`);
                    
                    // Location
                    $.ajax({
                        url: data.location.url,
                        dataType: "json",
                        success: (data) => {
                            $("#character-location").html(`Location: ${data.name}`);
                            $("#location-type").html(`Location type: ${data.type}`);
                            $("#dimension").html(`Dimension: ${data.dimension}`);
                        }
                    });
                }
            })
        }
    });
}