import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksThunk } from "../store/tasks";
import TaskCard from "./TaskCard";

export function InProgressPane(props) {
    console.log("// [ InProgressPane Component ] - props: ", props);
    useEffect(() => { props.setTasks(props.auth.id) }, []);

    const tasksInProgress = props.tasks.filter((task) => (task.status === "in progress"));
    console.log("// [ InProgressPane Component ] - tasks in progess: ", tasksInProgress)

    return (
        <div className="panes">
            <div className="paneHeader">
                <h3> In Progress </h3>
                <button>+</button>
            </div>
            {tasksInProgress.map((task) => (
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

export default connect(mapState, mapDispatch)(InProgressPane)

// function InProgressPane(props) {
//     console.log("// [ InProgressPane Component ] - props: ", props);
//     const { tasksInProgress } = props

//     return (
//         <div className="panes">
//             <div className="paneHeader">
//                 <h3> In Progress </h3>
//             </div>
//             {tasksInProgress.map((task) => (
//                 <TaskCard key={task.id} task={task} />
//             ))}
//         </div>
//     )
// }

// export default InProgressPane;
