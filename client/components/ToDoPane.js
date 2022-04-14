import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksThunk } from "../store/tasks";
import TaskCard from "./TaskCard";

// function ToDoPane(props) {
// 	console.log("// [ ToDoPane Component ] - props: ", props);
// 	const { todos } = props

// 	return (
// 		<div className="panes">
// 			<div className="paneHeader">
// 				<h3> To DO </h3>
// 				<button>+</button>
// 			</div>
// 			{todos.map((task) => (
// 				<TaskCard key={task.id} task={task} />
// 			))}
// 		</div>
// 	)
// }

// export default ToDoPane;

export function ToDoPane(props) {
	console.log("// [ ToDoPane Component ] - props: ", props);
	useEffect(() => { props.setTasks(props.auth.id) }, []);

	const todos = props.tasks.filter((task) => (task.status === "todo"));
	console.log("// [ ToDoPane Component ] - todos: ", todos)

	return (
		<div className="panes">
			<div className="paneHeader">
				<h3> To Do </h3>
				<button> Add Task </button>
			</div>
			{todos.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	)
}

// mapStateToProps
function mapState(state) {
	return {
		auth: state.auth,
		tasks: state.tasks,
	}
}

// mapDispatch 
function mapDispatch(dispatch) {
	return { setTasks: (userId) => dispatch(getTasksThunk(userId)) }
}

export default connect(mapState, mapDispatch)(ToDoPane)
