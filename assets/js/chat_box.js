{
    
$('#chat-header-info>i').click(function(e){
    let self=this;
    $("#chat-box-popup").slideToggle(500,function(){
        $(this).css("bottom","55px");
        
    });
    $("#chat-header").css('transition','all 0.6s')

    $("#chat-header-info>i").toggleClass("fa-chevron-circle-up");
    $("#chat-header-info>i").toggleClass("fa-chevron-circle-down");
})
    
}