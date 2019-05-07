$(function () {
    var req = $.ajax({
        url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=law",
        dataType: "jsonp"
    });

    req.done(function (data) {
        console.log(data);
        var list = $("<ul/>", {
            "id": "titles"
        });
        var details = $("<div/>", {
            "id": "details"
        });

        var arrayLength = data.length;
        var outputString = '';

        for (var i = 0; i < arrayLength; i++) {
            outputString = data[i].title;
            var listItem = $("<li/>", {
                id: i,
                text: outputString
            });

            list
                .append(listItem);
        }
        $("body")
            .append(list)
            .append(details);

        $("body").on("click", "li", function () {
            console.log("hello");
            var i = parseInt(this.id);
            $("#details").html(function () {
                return data[i].description;
            });
        });
    });
});
$("#inputChoice").on("blur", function () {
    console.log("We're in teh blur boss");
    
    var choice = $(this).val();
    var req = $.ajax({
        url: "http://universities.hipolabs.com/search?name=" + choice,
        dataType: "jsonp"
    });
    req.done(function (data) {
        var list = $("<ul/>", {
            "id": "titles"
        });

        var arrayLength = data.length;
        var outputString = '';

        for (var i = 0; i < arrayLength; i++) {
            outputString = data[i].title;
            var listItem = $("<li/>", {
                id: i,
                text: outputString
            });

            list
                .append(listItem);
        }
        $("ul").replaceWith(list);
    });
});
