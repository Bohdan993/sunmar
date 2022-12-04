
import {
	initInputs
} from '../model/index.js';



import {
	// $accordeons,
	$table,
	$btn,
	$content,
	$inputs
} from '../view/index.js';


const app = {
	init() {
		this.ii();
	},
	ii(){
		initInputs($table, $btn, $content,$inputs);
	}
}


export {
	app
}