
import {
	initIntervalSlider,
	initFacilityGrid
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
	},
	iis(){
		initIntervalSlider($intervalSlider);
	},
	ifg(){
		initFacilityGrid($facilityGrid);
	}
}


export {
	app
}