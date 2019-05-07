$(function () {
    var req = $.ajax({
        url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=law",
        dataType: "jsonp"
    });
    req.done(function (data) {
        console.log(data);
    });
});