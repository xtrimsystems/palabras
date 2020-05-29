export function CssVars (node: HTMLElement, props: any) {
	Object.entries(props).forEach(([key, value]) => {
		node.style.setProperty(`--${key}`, value as string);
	});

	return {
		update(new_props: any) {
			Object.entries(new_props).forEach(([key, value]) => {
				node.style.setProperty(`--${key}`, value as string);
				delete props[key];
			});

			Object.keys(props).forEach(name =>
				node.style.removeProperty(`--${name}`),
			);
			props = new_props;
		},
	};
}
