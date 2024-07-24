export default async function renderEventListener(component, event) {
    component.eventListeners[event]();
}