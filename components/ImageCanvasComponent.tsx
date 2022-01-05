import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/image-canvas-component.module.css";
import { EditSettings } from "../store/custom-interfaces";
import { setRatio, addBorder, fillImageOnCanvas } from "../utils/EditImageUtils";

const ImageCanvasComponent: FC<{
  settings: EditSettings;
  image: Blob;
  draw: Function;
}> = (props) => {
  const { settings, image, draw, ...rest } = props;

  const printCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const scaledCanvasRef = useRef<HTMLCanvasElement>(null);

  const loadImageToCanvas = (imgSrc: Blob): void => {
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

      scaledCanvasRef.current.width = img.width;
      scaledCanvasRef.current.height = img.height;

      fillImageOnCanvas(printCanvasRef.current.getContext("2d"), img);
      fillImageOnCanvas(scaledCanvasRef.current.getContext("2d"), img);
    };

    ogImg.onload = function () {
      ogImg.setAttribute("crossOrigin", "");
      ogImg.crossOrigin = "anonymous";
      originalCanvasRef.current.width = ogImg.width;
      originalCanvasRef.current.height = ogImg.height;

      fillImageOnCanvas(originalCanvasRef.current.getContext("2d"), ogImg);
    };
  };


  const redraw = (settings: EditSettings): void => {
    setRatio(
      scaledCanvasRef.current.getContext("2d"),
      printCanvasRef.current.getContext("2d"),
      settings.ratio
    );
    addBorder(
      scaledCanvasRef.current.getContext("2d"),
      printCanvasRef.current.getContext("2d"),
      settings.borderSize,
      settings.borderColor
    );
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
      <canvas ref={scaledCanvasRef} style={{ display: "none" }} />
      <canvas id="print" ref={printCanvasRef} className={styles.canvas} />
    </React.Fragment>
  );
};

export default ImageCanvasComponent;
