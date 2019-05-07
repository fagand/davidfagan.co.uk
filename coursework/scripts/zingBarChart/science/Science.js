var students;
var arrayL;
var studentData = [];

var students2;
var arrayL2;
var studentData2 = [];

$(function () {
    var req = $.ajax({
        url: "https://api.worldbank.org/v2/countries/gbr/indicators/UIS.FOSEP.56.F800?format=json",
        type: "get",
        dataType: "json",
        success: function (data) {
            students = data[1];
            arrayL = students.length;
            for (var i = 0; i < arrayL; i++) {
                studentData.push([students[i].date, (students[i].value)]);
            }

            console.log(students);
        }
    });

    var req = $.ajax({
        url: "https://api.worldbank.org/v2/countries/gbr/indicators/UIS.FOSEP.56.F200?format=json",
        type: "get",
        dataType: "json",
        success: function (data) {
            students2 = data[1];
            arrayL2 = students2.length;
            for (var i = 0; i < arrayL; i++) {
                studentData2.push([students2[i].date, (students2[i].value)]);
            }

            console.log(students2);
        }
    });

    req.done(function chart() {

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
                "value-box": {
                    "expnonent": false,
                    "decimals": 1
                }
            },
            title: {
                text: students2[0].indicator.value,
                adjustLayout: 'true',
                "font-size": 15,
                wrapText: true
            },
            tooltip: {
                text: 'Year: %kt<br>Percent: %vv%'
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
    });
});
