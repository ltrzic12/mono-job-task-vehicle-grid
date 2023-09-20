import { observer } from "mobx-react";
import "./loader.css";
const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <span className='loader'>
        <span className='loader'></span>
      </span>
    </div>
  );
};

export default observer(Loader);
