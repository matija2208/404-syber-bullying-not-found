const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Želja za osvetom', 'Smatraju da druga osoba to zaslužuje', 'Zbog zabave', 'Ponižavanje druge osobe', 'Drugi razlozi', 'Zlonamernost', 'Želja za pokazivanjem pred prijateljima'],
      datasets: [{
        label: 'Najčešći razlozi digitalnog nasilja',
        data: [58, 58, 28, 21, 16, 14, 11],
        borderWidth: 1
      }]
    },
    options: {
        indexAxis: 'y',
      }
  });