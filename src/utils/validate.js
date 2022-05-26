import { toast } from "react-toastify";
import { errors } from "../constants/errors";
import { minPasswordLength } from "../constants/minPasswordLength";

const validate = (value, config = {}) => {
	const { password = false } = config;
	if (!value.length) {
		return false;
	}
	if (/[а-я]/i.test(value)) {
		toast.error(errors.cyrillicLetters);
		return false;
	}
	if (password) {
		if (value.includes(" ")) {
			toast.error(errors.spaces);
			return false;
		}
		if (/[а-я]/i.test(value)) {
			toast.error(errors.cyrillicLetters);
			return false;
		}
		if (value.length < minPasswordLength) {
			toast.error(errors.length);
			return false;
		}
		return true;
	}
	return true;
};

export default validate;
