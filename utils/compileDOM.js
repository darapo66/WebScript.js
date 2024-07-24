import { elements } from "./utils.all.js";

const CompileDOM = (virtualDOM) => {
    if (Array.isArray(virtualDOM)) {
        if (virtualDOM.length > 1) {
            const container = div({
                style: `
                    margin: 0%;
                    background-color: transparent;
                    width: 100%;
                    height: 100%;
                    padding: 0;
                `
            });

            virtualDOM.forEach(element => container.appendChild(element));
            return container;
        } 
        return virtualDOM[0];
    }
    return virtualDOM;
};

export default CompileDOM;