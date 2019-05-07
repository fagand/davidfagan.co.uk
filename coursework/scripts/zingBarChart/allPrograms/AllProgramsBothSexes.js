$(function () {
    $.ajax({
        url: "https://api.worldbank.org/v2/countries/gbr/indicators/SE.TER.ENRL?date=2009:2015&format=json",
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
            type: 'bar3d',
            "plot": {
                "stacked": 0,
                "line-width": 2,
                "value-box": {
                    "visible": 0
                },
                "animation": {
                    "delay": 2000,
                    "effect": "1"
                },
            },
            title: {
                text: students[0].indicator.value,
                adjustLayout: 'true',
                "font-size": 15,
                wrapText: true
            },
            tooltip: {
                text: 'Year: %kt<br>Number of students: %vv'
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
