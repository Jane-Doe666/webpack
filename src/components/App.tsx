import { useState } from "react";
import "./App.scss";

export const App = () => {
	const [counter, setCounter] = useState<number>(0);
	const handleClick = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div>
			<h2>{counter}</h2>
			<button onClick={handleClick}>
				<span>+++</span>
			</button>
		</div>
	);
};
