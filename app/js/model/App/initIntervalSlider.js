const initIntervalSlider = ($slider) => {
    let $images = $slider.querySelectorAll('img');
    let index = 0;
    let timer;

    function start(){

        $images.forEach(($img, ind) => {
            if($img.classList.contains('active')) {
                index = ind + 1;
            }
        })

        $images.forEach($img => {
            $img.classList.remove('active');
        })

        if(index === $images.length) {
            index = 0;
        }

        $images[index].classList.add('active');

        if(timer != undefined) clearTimeout(timer);

        

        timer = setTimeout(start, 5000);

        console.log($images.length);
    }


    start();
}


export  {
    initIntervalSlider
}