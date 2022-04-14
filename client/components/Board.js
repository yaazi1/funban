import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksThunk } from "../store/tasks";
import { Link } from "react-router-dom";

import ToDoPane from "./ToDoPane";
import InProgressPane from "./InProgressPane";
import CompletedPane from "./CompletedPane";

export function Board(props) {
	// console.log("// [ Board Component ] - props: ", props)
	// useEffect(() => { props.setTasks(props.auth.id) }, [])
	// const allTasks = props.tasks;
	// console.log("// [ Board Component ] - allTasks: ", allTasks)
	// const todos = allTasks.filter(task => task.status === "todo");
	// console.log("// [ Board Component ] - todos: ", todos);
	// const tasksInProgress = allTasks.filter(task => (task.status === "in progress"))
	// console.log("// [ Board Component ] - tasksInprogress: ", tasksInProgress);
	// const completedTasks = allTasks.filter(task => (task.status === "completed"))
	// console.log("// [ Board Component ] - tasksInprogress: ", completedTasks);

	const dummyCompletedTasks = [{ id: 0, title: "blah" }]


	return (
		// <div className="board">
		// 	<ToDoPane todos={todos} />
		// 	<InProgressPane tasksInProgress={tasksInProgress} />
		// 	<CompletedPane completedTasks={completedTasks} />
		// </div>
		<div className="board">
			<ToDoPane />
			<InProgressPane />
			<CompletedPane completedTasks={dummyCompletedTasks} />
		</div>
	)
}

// // mapStateToProps
// function mapState(state) {
// 	console.log("// [ Board Component/ mapsState] state: ", state)
// 	return {
// 		auth: state.auth,
// 		tasks: state.tasks,
// 	}
// }

// // mapDispatch 
// function mapDispatch(dispatch) {
// 	return { setTasks: (userId) => dispatch(getTasksThunk(userId)) }
// }

// export default connect(mapState, mapDispatch)(Board)
export default Board;