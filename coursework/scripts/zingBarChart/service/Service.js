var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function () {
    if (this.status == 200) {
        var response = JSON.parse(this.responseText);
        var characters = response[1];
        var characterData = [];
        var arrayL = characters.length;
        for (var i = 0; i < arrayL; i++) {
            characterData.push([characters[i].date, (characters[i].value)]);
        }

        /*
        characters.forEach(function(character) {
          characterData.push([character.date, 
          parseInt(character.value)]);
          });
          */
        console.log(arrayL);
        console.log(characters);
        console.log(characterData);

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
                text: characters[0].indicator.value,
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
                    values: characterData
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

xhr.open('GET', 'https://api.worldbank.org/v2/countries/gbr/indicators/SE.TER.ENRL?format=json');

xhr.send();
