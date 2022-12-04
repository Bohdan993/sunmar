export const ajaxCatalog = (power, el, btn) => {

    let num = Math.ceil(Number(power)).toFixed(0);
    let numLen = String(num).length;

    fetch(`https://agent-energy.com.ua/calculator/ajax.php/?AJAX_GET=Y&GLOBAL_FILTER=a%3A4%3A%7Bs%3A6%3A%22ACTIVE%22%3Bs%3A1%3A%22Y%22%3Bs%3A9%3A%22IBLOCK_ID%22%3Bs%3A2%3A%2226%22%3Bs%3A14%3A%22%3E%3DPROPERTY_665%22%3Bs%3A${numLen}%3A%22${num}%22%3Bs%3A10%3A%22SECTION_ID%22%3Ba%3A3%3A%7Bi%3A0%3Bi%3A156%3Bi%3A1%3Bi%3A155%3Bi%3A2%3Bi%3A154%3B%7D%7D`, {
        method: 'get',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
    .then(res=> res.text())
    .then(text => {el.innerHTML = text; btn.remove();})
    .catch(err => console.error(err));
}