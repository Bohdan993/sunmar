import {Splide} from '../../../libs/libs.js'
import { debounce, splideArrowsExtention } from './Utils/index.js';



export const initSplideSliders = () => {
    let mounted = false;
    let healthSlider = new Splide( '#health-carousel', {
		cover      : true,
		heightRatio: 0.5,
  } ).mount({splideArrowsExtention});

  function handleResize(){
    if(window.innerWidth <= 992 && !mounted) {


        mounted = true;
    } else {
        // healthSlider.destroy();
        mounted = false;
    }
  }
    handleResize();
    const debouncedHandleResize = debounce(handleResize, 350);
    window.addEventListener('resize', debouncedHandleResize);
}