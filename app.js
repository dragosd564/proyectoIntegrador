let nav = document.querySelectorAll('.nav-link');

var numero = [];
window.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
})

// const ctx = document.getElementById('myChart').getContext('2d');
const cuadro1 = document.getElementById('cuadro2').getContext('2d');
const data = {
    labels: [
      "nudo",
      'intencidad' ,
      'vientoNorte' ,
      'vientoNordeste',
      'vientoEste' ,
      'vientoSureste' ,
      'vientoSur' ,
      'vientoSuroeste' ,
      'vientoOeste' ,
      'vientoNoroeste' 
    ],
    datasets: [{
      label: 'Direccion del veinto',
      data: numero,
      backgroundColor: [
        'rgb(255, 99, 132,0.2)',
        'rgb(54, 162, 235,0.2)',
        'rgb(255, 205, 86,0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132,1)',
        'rgb(54, 162, 235,1)',
        'rgb(255, 205, 86,1)'
      ],
      hoverOffset: 4
    }]
  };

const chart = new Chart(cuadro1,{
    type: 'bar',
    data: data,
    options: {
        responsive: true
    }
})
function cargarDatos (){
  fetch('https://node-temperatura-api.herokuapp.com/temperatura')
            .then((response) => response.json())
            .then((data) => {
              console.log(data.body)
                const viento = data.body.map(
                  function(index){
                    return index.viento_norte;
                  })
                const vientosur = data.body.map(
                    function(index){
                      return index.viento_sur;
                    })
                  numero = [...viento,...vientosur],
                  console.log(numero)
                  chart.config.data.datasets[0].data = numero;
                  chart.update();
            });
}
Array.from(nav).forEach(item => {
    item.addEventListener('click', () => {
       let activeClass = document.querySelector('.active');
        activeClass.className = activeClass.className.replace('active', '');
        item.className += ' active';
    })
})
