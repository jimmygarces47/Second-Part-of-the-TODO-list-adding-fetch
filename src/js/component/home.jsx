import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [Tareas, setTareas] = useState("");
	const [MostrarTareas, setMostrarTareas] = useState([]);
	const [buttonOver, setButtonOver] = useState(null);
	useEffect(() => {
		createUser();
		getData();
	}, []);
	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmy4", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
			.then((resp) => resp.json())
			.then((data) => setMostrarTareas(data))
			.catch((err) => console.log(err));
	};
	const subirData = (body) => {
		const settingFetch = {
			method: "PUT",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/jimmy4",
			settingFetch
		)
			.then((respuesta) => respuesta.json())
			.then((response) => {
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

	const createUser = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmy4", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch((error) => {
				//manejo de errores
				console.log(error);
			});
	};

	const mappingTareas = MostrarTareas.map((item, i) => {
		return (
			<div className="container" key={i}>
				<li
					className="list-group-item  "
					onMouseOver={() => setButtonOver(i)}
					onMouseLeave={() => setButtonOver(null)}>
					{item.label}
					{buttonOver == i ? (
						<button
							className="btn btn-warning"
							onClick={() => eliminatarea(item.label)}>
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
		subirData(MostrarTareas.filter((item) => tarea !== item.label));
		setMostrarTareas(MostrarTareas.filter((item) => tarea !== item.label));
	};
	const haceClickMostarTarea = () => {
		console.log("hola");
		setMostrarTareas([...MostrarTareas, { label: Tareas, done: false }]);
		subirData([...MostrarTareas, { label: Tareas, done: false }]);
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
							: haceClickMostarTarea();
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
