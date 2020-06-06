//export const icon = (info) => {
export default (info) => {
    const div = document.createElement('div');

    div.innerHTML = `
        <div class="form">
        <input type="image"  src="./pages/elementos/icones/${info}-1.png"class="icon icon-1" id="${info}-1">
        <input type="image"  src="./pages/elementos/icones/${info}-2.png"class="icon icon-2" id="${info}-2"> 
        </div>`;
    const idIcon1 = `#${info}-1`
    const idIcon2 = `#${info}-2`


    div.querySelector(idIcon1).addEventListener("click", () => {
        div.querySelector(idIcon2).style.display = "block"
        div.querySelector(idIcon1).style.display = "none"
    })
    div.querySelector(idIcon2).addEventListener("click", () => {
        div.querySelector(idIcon1).style.display = "block"
        div.querySelector(idIcon2).style.display = "none"
    })



    return div
        //  return iconContainer;
};