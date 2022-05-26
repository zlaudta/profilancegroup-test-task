import classNames from "classnames";
import { memo } from "react";
import styles from "./styles.module.scss";

const InputElement = ({ error, endAdornment, className, ...inputProps }) => {
	return (
		<div className={styles.input__container}>
			<input
				{...inputProps}
				className={classNames(styles.input, className, {
					[styles.input_error]: error,
				})}
			/>
			{endAdornment}
		</div>
	);
};

export default memo(InputElement);
