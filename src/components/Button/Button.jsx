import styles from "./styles.module.scss";
import classNames from "classnames";
import { memo } from "react";

const Button = ({
	children,
	primary,
	onClick,
	disabled,
	className,
	active,
	...buttonProps
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			{...buttonProps}
			className={classNames(styles.button, className, {
				[styles["button-primary"]]: primary,
				[styles["button-disabled"]]: disabled,
				[styles["button-active"]]: active,
			})}
		>
			{children}
		</button>
	);
};

export default memo(Button);
