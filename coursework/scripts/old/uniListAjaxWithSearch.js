// Fiddle - http://jsfiddle.net/0_david/gb7rLkj1/3/
$(function () {
    var req = $.ajax({
        url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=computer",
        dataType: "jsonp"
    });
    req.done(function (data) {
        console.log(data);
        var unorderedList = $("<ul />", {
            "id": "titles"
        });

        var arrayL = data.length;
        var outputString = '';

        for (i = 0; i < arrayL; i++) {
            outputString = data[i].title;
            var listItem = $("<li />", {
                id: i,
                text: outputString
            });
            unorderedList
                .append(listItem);
        }
        $("#unimain").append(unorderedList);
    });
    $("#inputChoice").on("blur", function () {
        var choice = $(this).val();
        var req = $.ajax({
            url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=" + choice,
            dataType: "jsonp"
        });
        req.done(function (data) {
            console.log(data);
            var unorderedList = $("<ul />", {
                "id": "titles"
            });
            var arrayL = data.length;
            var outputString = '';
            for (var i = 0; i < arrayL; i++) {
                outputString = data[i].title;
                var listItem = $("<li />", {
                    id: i,
                    text: outputString
                });
                unorderedList.append(listItem);
            }
            $("ul").replaceWith(unorderedList);
        });
    });
});
