$(document).ready((e) => {
    $("#btn-voltar").click((e) => {
        $("#info-card").remove();
        
        let characterCard = $(".character-card");
        let row = document.createElement("div");
        let title = document.createElement("h1");
        let getCards = document.createElement("div");

        $(row).addClass("row");
        $(title).addClass("text-center");
        $(getCards).attr("id", "getCards");

        $(row).append($(title))
            .append($(getCards));

        $(characterCard).append($(row));

        listCharacter();
    });
});