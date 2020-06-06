//export const icon = (info) => {
export const icon = (info) => {
    // const div = document.createElement('div');

    const iconContainer = `
    <div class="form">
    <input type="image"  src="./pages/elementos/icones/${info}-1.png"class="icon icon-1" id="${info}-1">
    <input type="image"  src="./pages/elementos/icones/${info}-2.png"class="icon icon-2" id="${info}-2"> 
    </div>`;

    return iconContainer;
};