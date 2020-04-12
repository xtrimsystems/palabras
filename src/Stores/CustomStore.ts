import { Writable, writable } from 'svelte/store';

declare type Subscriber<T> = (value: T) => void;
declare type Invalidater<T> = (value?: T) => void;
declare type Unsubscriber = () => void;
type Updater<T> = (value: T) => T;

export abstract class CustomStore<T> implements Writable<T>
{
	public constructor(initialData: T) {
		const w = createWritableStore(initialData);
		this.subscribe = w.subscribe;
		this.set = w.set;
		this.update = w.update;
	}

	set(value: T): void {}
	update(updater: Updater<T>): any {}
	// @ts-ignore
	subscribe(run: Subscriber<T>, invalidate?: Invalidater<T>): Unsubscriber {}
}

function createWritableStore<T> (initialData: T) {
	return writable<T>(initialData);
}
