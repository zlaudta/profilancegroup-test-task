import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

const Empty = () => {
	return (
		<div className={styles.empty}>
			<FontAwesomeIcon icon={faBoxOpen} className={styles.empty__icon} />
			<span className={styles.empty__text}>Нет данных</span>
		</div>
	);
};

export default Empty;
