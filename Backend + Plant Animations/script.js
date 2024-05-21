document.addEventListener('DOMContentLoaded', () => {
    //
    function fetchMetric() {
        fetch('/metric')
            .then(response => response.json())
            .then(data => {
                document.getElementById('metric-value').textContent = data.metric;
                data.metric=parseInt(data.metric)
                updatePlant(data.metric)
            })
            .catch(error => console.error('Error fetching metric:', error));
    }

    function fetchStatus() {
        fetch('/status')
            .then(response => response.json())
            .then(data => {
                document.getElementById('status-value').textContent = data.status ? 'Yes' : 'No';
            })
            .catch(error => console.error('Error fetching status:', error));
    }

    function updatePlant (metric) {
        console.log(metric)
        const leaves1 = document.getElementById('leaf1');
        const leaves2 = document.getElementById('leaf2');   
        const leaves3 = document.getElementById('leaf3');
        const leaves4 = document.getElementById('leaf4');
        const leaves5 = document.getElementById('leaf5');
        const leaves6 = document.getElementById('leaf6');
        const leaves7 = document.getElementById('leaf7');
        const leaves8 = document.getElementById('leaf8');
        const leaves9 = document.getElementById('leaf9');
        const leaves10 = document.getElementById('leaf10');
        const leaves11 = document.getElementById('leaf11');
        const leaves12 = document.getElementById('leaf12');
        const leaves13 = document.getElementById('leaf13');

        const flower1 = document.getElementById('flower1');
        const flower2 = document.getElementById('flower2');
        const flower3 = document.getElementById('flower3');
        const flower4 = document.getElementById('flower4');
        const flower5 = document.getElementById('flower5');
        const flower6 = document.getElementById('flower6');

        const stem_med = document.getElementById('stem-medium');
        const stem_med_crippled = document.getElementById('stem-mediumcrippled');
        const stem_long = document.getElementById('stem-long');

        const crippledleaves1 = document.getElementById('crippledleaf1');
        const crippledleaves2 = document.getElementById('crippledleaf2');
        const crippledleaves3 = document.getElementById('crippledleaf3');
        const crippledleaves4 = document.getElementById('crippledleaf4');

        
        // logic for getting the x value metric from backend'
        metric = 2;
        
        if (metric <= 1) { 
            stem_med_crippled.style.opacity = '1';

            crippledleaves1.style.opacity = '0';
            crippledleaves2.style.opacity = '1';
            crippledleaves3.style.opacity = '1';
            crippledleaves4.style.opacity = '0';

        } else if (metric === 2) {
            stem_med_crippled.style.opacity = '1';
            crippledleaves1.style.opacity = '1';
            crippledleaves4.style.opacity = '0';
            crippledleaves3.style.opacity = '1';
            crippledleaves2.style.opacity = '0';

        } else if ( metric === 3){
            stem_med_crippled.style.opacity = '1';
            crippledleaves1.style.opacity = '1';
            crippledleaves2.style.opacity = '0';
            crippledleaves3.style.opacity = '0';
            crippledleaves4.style.opacity = '1';
            

        } else if (metric=== 4){
            stem_med_crippled.style.opacity = '1';

            // green leaves
        } else if (metric === 5){
            stem_med.style.opacity = '1';
            leaves1.style.opacity = '1';

            stem_med_crippled.style.opacity = '0';
            

        } else if (metric === 6){
            stem_med.style.opacity = '1';
            leaves1.style.opacity = '1';
            leaves2.style.opacity = '1';
            leaves3.style.opacity = '1';

        } else if (metric === 7){
            stem_med.style.opacity = '1';
            leaves1.style.opacity = '1';
            leaves2.style.opacity = '1';
            leaves3.style.opacity = '1';
            leaves4.style.opacity = '1';
            leaves5.style.opacity = '1';
            leaves6.style.opacity = '1';
            leaves7.style.opacity = '1';

        } else if (metric === 8){
            leaves1.style.opacity = '1';
            leaves2.style.opacity = '1';
            leaves3.style.opacity = '1';
            leaves4.style.opacity = '1';
            leaves5.style.opacity = '1';
            leaves6.style.opacity = '1';
            leaves7.style.opacity = '1';
            leaves8.style.opacity = '1';
            leaves9.style.opacity = '1';
            leaves10.style.opacity = '1';


            //stem will elongate here
            stem_long.style.opacity = '1';
            stem_med.style.opacity = '0';
        } else if (metric === 9){
            stem_long.style.opacity = '1';
            leaves1.style.opacity = '1';
            leaves2.style.opacity = '1';
            leaves3.style.opacity = '1';
            leaves4.style.opacity = '1';
            leaves5.style.opacity = '1';
            leaves6.style.opacity = '1';
            leaves7.style.opacity = '1';
            leaves8.style.opacity = '1';
            leaves9.style.opacity = '1';
            leaves10.style.opacity = '1';
            leaves11.style.opacity = '1';
            leaves12.style.opacity = '1';
            leaves13.style.opacity = '1';
        } else if (metric === 10){
            stem_long.style.opacity = '1';
            leaves1.style.opacity = '1';
            leaves2.style.opacity = '1';
            leaves3.style.opacity = '1';
            leaves4.style.opacity = '1';
            leaves5.style.opacity = '1';
            leaves6.style.opacity = '1';
            leaves7.style.opacity = '1';
            leaves8.style.opacity = '1';
            leaves9.style.opacity = '1';
            leaves10.style.opacity = '1';
            leaves11.style.opacity = '1';
            leaves12.style.opacity = '1';
            leaves13.style.opacity = '1';
            // implement the flowers here
            flower1.style.opacity = '1';
            flower2.style.opacity = '1';
            flower3.style.opacity = '1';
            flower4.style.opacity = '1';
            flower5.style.opacity = '1';
            flower6.style.opacity = '1';
        } 
    }
    setInterval(fetchMetric, 1000);
    setInterval(fetchStatus, 1000);
});