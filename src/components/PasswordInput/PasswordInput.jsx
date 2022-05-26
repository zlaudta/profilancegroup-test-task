import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useEffect, useState } from "react";
import InputElement from "../InputElement/InputElement";
import styles from "./styles.module.scss";

const PasswordInput = ({
	validate,
	onValidate,
	value,
	onChange,
	error,
	setError,
	onBlur,
	...inputProps
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [inputTouched, setInputTouched] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);

	useEffect(() => {
		onChange(inputValue);
		// Ниже условие для проверки автофила
		if (!inputTouched && inputValue) {
			const validation = validate(inputValue);
			setError(!validation);
			onValidate(validation);
		}
	}, [inputValue, onChange, setError, onValidate, validate, inputTouched]);

	const togglePasswordShown = useCallback(() => {
		setPasswordShown((prevState) => !prevState);
	}, []);
	const onValueChange = useCallback((e) => {
		setInputValue(e.target.value);
	}, []);
	const onFocus = useCallback(() => {
		setInputTouched(true);
	}, []);

	return (
		<InputElement
			onBlur={onBlur}
			error={error}
			onFocus={onFocus}
			onChange={onValueChange}
			type={passwordShown ? undefined : "password"}
			{...inputProps}
			endAdornment={
				<>
					{!passwordShown && (
						<FontAwesomeIcon
							onClick={togglePasswordShown}
							icon={faEyeSlash}
							className={styles.input__passwordIcon}
						/>
					)}
					{passwordShown && (
						<FontAwesomeIcon
							onClick={togglePasswordShown}
							className={styles.input__passwordIcon}
							icon={faEye}
						/>
					)}
				</>
			}
		/>
	);
};

export default memo(PasswordInput);
