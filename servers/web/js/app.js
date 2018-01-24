let activeModule = '';

const changeModule = (moduleName) => {
    
    if(activeModule != '') {
        try {
            eval('module_' + activeModule + '_reset(true)')
        }
        catch(error) {}
    }
    
    activeModule = moduleName;
    
    var loadingHtml = '<div class="container"><div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
    loadingHtml += '<span class="sr-only">Loading 0% Complete</span></div></div></div>';
    $("#app").html(loadingHtml);
    
    var i = 0, iHold = setInterval(() => {
        if(i >= 2000) {
            clearInterval(iHold);
            return eval('module_' + activeModule + '_init()');
        }
        i += 300;
        var value = Math.floor((i/2000)*100);
        $("#app div.progress-bar").attr('aria-valuenow', value).css('width', value + '%').find('span').text('Loading ' + value + '% Complete');
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => changeModule('kill'));
$('*[data-tool]').on('click', function(event) { changeModule($(this).data('tool')); });