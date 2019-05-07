$(function () {
    $.ajax({
        url: "./data/unis.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var infoTable = $("<table />");

            var arrayL = data.length;
            var outputString = '';

            for (i = 0; i < 100; i++) {
                var tableRow = $("<tr />");

                titleString = data[i].name;
                var titleCell = $("<td />", {
                    text: titleString
                });

                detailString = data[i].web_pages;
                var a = document.createElement('a');
                a.setAttribute('href', detailString);
                a.innerHTML = detailString;
                var detailCell = $("<td />", {
                    text: a
                });

                tableRow
                    .append(titleCell)
                    .append(detailCell);

                infoTable
                    .append(tableRow);


                $("#unimain").append(infoTable);
            }
        }
    });
    $("#inputChoice").on("blur", function () {
        var choice = $(this).val();
        var req = $.ajax({
            url: "http://universities.hipolabs.com/search?name=" + choice,
            dataType: "jsonp"
        });
        var arrayL = data.length;
        var outputString = '';
        for (var i = 0; i < arrayL; i++) {
            var listItem = $("<li />", {
                id: i,
                text: outputString
            });
        }
    });
});
