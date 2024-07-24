/**
 * The list of elements used for auto-generating 
 * all element functions
 */

const elements = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 
    'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 
    'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 
    'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 
    'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 
    'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 
    'link', 'main', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 
    'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 
    'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 
    'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 
    'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 
    'track', 'u', 'ul', 'var', 'video', 'wbr', 'acronym', 'applet', 'basefont', 
    'big', 'center', 'dir', 'font', 'frame', 'frameset', 'noframes', 'strike', 'tt'
];





/**
 * function to assign attributes to elements
 * 
 * @param {html-element} element 
 * @param {object} attributes 
 */
function setAttributes(element, attributes) {
    for (let key in attributes) {
       if (attributes.hasOwnProperty(key)) {
           element.setAttribute(key, attributes[key]);
       }
   }
}


/**
 * Generating all element functiions
 * 
 * @param {string} tag 
 * @returns 
 */
export function createElementFunction(tag) {
    /**
     * @param {any} config_
     * @returns
     * @private {element}
     */
    return (...config_) => {

        
        const element = document.createElement(tag);

        config_.forEach(async input => {

            if (typeof input === 'string') element.appendChild(document.createTextNode(input));
            if (typeof input === 'object') setAttributes(element, input);

            try{element.appendChild(input)}catch(e){}

        })

        return element;

    };
}

/**
 * making elements globaly available
 */
elements.forEach(tag => {
    window[tag] = createElementFunction(tag);
});
  
export default elements;