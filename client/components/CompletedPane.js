import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksThunk } from "../store/tasks";
import TaskCard from "./TaskCard";

export function CompletedPane(props) {
    console.log("// [ CompletedPane Component ] - props: ", props);
    useEffect(() => { props.setTasks(props.auth.id) }, []);

    const completedTasks = props.tasks.filter((task) => (task.status === "completed"));
    console.log("// [ CompletedPane Component ] - completed tasks: ", completedTasks)

    return (
        <div className="panes">
            <div className="paneHeader">
                <h3> Completed </h3>
            </div>
            {completedTasks.map((task) => (
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

export default connect(mapState, mapDispatch)(CompletedPane)

