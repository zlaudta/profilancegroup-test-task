import { memo } from "react";
import styles from "./styles.module.scss";

const Modal = ({ children, onClose }) => {
	return (
		<div className={styles.mask} onClick={() => onClose()}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
};

export default memo(Modal);
