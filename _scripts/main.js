const URL_API = 'https://rickandmortyapi.com/api/character';
var nomeCharacter = '';

$(document).ready(() => {
    $('#btn-buscar').click((e) => {
        e.preventDefault();
        var buscaText = $('.busca').val();
        if (validaBusca(buscaText)) {
            buscaPnome(buscaText);
        }
    });
});

const showMsgAlert = (msg) => {
    $('#msg-alert').html(msg);
    $('#alert').fadeIn('slow');
}

const validaBusca = (termo) => {
    if (termo != '') {
        nomeCharacter = termo;
        return true;
    }
}

const buscaPnome = (url) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
            for (var i = 0; i < data.results.length; i++) { // COLOCAR O INPUT DA PÁGINA AQUI $(#INPUT).VAL();
                if (data.results[i].name.toLowerCase() == nomeCharacter.toLowerCase()) {
                    let id = data.results[i].id;
                    saveId(id);
                    console.log(`ENCONTRADO, o ID É: ${id}`);
                    window.location.replace("conteudo.html");
                    return true;
                }
            }
            console.log('NÃO ENCONTRADO');
            return false;
        }
    });
}

const saveId = (id) => {
    window.localStorage.setItem('idPersonagem', id);
}


