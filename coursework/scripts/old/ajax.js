$(function () {
    $.ajax({
        url: "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log(data.name);
            for (i = 0; i < 10; i++) {
                name = data[i].name;
                country = data[i].country;
                domain = data[i].web_pages[0];

                var a = document.createElement('a');
                a.setAttribute('href', domain);
                a.innerHTML = domain;

                var paragraph = $("<div />", {
                    text: name,
                });
                $("#right").append(paragraph, a);
            }
        }
    });
});