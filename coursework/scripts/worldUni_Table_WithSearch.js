$(function () {
    $.ajax({
        url: "./data/unis.json",
        type: "get",
        dataType: "json",
        success: function (data) {
            // Variable creating a table for storing the information
            var infoTable = $("<table />").attr("id", "tableOfUni");

            var arrayL = data.length;
            var outputString = '';
            
            // Start the search somewhere within the 9690 results and display another 49 results
            // Displaying the full data range slowed the page down majorly.
            var randomStart = Math.floor((Math.random() * 9690)+1);
            var randomUpTo = (randomStart+50);

            for (i = randomStart; i < randomUpTo; i++) {
                var tableRow = $("<tr />");

                titleString = data[i].name;
                countryString = data[i].country;
                var titleCell = $("<td />", {
                    text: titleString
                });
                var countryCell = $("<td/>",{
                    text: countryString
                });

                detailString = data[i].web_pages[0];
                

                var detailCell = $("<td />").html("<a href='" + detailString + "'>" + detailString + "</a>");

                tableRow
                    .append(titleCell)
                    .append(detailCell)
                    .append(countryCell);

                infoTable
                    .append(tableRow);


                $("#unimain").append(infoTable);
            }
        }
    });
});