import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/image-canvas-component.module.css";
import { EditSettings } from "../store/custom-interfaces";

const ImageCanvasComponent: FC<{
  settings: EditSettings;
  image: object;
  draw: Function;
}> = (props) => {
  const { settings, image, draw, ...rest } = props;

  const printCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);

  const fillImageOnCanvas = (context, img): void => {
    context.drawImage(img, 0, 0, img.width, img.height);
  };

  const loadImageToCanvas = (imgSrc): void => {
    const img = new Image();
    const ogImg = new Image();

    img.src = URL.createObjectURL(imgSrc);
    ogImg.src = URL.createObjectURL(imgSrc);

    img.onload = function () {
      let ogWidth = img.width;

      img.width = printCanvasRef.current.clientWidth;

      let ratio = ogWidth / img.width;
      img.height = img.height / ratio;

      img.setAttribute("crossOrigin", "");
      img.crossOrigin = "anonymous";
      printCanvasRef.current.width = img.width;
      printCanvasRef.current.height = img.height;

      fillImageOnCanvas(printCanvasRef.current.getContext("2d"), img);
    };

    ogImg.onload = function () {
      ogImg.setAttribute("crossOrigin", "");
      ogImg.crossOrigin = "anonymous";
      originalCanvasRef.current.width = ogImg.width;
      originalCanvasRef.current.height = ogImg.height;

      fillImageOnCanvas(originalCanvasRef.current.getContext("2d"), ogImg);
    };
  };

  const addBorder = (
    context: CanvasRenderingContext2D,
    destCtx: CanvasRenderingContext2D,
    borderPercentage: number,
    borderColor: string
  ): void => {
    const borderScale = 3;
    const destH = destCtx.canvas.height;
    const destW = destCtx.canvas.width;
    const ratio = destH < destW 

    let borderWidth;
    let borderHeight;
    if (borderPercentage < 2) {
      borderWidth = 0;
      borderHeight = 0;
    } else {
      borderWidth = (destW / borderScale) * (borderPercentage / 100);
      borderHeight = (destH / borderScale) * (borderPercentage / 100);
    }

    destCtx.fillStyle = borderColor;
    destCtx.fillRect(0, 0, destW, destH);
    destCtx.drawImage(
      context.canvas,
      borderWidth,
      borderHeight,
      destW - 2 * borderWidth,
      destH - 2 * borderHeight
    );
  };

  const redraw = (settings: EditSettings): void => {
    if (settings.borderSize > 0) {
      addBorder(
        originalCanvasRef.current.getContext("2d"),
        printCanvasRef.current.getContext("2d"),
        settings.borderSize,
        settings.borderColor
      );
    }
  };

  useEffect(() => {
    if (image !== undefined) {
      console.log("loadin img");
      loadImageToCanvas(image);
    }
  }, [image]);

  useEffect(() => {
    if (settings !== undefined) {
      redraw(settings);
    }
  }, [settings]);

  return (
    <React.Fragment>
      <canvas ref={originalCanvasRef} style={{ display: "none" }} />
      <canvas id="print" ref={printCanvasRef} className={styles.canvas} />
    </React.Fragment>
  );
};

export default ImageCanvasComponent;
