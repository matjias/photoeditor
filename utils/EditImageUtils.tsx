export const fillImageOnCanvas = (context: CanvasRenderingContext2D, img: (HTMLImageElement | HTMLCanvasElement)): void => {
    context.drawImage(img, 0, 0, img.width, img.height);
  };

export const addBorder = (
    context: CanvasRenderingContext2D,
    destCtx: CanvasRenderingContext2D,
    borderPercentage: number,
    borderColor: string
  ): void => {
    const destH = destCtx.canvas.height;
    const destW = destCtx.canvas.width;

    const imgRatio = context.canvas.width / context.canvas.height;
    const destRatio = destW / destH;

    const scale = 1 - borderPercentage / 150;

    let imgW;
    let imgH;

    let borderWidth;
    let borderHeight;

    if (imgRatio < destRatio) {
      // img is taller than dest
      imgW = context.canvas.width * (destH / context.canvas.height) * scale;
      imgH = destH * scale;
    } else if (imgRatio >= destRatio) {
      // img is not as tall as dest
      imgW = context.canvas.width * scale;
      imgH = context.canvas.height * scale;
    }

    borderWidth = (destW - imgW) / 2;
    borderHeight = (destH - imgH) / 2;

    console.log('border', borderWidth, borderHeight);
    console.log('img ', imgW, imgH)

    destCtx.fillStyle = borderColor;
    destCtx.fillRect(0, 0, destW, destH);
    destCtx.drawImage(context.canvas, borderWidth, borderHeight, imgW, imgH);
  };

export  const setRatio = (context, destCtx, ratio) => {
    let scale;
    if (ratio === undefined || ratio === "none") {
      destCtx.canvas.width = context.canvas.width;
      destCtx.canvas.height = context.canvas.height;
      return;
    } else if (ratio === "4:5") {
      scale = 0.8;
    } else if (ratio === "1:1") {
      console.log('11')
      scale = 1;
    }

    destCtx.canvas.height = destCtx.canvas.width / scale;
  };

