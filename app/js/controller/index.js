
import {
	initIntervalSlider,
	initFacilityGrid,
	initSplideSliders,
	initModal
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
		this.im();
	},
	iis(){
		initIntervalSlider($intervalSlider);
	},
	ifg(){
		initFacilityGrid($facilityGrid);
	},
	iss(){
		initSplideSliders();
	},
	im(){
		initModal();
	}
}


export {
	app
}