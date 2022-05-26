import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import NewsPage from "./components/NewsPage/NewsPage";
import useUsersLocalStorage from "./hooks/useUsersLocalStorage";

function App() {
	useUsersLocalStorage();
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/news" element={<NewsPage />} />
			</Routes>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				limit={3}
			/>
		</div>
	);
}

export default App;
