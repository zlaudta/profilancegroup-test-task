import { memo, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { errors } from "../../constants/errors";
import { localStorageUsersKey } from "../../constants/localStorageKeys";
import { login } from "../../store/reducers/user";
import getUsersFromLocalStorage from "../../utils/getUsersFromLocalStorage";
import validate from "../../utils/validate";
import Button from "../Button/Button";
import GroupButton from "../GroupButton/GroupButton";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "./styles.module.scss";

const LoginModal = ({ onClose }) => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState(() => getUsersFromLocalStorage());
	const [signUp, setSignUp] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validationSuccess, setValidationSuccess] = useState(false);

	const onChangeUsername = useCallback((value) => setUsername(value), []);
	const onChangePassword = useCallback((value) => setPassword(value), []);
	const onValidate = useCallback((validated) => {
		setValidationSuccess(validated);
	}, []);
	const onSubmit = useCallback(() => {
		if (!signUp) {
			if (users.find((name) => name === username)?.password === password) {
				dispatch(login({ username, password }));
				onClose();
			} else {
				toast.error(errors.wrongData);
			}
		} else {
			localStorage.setItem(
				localStorageUsersKey,
				JSON.stringify([...users, { username, password }])
			);
			setUsers((prevState) => [...prevState, { username, password }]);
			dispatch(login({ username, password }));
			onClose();
		}
	}, [dispatch, username, password, users, onClose, signUp]);
	const validatePassword = useCallback(
		(value) => validate(value, { password: true }),
		[]
	);
	const buttons = useMemo(
		() => [
			{ text: "Авторизация", onClick: () => setSignUp(false), active: !signUp },
			{ text: "Регистрация", onClick: () => setSignUp(true), active: signUp },
		],
		[signUp]
	);

	return (
		<Modal onClose={onClose}>
			<div className={styles.loginModal}>
				<GroupButton buttons={buttons} />

				<Input
					validate={signUp && validate}
					onValidate={onValidate}
					value={username}
					onChange={onChangeUsername}
					placeholder="Имя пользователя"
				/>
				<Input
					validate={signUp && validatePassword}
					onValidate={onValidate}
					password
					value={password}
					onChange={onChangePassword}
					placeholder="Пароль"
				/>
				<Button disabled={!validationSuccess} onClick={onSubmit} primary>
					{signUp ? "Регистрация" : "Войти"}
				</Button>
			</div>
		</Modal>
	);
};

export default memo(LoginModal);
