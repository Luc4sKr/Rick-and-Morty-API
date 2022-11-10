const getPagina = (url, target) => {
    $.ajax({
        url: `${url}`,
        dataType: 'html',
        success: (pagina) => {
            $(target).html(pagina);
        }
    });
}
