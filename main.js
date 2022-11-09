
const URL_API = 'https://rickandmortyapi.com/api/character'
var nomeCharacter = '';

$(document).ready(()=>{ //Esse evento irá carregar a página HTML em questão
    
    console.log('PÁGINA CARREGADA');
    //buscaPnome();
    //getPagina('index.html', 'main');
    
   
})




$('#btn-buscar').click((e)=>{
   
    
    e.preventDefault();
    var buscaText = $('.busca').val();
    validaBusca(buscaText);
    

});


const showMsgAlert = (msg) => {
    $('#msg-alert').html(msg);
    $('#alert').fadeIn('slow');


}



const validaBusca = (termo) =>{

    if(termo != ''){

        nomeCharacter = termo; 
        buscaPnome(URL_API, 'main'); 

    } else {

        console.log('O CAMPO ESTÁ EM BRANCO');
    }


}




const buscaPnome = (url, target) => {
    $.ajax({
        url: url,
        dataType: 'json',
        success: (data) => {
        
            //var termoBusca = 'Rick Sanchez';
            for(var i=0; i < data.results.length; i++){ // COLOCAR O INPUT DA PÁGINA AQUI $(#INPUT).VAL();
        
      
               
            
            
               if(data.results[i].name == nomeCharacter){
        
                
                console.log('ENCONTRADO');
                return true;

                //ADD UM HREF AQUI PARA A PÁGINA CONTEÚDO
                // E ADD O NOME DO OBJETO NO LOCALSTORAGE, ELE VAI SER PASSADO PARA COMPOR O LINK NA OUTRA PÁGINA
                
                }
            
            
            }

            console.log('NÃO ENCONTRADO');
            return false;
        }
    });
}





const getPagina = (url, target) => {
    $.ajax({
        url: url,
        dataType: 'html',
        success: (pagina) => {
            $(target).html(pagina);
            console.log('CARREGADO COM SUCESSO');
        }
    });
}


