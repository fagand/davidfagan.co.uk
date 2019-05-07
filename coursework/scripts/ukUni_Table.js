$(function () {
    $.ajax({
        url: "https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var infoTable = $("<table />").attr("id", "tableOfUni");

            var arrayL = data.length;
            var outputString = '';

            for (var i = 0; i < arrayL; i++) {
                var uk = data[i].country;
                if (uk == "United Kingdom") {
                    var tableRow = $("<tr />");

                    titleString = data[i].name;
                    var titleCell = $("<td />", {
                        text: titleString
                    });

                    detailString = data[i].web_pages[0];

                    var detailCell = $("<td />").html("<a href='" + detailString + "'>" + detailString + "</a>");

                    tableRow
                        .append(titleCell)
                        .append(detailCell);

                    infoTable
                        .append(tableRow);


                    $("#unimain").append(infoTable);
                }
            }
        }
    });
});
