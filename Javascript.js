$(document).ready(function(){
    $('.searchbutton').click(function(){
        if(!$('.input').val()){
            $('.input').addClass("error");
            $('.spantext').show();
        } else{
            $('.spantext').hide();
            $('.input').removeClass("error");
            $(".searchbox").fadeIn(); 
        }
    });
}); 