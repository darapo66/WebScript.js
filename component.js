import { elements, CompileDOM } from "./utils/utils.all.js";

class WebComponent {
    constructor(props = null) {
        this.props = props;
        this.state = {};
        this.eventListeners = {};
        this.virtualDOM = null;
    }

    render() {
        throw new Error(`render() method is not implemented!`);
    }

    addEventListener(event, handler) { 
        this.eventListeners[event] = handler;
        this.virtualDOM?.addEventListener(event, handler);
    }

    removeEventListener(event) {
        this.virtualDOM?.removeEventListener(event, this.eventListeners[event]);
        this.eventListeners[event] = null;
    }

    async build() {
        this.virtualDOM = await CompileDOM(this.render());
    }
}

/**
 * 
 * @param {function} setup_function 
 * a function in which you define everything about your component, must include a "self" parameter
 * @returns 
 */
const buildNewWebComponent = (setup_function) => {
    const webComponent = new WebComponent();
    (async () => await setup_function(webComponent))();
    return webComponent;
};

export default buildNewWebComponent;
