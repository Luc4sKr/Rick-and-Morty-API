
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
        
            var termoBusca = 'Rick Sanchez';
            for(var i=0; i < data.results.length; i++){ // COLOCAR O INPUT DA PÁGINA AQUI $(#INPUT).VAL();
        
      
               // console.log(`Nome: ${data.results[i].name}`); // COMPARAR ENTRADA DO INPUT COM O OBJETO
            
            
               if(data.results[i].name == nomeCharacter){
        
                console.log('ENCONTRADO');
                return true;
                
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


