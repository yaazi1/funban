import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateTaskStatusThunk } from "../store/tasks";

export function TaskCard(props) {
	// console.log("// [ TaskCard Component ] - props: ", props);
	const { task } = props;
	const { updateStatus } = props;

	return (
		<div className="taskCard">
			<h3> {task.title} </h3>
			{task.status === "todo" ? <button onClick={() => updateStatus(task, { status: "in progress" })}> Move to In-Progress </button> : ""}
			{task.status === "in progress" ? <button onClick={() => updateStatus(task, { status: "completed" })}> Move to Completed </button> : ""}
		</div>
	)
}

function mapDispatch(dispatch) {
	return {
		updateStatus: (task, updatedStatus) => dispatch(updateTaskStatusThunk(task, updatedStatus))
	}
}

export default connect(null, mapDispatch)(TaskCard)