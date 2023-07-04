export function getter(element,property){
    return parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}
export function setter(element,property,value){
    element.style.setProperty(property,value)
}
export function incrementer(element,property,increment){
    setter(element,property,getter(element,property)+increment);
}