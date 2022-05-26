import { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

const Main = () => {
	const username = useSelector((store) => store.user.name);
	return (
		<div className={styles.main}>
			<span className={styles.main__title}>Привет, {username || "гость"}</span>
		</div>
	);
};

export default memo(Main);
