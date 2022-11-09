const getPagina = (url, target) => {
    $.ajax({
        url: `_views/${url}`,
        dataType: 'html',
        success: (pagina) => {
            $(target).html(pagina);
        }
    });
}