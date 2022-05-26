import { memo, useRef } from "react";
import styles from "./styles.module.scss";

const Textarea = (props) => {
	const ref = useRef();
	return (
		<textarea
			className={styles.textarea}
			style={{
				height: ref.current?.scrollHeight - parseInt(styles.paddingTop),
			}}
			ref={ref}
			{...props}
		/>
	);
};

export default memo(Textarea);
