import "./index.css"

//import { useState } from "react";

const TaskTemplate = ({item, onConclude}) => {
    return (
        <div className="task-template">
            <h1 className="task-title">{item.title} {item.finished && "X"}</h1>
            <p className="task-description">{item.desc}</p>
            
            <div className="actions">
                <button onClick={()=>{onConclude(item.id);}}className="conclude-task">
                    finish
                </button>

                <button className="edit-task">
                    edit
                </button>

                <button className="delete-task">
                    delete
                </button>
            </div>
        </div>
    )
}

export default function TaskManager({
        data,
        onLogout,
        onTaskUpdate,
        onTaskCreate,
    }){

    const onConclude = (taskid) => {
        const updatedTasks = data.tasks.map((task)=>
            task.id===taskid ? {...task, finished:!task.finished} : task
        )

        onTaskUpdate(updatedTasks);
    };

    const onCreate = (e) => {
        e.preventDefault();

        const newTaskData = {
            id: data.tasks.length,
            title: taskData.title,
            desc: taskData.desc,
            finished: false,
        }

        onTaskCreate(newTaskData)
    }

    return (
        <>
        
            <main className="taskmanager">

                <header className="main-info">
                    <h1>TASKMANAGER OPEN</h1>
                    <p>UserID: {data.id} | Username: {data.profile.username} | Tasks : {data.tasks.length}</p>

                    <button onClick={onLogout} className="sign-off">Sign Off</button>
                </header>

                <section className="task-creator">
                    <form onSubmit={(e) => {onCreate(e)}} className="task-create">
                        
                        <label htmlFor="task-title" className="task-title-label">Title</label>
                        <input type="text" id="task-title" className="task-title" />

                        <label htmlFor="task-desc" className="task-desc-label">Description</label>
                        <input type="text" id="task-desc" className="task-desc" />

                        <button className="submit">Create Task</button>
                    </form>
                </section>

                <section className="tasklist">

                    {
                        data.tasks.length > 0 ? (
                            data.tasks.map((v, _) => (
                                <TaskTemplate 
                                    key={_}
                                    item={v}
                                    onConclude={onConclude}
                                />
                            ))
                        ) : (
                            <h1>No tasks available</h1>
                        )
                    }

                </section>

            </main>
        
        </>
    )
}