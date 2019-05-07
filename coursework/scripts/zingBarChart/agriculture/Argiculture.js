$(function () {
    $.ajax({
        url: "https://api.worldbank.org/v2/countries/gbr/indicators/UIS.FOSEP.56.F800?date=2009:2015&format=json",
        type: "get",
        dataType: "json",
        success: function (data) {
            var students = data[1];
        var studentData = [];
        var arrayL = students.length;
        for (var i = 0; i < arrayL; i++) {
            studentData.push([students[i].date, (students[i].value)]);
        }

        /*
        students.forEach(function(character) {
          studentData.push([character.date, 
          parseInt(character.value)]);
          });
          */
        console.log(arrayL);
        console.log(students);
        console.log(studentData);

        var chartOneData = {
            type: 'bar',
            "plot": {
                "stacked": 0,
                "line-width": 2,
                "value-box": {
                    "visible": 0
                },
                "animation": {
                    "effect": "11",
                    "sequence":"ANIMATION_BY_NODE",
                },
                "value-box": {
                    "expnonent": false,
                    "decimals": 1
                }
            },
            title: {
                text: students[0].indicator.value,
                adjustLayout: 'true',
                "font-size": 15,
                wrapText: true
            },
            scaleX: {
                item: {
                    angle: '-45'
                }
            },
            plotarea: {
                margin: 'dynamic'
            },
            series: [
                {
                    values: studentData
        }
      ]
        };

        zingchart.render({
            id: 'chartOne',
            data: chartOneData,
            height: '30%',
            width: '100%',
        });

    }
});
});
