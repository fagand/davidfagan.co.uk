$(function () {
    $.ajax({
        url: "./data/uk.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            data.sort(function(a,b){
                return ('' + a.name).localeCompare(b.name)});

            var length = data.length;
            for (i = 0; i < length; i++) {

                name = data[i].name;
                domain = data[i].web_pages[0];
                var country = data[i].country;
                if (country == "United Kingdom") {
                    var a = document.createElement('a');
                    a.setAttribute('href', domain);
                    a.innerHTML = domain;

                    var paragraph = $("<div />", {
                        text: name,
                    });
                    $("#right").append(paragraph, a);
                }
            }
        }
    });
});
