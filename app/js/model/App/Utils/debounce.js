export function debounce(f, ms) {

    let isDebounced = false

    function d() {

        if (isDebounced) {
            return
        }

        f.apply(this, arguments)

        isDebounced = true;

        setTimeout(function () {
            isDebounced = false;
        }, ms)
    }

    return d
}