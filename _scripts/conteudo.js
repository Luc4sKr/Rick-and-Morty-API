var URL_API_ID = 'https://rickandmortyapi.com/api/character/';

$(document).ready(()=>{ //Esse evento irá carregar a página HTML em questão
    
    console.log('PÁGINA CONTEÚDO CARREGADA');
    //buscaPnome();
    //getPagina('index.html', 'main');
    
    URL_API_ID += window.localStorage.getItem('idPersonagem'); 
    console.log(URL_API_ID);
    getCharacter(URL_API_ID);
})


const getCharacter = (url) => {
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
           

            //console.log('NÃO ENCONTRADO');
            //return false;
        }
    });

}