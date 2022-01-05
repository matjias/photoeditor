import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/edit-component.module.css";
import ControlComponent from "./ControlComponent";
import ImageCanvasComponent from "./ImageCanvasComponent";
import { EditSettings } from "../store/custom-interfaces";
import {
  addBorder,
  fillImageOnCanvas,
  setRatio,
} from "../utils/EditImageUtils";

const EditComponent: FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);

  const dowloadLinkRef = useRef<HTMLAnchorElement>(null);

  const [image, setImage] = useState<Blob>();
  const [settings, setSettings] = useState<EditSettings>();

  const loadImage = ({ target }) => {
    setImage(target.files[0]);

    const originalContext = originalCanvasRef.current.getContext("2d");
    const exportContext = exportCanvasRef.current.getContext("2d");

    const img = new Image();

    img.src = URL.createObjectURL(target.files[0]);

    img.onload = function () {
      img.setAttribute("crossOrigin", "");
      img.crossOrigin = "anonymous";

      originalCanvasRef.current.width = img.width;
      originalCanvasRef.current.height = img.height;

      exportCanvasRef.current.width = img.width;
      exportCanvasRef.current.height = img.height;

      fillImageOnCanvas(originalContext, img);
      fillImageOnCanvas(exportContext, img);
    };
  };

  const onControlChange = (updatedSettings) => {
    setSettings({ ...settings, ...updatedSettings });
  };

  const exportImage = () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const originalContext = originalCanvasRef.current.getContext("2d");
    const exportContext = exportCanvasRef.current.getContext("2d");

    setRatio(originalContext, exportContext, settings.ratio);
    addBorder(
      originalContext,
      exportContext,
      settings.borderSize,
      settings.borderColor
    );


      // let dlink = dowloadLinkRef.current;
      // dlink.href = exportContext.canvas.toDataURL();

      // dlink.setAttribute('style', 'display: block');

      let dimg = new Image();
      dimg.src = exportContext.canvas.toDataURL();

      wrapperRef.current.appendChild(dimg);
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <h1>Editor</h1>
      <input onChange={loadImage} ref={fileInputRef} type="file" />
      <ImageCanvasComponent settings={settings} image={image} draw={() => {}} />
      <ControlComponent
        onControlChange={onControlChange}
        onExport={exportImage}
      />
      <canvas ref={originalCanvasRef} style={{ display: "none" }} />
      <canvas ref={exportCanvasRef} style={{ display: "none" }} />
      <a ref={dowloadLinkRef} style={{ display: "none" }} >Download</a>
    </div>
  );
};

export default EditComponent;
