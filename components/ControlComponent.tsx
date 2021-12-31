import { FC, useState } from "react";
import styles from "../styles/control-component.module.css";

const ControlComponent: FC<{ onControlChange: Function }> = ({
  onControlChange,
}) => {
  const [settings, setSettings] = useState({});

  const update = (e) => {
    setSettings({ ...settings });
    onControlChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.wrapper}>
      <input
        name="borderSize"
        className={styles.borderControl}
        type="range"
        min="0"
        max="100"
        value={settings['borderSize']}
        step="1"
        onChange={update}
      />
      <input name='borderColor' onChange={update} type="text" placeholder="border color" />
    </div>
  );
};

export default ControlComponent;
