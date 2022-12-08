import { Isotope } from "../../../libs/libs.js"
import { isElementInViewport } from "./Utils/index.js";


export const initFacilityGrid = (grid) => {
    const numOfItems = 6;
    let isStamped = false;
    let $stamp = grid.querySelector('.stamp');
    let $stampImg = $stamp.querySelector('img');
    let $textContainer = grid.querySelector('span');
    let $sizer = grid.querySelector('.grid-sizer');
    let visibleItems = [];
    let reLayout = false;



    const iso = new Isotope( grid, {
        // options
        percentPosition: true,
        transitionDuration: '1.3s',
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid-sizer'
        }

    });
    let coef = Math.ceil(iso.items.length / numOfItems);
    grid.style.maxHeight = 762 * coef + 'px';

    console.log(iso)

    iso.items.forEach(item => {
        const bindedHandleClick = handleClick.bind(null, item.element, iso.items);
        item.element.addEventListener('click', bindedHandleClick);
        item.element.addEventListener('transitionend', handleTransitionend);
    })

    $stamp.addEventListener('click', handleStampClick);
    $stampImg.addEventListener('transitionend', handleTransitionend);

    function handleClick(element, items, e) {
        if(!isStamped) {
            let pos = element.dataset.position;
            let text = element.dataset.text;
            let src = element.querySelector('img').src;
            $stampImg.src = src;
            $textContainer.innerText = text;
            $textContainer.className = '';
            $textContainer.classList.add(pos);
            iso.stamp($stamp);
            grid.classList.add('stamped');
        }

        iso.layout();
        isStamped = true;
    }

    function handleStampClick(e) {
        if(isStamped) {
            iso.unstamp($stamp);
            grid.classList.remove('stamped');
            visibleItems.forEach(item => {
                item.classList.remove('grid-item--width3');
            });
            visibleItems = [];
            $sizer.style.width = "20%";
        }

        iso.layout();
        isStamped = false;
        reLayout = false;
    }

    function handleTransitionend(e) {
        iso.layout();
    }

    iso.on( 'layoutComplete', function( laidOutItems ) {
        if(isStamped && !reLayout) {

            laidOutItems.forEach(item => {
                if(isElementInViewport(item.element)) {
                    item.element.classList.add('grid-item--width3');
                    visibleItems.push(item.element);
                }
                $sizer.style.width = "25%";

            })

            // iso.layout();
            reLayout = true;
        }
    } )

}