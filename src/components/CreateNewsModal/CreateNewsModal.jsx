import { memo, useCallback, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Textarea from "../Textarea/Textarea";
import styles from "./styles.module.scss";
import moment from "moment";
import getLocalStorageArray from "../../utils/getLocalStorageArray";

const CreateNewsModal = ({ onSubmit, onClose }) => {
	const [name, setName] = useState("");
	const [text, setText] = useState("");
	const onTextChange = useCallback((e) => setText(e.target.value), []);
	const onNameChange = useCallback((value) => setName(value), []);
	const validateName = useCallback((newText) => newText.length < 50, []);
	const onSaveNews = useCallback(() => {
		const prevNews = getLocalStorageArray();
		const id = prevNews[prevNews.length - 1]?.id + 1;
		onSubmit({ text, name, approved: false, date: moment(), id: id || 0 });
	}, [onSubmit, text, name]);
	return (
		<Modal onClose={onClose}>
			<div className={styles.newsForm}>
				<span className={styles.newsForm__name}>Создание новости</span>
				<Input
					placeholder="Название"
					value={name}
					validate={validateName}
					onChange={onNameChange}
				/>
				<Textarea placeholder="Текст" value={text} onChange={onTextChange} />
				<Button onClick={onSaveNews}>Сохранить</Button>
			</div>
		</Modal>
	);
};

export default memo(CreateNewsModal);
