$(function () {
    var req = $.ajax({
        url: "http://api.lmiforall.org.uk/api/v1/soc/search?q=law",
        dataType: "jsonp"
    });
    
    req.done(function (data) {
        console.log(data);
        var infoTable = $("<table/>");
    
        var arrayLength = data.length;
        var String = '';
        
        for (var i = 0; i< arrayLength; i++)
            {
                var tableRow = $("<tr/>");
                
                titleString = data[i].title;
                var titleCell = $("<td/>",{
                    text: titleString
                });
                
                detailString = data[i].description;
                var detailCell = $("<td/>", {
                    text: detailString
                });
                
                tableRow
                .append(titleCell)
                .append(detailCell);
                
                infoTable
                .append(tableRow);
            }
        $("body").append(infoTable);
    });
});