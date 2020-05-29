/* tslint:disable no-any */

export class CustomEventTarget implements EventTarget
{
	private listeners: any;

	public addEventListener (type: string, callback: (event: Event, ...args: any[]) => any): void
	{
		if (!this.listeners) {
			this.listeners = [];
		}
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}

	public removeEventListener (type: string, callback: () => any): void
	{
		if (!this.listeners || !(type in this.listeners)) {
			return;
		}
		const stack = this.listeners[type];
		const l = stack.length;

		for (let i = 0; i < l; i++) {
			if (stack[i] === callback) {
				stack.splice(i, 1);

				return;
			}
		}
	}

	public dispatchEvent (event: CustomEvent, data?: any): boolean
	{
		if (!this.listeners || !(event.type in this.listeners)) {
			return true;
		}
		const stack = this.listeners[event.type].slice();
		const l = stack.length;

		for (let i = 0; i < l; i++) {
			stack[i].call(this, event, data);
		}

		return !event.defaultPrevented;
	}
}
