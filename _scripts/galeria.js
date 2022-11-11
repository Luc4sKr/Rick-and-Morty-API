const URL_API = 'https://rickandmortyapi.com/api/character';

$(document).ready((e) => {
    listCharacter();

    $("#btn-buscar").click((e) => {
        let url_character = "https://rickandmortyapi.com/api/character";
        e.preventDefault();
        var buscaText = $('.busca').val();

        if (validaBusca(buscaText)) {
            buscaPnome(url_character);
        }
    });
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

const validaBusca = (termo) => {
    if (termo != '') {
        nomeCharacter = termo;
        return true;
    }
    window.alert("Campo vazio!");
    return false;
}

const buscaPnome = (url) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
            for (var i = 0; i < data.results.length; i++) { 
                if (data.results[i].name.toLowerCase().includes(nomeCharacter.toLowerCase())) {
                    let id = data.results[i].id;
                    url = `${url}/${id}`;
                    getCharacterByid(url);
                    return true;
                }
            }
            window.alert("Não encontrado!");
            return false;
        }
    });
}

const getCharacterByid = (url) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {

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

            $(columnImg).click((e) => {
                getContent(data.id);
            });

            $(row).addClass("character row g-0");
            $(columnImg).addClass("col-md-4");
            $(columnImg).attr("id", `character-${data.id}`);
            getImg(data.url, `#character-${data.id}`);

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
        }
    });
}