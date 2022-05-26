import { localStorageUsersKey } from "../constants/localStorageKeys";

const getUsersFromLocalStorage = () => {
	try {
		const users = JSON.parse(localStorage.getItem(localStorageUsersKey));
		return users;
	} catch (_e) {}
};

export default getUsersFromLocalStorage;
