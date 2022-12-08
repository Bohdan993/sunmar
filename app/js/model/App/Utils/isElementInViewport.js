export function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    let rect = el.getBoundingClientRect();

    let bottomOverflow = rect.bottom - (window.innerHeight || document.documentElement.clientHeight);
    let height = rect.height;
    let visiblePercantage = bottomOverflow > 0 ? 
        (height - bottomOverflow) > 0 ? 
            (((height - bottomOverflow)/height)*100) : 0 
         : 100;

    let topOverflow = rect.top;
    let visiblePercantage2 = topOverflow < 0 ?
        (height + topOverflow) > 0 ? (((height + topOverflow)/height)*100) : 0 : 100;

    return (
        ((rect.top >= 0) || (visiblePercantage2 >=1)) &&
        rect.left >= 0 &&
        ((rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) || (visiblePercantage >= 1)) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}