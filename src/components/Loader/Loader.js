import Loader from 'react-loader-spinner';

import styles from './Loader.module.css';

export default function LoaderSpinner() {
  return (
    <Loader
      className={styles.loader}
      type="Oval"
      color="#00BFFF"
      height={80}
      width={80}
      timeout={3000}
    />
  );
}
