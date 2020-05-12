function createFocusEffect(element){
    $(`#${element}`).focus(function(){
        $(`#${element}-container`).addClass('bg-grey'); 
    });
    $(`#${element}`).focusout(function(){
        $(`#${element}-container`).removeClass('bg-grey'); 
    }); 
}
createFocusEffect('description'); 
createFocusEffect('category'); 
createFocusEffect('due-date');

$('#dlt-btn').on('click', function(){
    var checked = [];
    $('.pending-todo:checked').each(function(){
        checked.push($(this).val()); 
    }); 
    if(checked.length > 0 ){
        window.location.pathname = "/delete-task/" + checked; 
    }
});

$('.details').on('click', function(){
    var toggle = $(this).children('.pending-todo').prop('checked'); 
    if(toggle){
        $(this).children('.pending-todo').prop('checked', false); 
    }else{
        $(this).children('.pending-todo').prop('checked', true); 
    }
}); 

$('#add-new-task').on('submit', function(e){
    var desc = $('#description').val(); 
    var date = $('#due-date').val(); 
    if(desc.trim() =="" || date.trim() == ""){
        alert("Please fill description and select date..."); 
        e.preventDefault(); 
    }
});

$('#link').text(window.location.hostname);