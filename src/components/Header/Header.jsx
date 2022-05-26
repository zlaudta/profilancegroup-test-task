import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../resources/logo.svg";
import { logout } from "../../store/reducers/user";
import Button from "../Button/Button";
import LoginModal from "../LoginModal/LoginModal";
import styles from "./styles.module.scss";

const Header = () => {
	const [loginPopupOpened, setLoginPopupOpened] = useState(false);
	const username = useSelector((store) => store.user.name);
	const dispatch = useDispatch();
	const onLogin = useCallback(() => setLoginPopupOpened(true), []);
	const onLogout = useCallback(() => {
		dispatch(logout());
	}, [dispatch]);
	const onClose = useCallback(() => setLoginPopupOpened(false), []);
	return (
		<div className={styles.header}>
			<Link to="/">
				<img
					alt="Логотип Profilance Group"
					className={styles.logo}
					src={logo}
				/>
			</Link>
			<Link to="/news" className={styles.header__link}>
				Новости
			</Link>
			{!!username && <Button onClick={onLogout}>Выйти</Button>}
			{!username && (
				<Button onClick={onLogin} primary>
					Войти
				</Button>
			)}
			{loginPopupOpened && <LoginModal onClose={onClose} />}
		</div>
	);
};

export default memo(Header);
