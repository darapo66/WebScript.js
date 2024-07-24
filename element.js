import CompileDOM from "./utils/compileDOM.js";
import elements from "./utils/elements.functions.js";

export default function createNewElement(rendering_code) {
    if (Array.isArray(rendering_code)) {
        const container = div({
            style: `
                margin: 0%;
                background-color: transparent;
                width: 100%;
                height: 100%;
                padding: 0;
            `
        });

        rendering_code.forEach(element => {
            container.appendChild(
                typeof element === "string" ? document.createTextNode(element) : element
            );
        });

        return () => container;
    }

    return () => rendering_code;
}
