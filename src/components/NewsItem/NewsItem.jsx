import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import styles from "./styles.module.scss";
import moment from "moment";

const NewsItem = ({ newsItem, onDelete, onApprove }) => {
	const isUserAdmin = useSelector((store) => store.user.isAdmin);
	const onClickDelete = useCallback(
		() => onDelete(newsItem.id),
		[newsItem, onDelete]
	);
	const onClickApprove = useCallback(
		() => onApprove(newsItem.id),
		[newsItem, onApprove]
	);
	return (
		<div className={styles.newsItem}>
			<span className={styles.newsItem__name}>{newsItem.name}</span>
			<span className={styles.newsItem__text}>{newsItem.text}</span>
			<span className={styles.newsItem__date}>
				{moment(newsItem.date).format("DD.MM.YYYY HH:mm")}
			</span>
			{isUserAdmin && !newsItem.approved && (
				<div className={styles.newsItem__actions}>
					<Button onClick={onClickDelete}>Удалить</Button>
					<Button onClick={onClickApprove}>Одобрить</Button>
				</div>
			)}
		</div>
	);
};

export default memo(NewsItem);
