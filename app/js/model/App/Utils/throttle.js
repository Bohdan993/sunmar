export function throttle(f, ms) {

    let isThrottled = false,
        t, a

    function d() {

        if (isThrottled) {
            t = this;
            a = arguments;
            return
        }

        f.apply(this, arguments)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (a) {
                d.apply(t, a);
                t = a = null;
            }
        }, ms)
    }

    return d
}