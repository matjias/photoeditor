import { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/edit-component.module.css";
import ControlComponent from "./ControlComponent";
import ImageCanvasComponent from "./ImageCanvasComponent";
import { EditSettings } from "../store/custom-interfaces";

const EditComponent: FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<HTMLImageElement>();
  const [settings, setSettings] = useState<EditSettings>();

  const loadImage = ({ target }) => {
    setImage(target.files[0])
  };

  const onControlChange = (updatedSettings) => {
    setSettings({...settings, ...updatedSettings});
  }

  return (
      <div className={styles.wrapper}>
        <h1>Editor</h1>
        <input onChange={loadImage} ref={fileInputRef} type="file" />
        <ImageCanvasComponent settings={settings} image={image} draw={()=>{}}/>
        <ControlComponent onControlChange={onControlChange} />
      </div>
  );
};

export default EditComponent;
