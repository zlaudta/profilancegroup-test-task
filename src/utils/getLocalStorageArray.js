import { localStorageNewsKey } from "../constants/localStorageKeys";

const getLocalStorageArray = () => {
	try {
		return JSON.parse(localStorage.getItem(localStorageNewsKey)) || [];
	} catch (_e) {
		return [];
	}
};
export default getLocalStorageArray;
