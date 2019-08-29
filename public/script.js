define(function(require, exports, module) {
  const Music = document.getElementById("Music");
  const Game = document.getElementById("Game");
  const Movie = document.getElementById("Movie");

  const getData = () => {
    var list = new XMLHttpRequest();
    list.onreadystatechange = () => {
      if (list.readyState != 4) {
        return;
      }
      if (list.status >= 200 && list.status <= 300) {
        return list.responseText;
      }
    };
    list.open("get", "localhost:3000/data");
    list.send();
  };

  const getMusicCharts = async () => {
    const data = getData();
    var musicChart = new Chart(Music, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Favorite Genre",
            data: data[0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    });
    var gameChart = new Chart(Game, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Favorite Genre",
            data: repo.getQuestionData()[0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    });

    var movieChart = new Chart(Movie, {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label: "Favorite Genre",
            data: repo.getQuestionData(),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              gridLines: {
                offsetGridLines: true
              }
            }
          ]
        }
      }
    });
  };
});
