import { FC, useState } from "react";
import styles from "../styles/control-component.module.css";

const ControlComponent: FC<{ onControlChange: Function, onExport: Function }> = ({
  onControlChange,
  onExport
}) => {
  const [settings, setSettings] = useState({borderSize: 0});

  const update = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value  });
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
      <select name='ratio' defaultValue='none' onChange={update}>
          <option value='none'>
              original
          </option>
          <option value='1:1'>
              1:1
          </option>
          <option value='4:5'>
              4:5
          </option>
      </select>
      <button onClick={() => onExport()}>Generate</button>
    </div>
  );
};

export default ControlComponent;
