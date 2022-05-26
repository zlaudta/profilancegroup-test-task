import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { localStorageNewsKey } from "../../constants/localStorageKeys";
import getLocalStorageArray from "../../utils/getLocalStorageArray";
import Button from "../Button/Button";
import CreateNewsModal from "../CreateNewsModal/CreateNewsModal";
import Empty from "../Empty/Empty";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./styles.module.scss";

const NewsPage = () => {
	const username = useSelector((store) => store.user.name);
	const [createNewsModalOpened, setCreateNewsModalOpened] = useState(false);
	const [news, setNews] = useState(() => getLocalStorageArray());
	const approvedNews = useMemo(
		() => getLocalStorageArray().filter((newsItem) => newsItem.approved),
		[]
	);
	const onOpenCreateNewsModal = useCallback(
		() => setCreateNewsModalOpened(true),
		[]
	);
	const onCloseCreateNewsModal = useCallback(
		() => setCreateNewsModalOpened(false),
		[]
	);

	const onSubmit = useCallback(
		(newNews) => {
			const newState = [...news, newNews];
			setNews(newState);
			localStorage.setItem(localStorageNewsKey, JSON.stringify(newState));
			onCloseCreateNewsModal();
		},
		[onCloseCreateNewsModal, news]
	);
	const onDeleteNewsItem = useCallback(
		(deletedNewsItemId) => {
			const newState = news.filter(
				(newsItem) => newsItem.id !== deletedNewsItemId
			);
			setNews(newState);
			localStorage.setItem(localStorageNewsKey, JSON.stringify(newState));
		},
		[news]
	);
	const onApproveNewsItem = useCallback(
		(approvedNewsItemId) => {
			const newState = news.map((newsItem) => {
				if (newsItem.id === approvedNewsItemId) {
					return { ...newsItem, approved: true };
				} else {
					return newsItem;
				}
			});
			setNews(newState);
			localStorage.setItem(localStorageNewsKey, JSON.stringify(newState));
		},
		[news]
	);
	const renderOneNewsItem = (newsItem) => (
		<NewsItem
			key={newsItem.id}
			newsItem={newsItem}
			onApprove={onApproveNewsItem}
			onDelete={onDeleteNewsItem}
		/>
	);
	return (
		<div className={styles.newsPage}>
			{!news.length && <Empty />}
			<div className={styles.newsList}>
				{username && news.map(renderOneNewsItem)}
				{!username && approvedNews.map(renderOneNewsItem)}
			</div>
			{username && (
				<Button primary onClick={onOpenCreateNewsModal}>
					Создать новость
				</Button>
			)}
			{createNewsModalOpened && (
				<CreateNewsModal onSubmit={onSubmit} onClose={onCloseCreateNewsModal} />
			)}
		</div>
	);
};

export default memo(NewsPage);
