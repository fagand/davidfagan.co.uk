$(function(){
$(window).resize(function () {
        if ($(window).width() <= 600) {
            $('#navLabel').text('Nav');
        } else {
            $('#navLabel').text('Navigation');
        }
    });
});