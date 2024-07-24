import { elements } from "./webscript.js";
import { elapsed, renderEventListener } from "./utils/utils.all.js";

export default class Root {
    constructor(root_id = null) {
        this.root = document.getElementById(root_id) || document.body;
        this.globalProps = {};
        this.loadedComponent = null;
    }

    setGlobalPropertie(name, value) {
        this.globalProps[name] = value;
    }

    removeGlobalPropertie(name) {
        delete this.globalProps[name];
    }

    async renderWebComponent(component) {
        const elapsed_time = elapsed();

        if (this.loadedComponent) {
            const { eventListeners } = this.loadedComponent;
            if (eventListeners?.onPreRemove) await renderEventListener(this.loadedComponent, "onPreRemove");
            this.root.innerHTML = "";
            if (eventListeners?.onRemove) await renderEventListener(this.loadedComponent, "onRemove");
            this.loadedComponent = null;
        }

        this.loadedComponent = component;
        await component.build();

        const { eventListeners } = component;
        if (eventListeners?.onPreRender) await renderEventListener(component, "onPreRender");
        this.root.appendChild(component.virtualDOM);
        if (eventListeners?.onRender) await renderEventListener(component, "onRender");

        console.log(`Component rendered successfully! Time elapsed: ${elapsed(elapsed_time)}ms`);
    }
}
