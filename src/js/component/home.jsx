import React, { useState } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [Tareas, setTareas] = useState("");
	const [MostrarTareas, setMostrarTareas] = useState([]);
	const [buttonOver, setButtonOver] = useState(null);
	const mappingTareas = MostrarTareas.map((item, i) => {
		return (
			<div className="container" key={i}>
				<li
					className="list-group-item  "
					onMouseOver={() => setButtonOver(i)}
					onMouseLeave={() => setButtonOver(null)}>
					{item}
					{buttonOver == i ? (
						<button
							className="btn btn-warning"
							onClick={() => eliminatarea(item)}>
							X
						</button>
					) : (
						""
					)}
				</li>
			</div>
		);
	});

	const eliminatarea = (tarea) => {
		return setMostrarTareas(MostrarTareas.filter((item) => tarea !== item));
	};
	return (
		<div className="container  ">
			<h1 className="">Tareas</h1>
			<input
				className=""
				type="text"
				placeholder="Que necesitas hacer?"
				onClick={() => console.log("hice click")}
				onChange={(e) => setTareas(e.target.value)}
				value={Tareas}
			/>
			<button
				className="btn btn-success  "
				onClick={
					(e) => {
						Tareas === ""
							? alert("debe ingresar una tarea")
							: setMostrarTareas([...MostrarTareas, Tareas]);
					}
					//  (
					// 	Tareas === Tareas
					// 		? alert("debe borrar la tarea duplicada")
					// 		: ""
					// )
				}>
				Mostrar Tareas
			</button>
			<p>
				{MostrarTareas.length == 0
					? "No hay tareas, añada una tarea"
					: mappingTareas}
			</p>
			<p>{MostrarTareas.length} items left</p>
		</div>
	);
};

export default Home;
