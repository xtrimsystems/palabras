export class ImageFileToBase64
{
	public static convert (file: Blob): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
			const FR = new FileReader();

			FR.onload = (e) => {
				const img = new Image();

				img.addEventListener('load', () => {
					let resizeRatio = 1;

					if (img.width > img.height) {
						resizeRatio = img.width > 500 ? img.width / 500 : 1;
						if (img.height / resizeRatio > 300) {
							resizeRatio = img.height / 300;
						}
					} else {
						resizeRatio = img.height > 300 ? img.height / 300 : resizeRatio;
						if (img.width / resizeRatio > 500) {
							resizeRatio = img.width / 500;
						}
					}

					const canvasWidth = img.width / resizeRatio;
					const canvasHeight = img.height / resizeRatio;

					canvas.width = canvasWidth;
					canvas.height = canvasHeight;

					ctx.clearRect(0, 0, 0, 0);

					ImageFileToBase64.drawImageProperly(ctx, img, 0, 0, canvasWidth, canvasHeight);

					let data;

					//get the current ImageData for the canvas.
					data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

					//store the current globalCompositeOperation
					const compositeOperation = ctx.globalCompositeOperation;

					//set to draw behind current content
					ctx.globalCompositeOperation = "destination-over";

					//set background color
					ctx.fillStyle = '#ffffff';

					//draw background / rect on entire canvas
					ctx.fillRect(0, 0, canvasWidth, canvasHeight);

					//get the image data from the canvas
					const base64Img = canvas.toDataURL('image/jpeg', 0.2);

					//clear the canvas
					ctx.clearRect (0,0, canvasWidth, canvasHeight);

					//restore it with original / cached ImageData
					ctx.putImageData(data, 0,0);

					//reset the globalCompositeOperation to what it was
					ctx.globalCompositeOperation = compositeOperation;

					ctx.clearRect(0, 0, 0, 0);

					resolve(base64Img);
				});

				img.src = (e.target as FileReader).result as string;
			};

			FR.onerror = (e) => reject(e);

			FR.readAsDataURL(file);
		});
	}

	private static drawImageProperly(
		ctx: CanvasRenderingContext2D,
		img: HTMLImageElement,
		x: number, y: number,
		w: number, h: number,
		offsetX?: number, offsetY?: number
	) {
		if (arguments.length === 2) {
			x = y = 0;
			w = ctx.canvas.width;
			h = ctx.canvas.height;
		}

		// default offset is center
		offsetX = typeof offsetX === "number" ? offsetX : 0.5;
		offsetY = typeof offsetY === "number" ? offsetY : 0.5;

		// keep bounds [0.0, 1.0]
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > 1) offsetX = 1;
		if (offsetY > 1) offsetY = 1;

		var iw = img.width,
			ih = img.height,
			r = Math.min(w / iw, h / ih),
			nw = iw * r,   // new prop. width
			nh = ih * r,   // new prop. height
			cx, cy, cw, ch, ar = 1;

		// decide which gap to fill
		if (nw < w) ar = w / nw;
		if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
		nw *= ar;
		nh *= ar;

		// calc source rectangle
		cw = iw / (nw / w);
		ch = ih / (nh / h);

		cx = (iw - cw) * offsetX;
		cy = (ih - ch) * offsetY;

		// make sure source rectangle is valid
		if (cx < 0) cx = 0;
		if (cy < 0) cy = 0;
		if (cw > iw) cw = iw;
		if (ch > ih) ch = ih;

		// fill image in dest. rectangle
		ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
	}

}
