import { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./App.module.scss";
import SomePict from "../assets/vinni-pukh-v-png.png";
import SomePict2 from "@/assets/jpeg_.jpeg";
import SomePict3 from "@/assets/1586558.svg";

export const App = () => {
	const [counter, setCounter] = useState<number>(0);
	const handleClick = () => {
		setCounter((prev) => prev + 1);
	};

	return (
		<div>
			<h2>{counter} ло</h2>
			<button className={styles.button} onClick={handleClick}>
				<span>+++</span>
			</button>
			<img src={SomePict} alt="some pict" className={styles.pict} />
			<img src={SomePict2} alt="some pict" className={styles.pict} />
			<div>
				<SomePict3 width={50} height={50} fill={"green"} />
			</div>
			<Outlet />
		</div>
	);
};
