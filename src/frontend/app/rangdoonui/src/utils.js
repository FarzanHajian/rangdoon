export function rgbToHex(red, green, blue) {
    return `${Number(red).toString(16).padStart(2,'0')}${Number(green).toString(16).padStart(2,'0')}${Number(blue).toString(16).padStart(2,'0')}`;
}