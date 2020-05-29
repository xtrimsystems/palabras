export class JsonFile
{
	public static deserialize (file: Blob): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const FR = new FileReader();

			FR.onload = (e) => {
				resolve((e.target as FileReader).result as string);
			};

			FR.onerror = (e) => reject(e);

			FR.readAsText(file);
		});
	}
}
