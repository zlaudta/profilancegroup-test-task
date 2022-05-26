import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useMemo, useState } from "react";
import InputElement from "../InputElement/InputElement";
import PasswordInput from "../PasswordInput/PasswordInput";

const Input = ({
	password = false,
	search = false,
	text = false,
	validate: validateProp,
	onValidate: onValidateProp,
	onChange,
	value,
	...inputProps
}) => {
	const [error, setError] = useState(false);
	const validate = useMemo(() => validateProp || (() => true), [validateProp]);
	const onValidate = useMemo(
		() => onValidateProp || (() => {}),
		[onValidateProp]
	);

	const onBlur = useCallback(
		(e) => {
			const validation = validate(e.target.value);
			setError(!validation);
			onValidate(validation);
		},
		[validate, onValidate]
	);

	const onValueChange = useCallback(
		(e) => {
			onChange(e.target.value);
		},
		[onChange]
	);
	return (
		<>
			{password && (
				<PasswordInput
					error={error}
					setError={setError}
					validate={validate}
					onValidate={onValidate}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					{...inputProps}
				/>
			)}
			{!password && (
				<InputElement
					onBlur={onBlur}
					error={error}
					value={value}
					onChange={onValueChange}
					{...inputProps}
					endAdornment={search && <FontAwesomeIcon icon={faSearch} />}
				/>
			)}
		</>
	);
};

export default memo(Input);
