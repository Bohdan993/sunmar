
import {
	initIntervalSlider,
	initFacilityGrid,
	initSplideSliders
} from '../model/index.js';



import {
	// $accordeons,
	$intervalSlider,
	$facilityGrid
	} from '../view/index.js';


const app = {
	init() {
		this.iis();
		this.ifg();
		this.iss();
	},
	iis(){
		initIntervalSlider($intervalSlider);
	},
	ifg(){
		initFacilityGrid($facilityGrid);
	},
	iss(){
		initSplideSliders();
	}
}


export {
	app
}