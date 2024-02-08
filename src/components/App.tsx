import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";

export const App = () => {
	const [counter, setCounter] = useState<number>(0);
	const handleClick = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div>
			<h2>{counter}</h2>
			<button className={styles.button} onClick={handleClick}>
				<span>+++</span>
			</button>
			<Outlet />
		</div>
	);
};
