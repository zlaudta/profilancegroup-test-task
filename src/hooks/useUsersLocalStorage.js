import { useEffect } from "react";
import { localStorageUsersKey } from "../constants/localStorageKeys";
import users from "../constants/users";
import getUsersFromLocalStorage from "../utils/getUsersFromLocalStorage";

const useUsersLocalStorage = () => {
	useEffect(() => {
		const usersFromLocalStorage = getUsersFromLocalStorage();
		if (!usersFromLocalStorage || !usersFromLocalStorage.length) {
			localStorage.setItem(localStorageUsersKey, JSON.stringify(users));
		}
	}, []);
};

export default useUsersLocalStorage;
