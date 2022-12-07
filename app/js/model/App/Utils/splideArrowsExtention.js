export function splideArrowsExtention( Splide, Components, options ) {
    /**
     * Optional. Called when the component is mounted.
     */
    function mount() {
        console.log(Splide);
        console.log(Components);
        let slides = Components.Slides.get();
        let slidesLen = slides.length;
        onMoved(slidesLen);
        Splide.on( 'moved', onMoved.bind(null, slidesLen) );
    }
  
    /**
     * Optional. Called when the Splide destroys the carousel.
     */
    function destroy() {
    }

    function onMoved(len) {

        if(Splide.index === 0) {
            Components.Arrows.arrows.prev.style.display = 'none';
        } else {
            Components.Arrows.arrows.prev.style.display = 'block';
        }

        if(Splide.index === len - 1) {
            Components.Arrows.arrows.next.style.display = 'none';
        } else {
            Components.Arrows.arrows.next.style.display = 'block';
        }

    }
  
    return {
      mount,
      destroy,
    };
  }