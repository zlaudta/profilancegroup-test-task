import { memo } from "react";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

const GroupButton = ({ buttons }) => {
	return (
		<div className={styles.groupButton}>
			{buttons.map((button) => {
				return (
					<Button
						key={button.text}
						active={button.active}
						onClick={button.onClick}
						className={styles.groupButton__button}
						{...button.props}
					>
						{button.text}
					</Button>
				);
			})}
		</div>
	);
};

export default memo(GroupButton);
