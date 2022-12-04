import { EventObserver } from "./Utils/observer.js";
import { ajaxCatalog } from './ajaxCatalog.js'

const initInputs = ($table, $btn, $content, $inputs) => {

    const $total = $table.querySelector('.table-calc__total .total');

    const state = {
        total: 0,
        inputs: {}
    }

    const observer = new EventObserver();

    const observerSubscribeHandle = (total) => {
        if(state.total === 0) {
            $total.innerText = 0;
        } else {
            $total.innerText = (total / 1000).toFixed(2) + 'кВт (' + ((total / 1000) / 0.8).toFixed(1) + 'кВа)';
        }
    }
  
    observer.subscribe(observerSubscribeHandle);
  
    $table.addEventListener('change', handleChange);
    $table.addEventListener('input', handleInput);
    $btn.addEventListener('click', handleClick);

    function handleChange(e){
        let target = e.target;
        if (target.tagName != 'INPUT') return;

        let power = target.dataset.power;
        let value = target.value;
        let key = target.dataset.id;


        if(!(key in state.inputs)) {
            let totalPower = +value * +power;
            state.inputs[key] = totalPower;
            state.total += totalPower;
            observer.broadcast(state.total);
            console.log(state.total)
        } else {
            let prevTotalPower = state.inputs[key];
            let totalPower = +value * +power;
            state.inputs[key] = totalPower;
            state.total = state.total - prevTotalPower + totalPower;
            observer.broadcast(state.total);
        }

    }


    function handleInput(e){
        let target = e.target;
        if (target.tagName != 'INPUT') return;

        let value = target.value;
        target.value = value.replace(/\D/g,'');
    }


    function handleClick(e) {
        if(state.total === 0) {
            alert('Відсутні введені дані');
            return;
        }

        ajaxCatalog((state.total / 1000).toFixed(2), $content, this);

    }

    function removeDisabledAndClearValue(inputs) {
        inputs.forEach((input)=>{
            input.disabled = false;
            input.value = 0;
        })
    }

    removeDisabledAndClearValue($inputs);




}

export {
    initInputs
}