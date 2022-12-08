import {Splide} from '../../../libs/libs.js'
import { debounce, splideArrowsExtention } from './Utils/index.js';



export const initSplideSliders = () => {
    let mounted = false;
    let healthSlider = new Splide( '#health-carousel', {
		cover      : true,
		heightRatio: (964/1600),
    fixedHeight: '100vh',
    breakpoints: {
      992: {
        fixedHeight: null,
        heightRatio: (280/375)
      },
    }
  } ).mount({splideArrowsExtention});


  let lobbySlider = new Splide( '#lobby-carousel', {
		cover      : true,
		heightRatio: (125/377),
    pagination: false
  } );


  let about2Slider = new Splide( '#about2-carousel', {
		cover      : true,
		heightRatio: (194/342),
    pagination: false
  } );

  

  function handleResize(){
    if(window.innerWidth <= 992) {
      if(!mounted) {
        console.log('dkd');
        lobbySlider.mount({splideArrowsExtention});
        about2Slider.mount({splideArrowsExtention})
        mounted = true;
      }
    } else {
      if(mounted) {
        lobbySlider.destroy();
        about2Slider.destroy();
        mounted = false;
      }
    }
  }
    handleResize();
    const debouncedHandleResize = debounce(handleResize, 350);
    window.addEventListener('resize', debouncedHandleResize);
}