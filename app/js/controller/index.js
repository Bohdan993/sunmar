
import {
	initIntervalSlider,
	initFacilityGrid,
	initSplideSliders,
	initModal,
	initSendForm
} from '../model/index.js';



import {
	// $accordeons,
	$intervalSlider,
	$facilityGrid,
	$form
	} from '../view/index.js';


const app = {
	init() {
		this.iis();
		this.ifg();
		this.iss();
		this.im();
		this.isf();
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
	},
	isf(){
		initSendForm($form);
	}
}


export {
	app
}