import "./index.css"

import { useState } from "react";

const TaskTemplate = ({
    item,

    onConclude,
    onDelete,
    onEdit,

}) => {

    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({title:"",desc:""});

    const onEditData = (datatype, data) => {

        if (datatype==="title"){
            setEditData((prev)=>({
                ...prev, title: data
            }))
        }

        if (datatype==="desc"){
            setEditData((prev)=>({
                ...prev, desc: data
            }))
        }
    }

    const onSubmitData = (e) => {
        e.preventDefault();

        onEdit(item.id, editData);
        setIsEditing(false);

    }

    return (
        <div className="task-template">
                <div className="flex-part">
                    <div className="task-information">
                    <h1 className="task-title">{item.title} {item.finished && "X"}</h1>
                    <p className="task-description">{item.desc}</p>
                </div>
                
                <div className="actions">
                    <button disabled={isEditing} onClick={()=>{onConclude(item.id);}} className="conclude-task">
                        finish
                    </button>

                    <button onClick={()=>setIsEditing(!isEditing)} className="edit-task">
                        edit
                    </button>

                    <button disabled={isEditing} onClick={()=>{onDelete(item.id)}}
                    className="delete-task">
                        delete
                    </button>
                </div>
            </div>

            {
                isEditing && (
                    <div className="edit-data-holder">

                        <h1 className="edit-data-title"> Edit info of "{item.title}" </h1>

                    <form onSubmit={(e) => { onSubmitData(e) }} className="edit-data">
                        <div className="input-group">
                            <label htmlFor={`new-title-${item.id}`} className="new-title-label">
                                New Title
                            </label>
                            <input 
                                id={`new-title-${item.id}`}
                                type="text"
                                className="new-title"
                                placeholder=" "
                                value={editData.title}
                                onChange={(e) => { onEditData("title", e.target.value) }}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor={`new-desc-${item.id}`} className="new-desc-label">
                                New Description
                            </label>
                            <input 
                                id={`new-desc-${item.id}`}
                                type="text"
                                className="new-desc"
                                placeholder=" "
                                value={editData.desc}
                                onChange={(e) => { onEditData("desc", e.target.value) }}
                            />
                        </div>

                        <button className="submit">Submit Changes</button>
                    </form>


                    </div>
                )
            }
        </div>
    )
}

export default function TaskManager({
        data,

        onLogout,

        onTaskUpdate,
        onTaskCreate,
        onTaskDelete,

        onSingleTaskUpdate,

    }){

    const [taskData, setTaskData] = useState({title:"", desc:""});

    const updateData = (data, whatdata) => {
        if (!whatdata) return;

        if (whatdata === "title") {
            setTaskData((prev)=>({
                ...prev, title: data
            }));
        }

        if (whatdata === "desc") {
            setTaskData((prev)=>({
                ...prev, desc: data
            }))
        }
    }

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
        setTaskData({title:"",desc:""})
    }

    return (
        <>
        
            <main className="taskmanager">
                <h1>PROFISK TASK MANAGER</h1>

                {/* USER INFORMATION */}
                <header className="main-info">

                    <img src={data.profile.icon} alt="profile icon taskmanager" className="profile-icon-tasks" />

                    <div className="info-items">
                        <p><b>{data.profile.username}</b></p>
                        <p><b>TASKS:</b> {data.tasks.length}</p>
                    </div>

                    <button onClick={onLogout} className="sign-off">Switch Profile</button>
                </header>

                {/* CREATE NEW TASK */}
                <h1 className="create-task-title">CREATE NEW TASK</h1>

                <section className="task-creator">


                    <form onSubmit={(e) => { onCreate(e) }} className="task-create">
                        <div className="input-group">
                            <label htmlFor="task-title" className="task-title-label">Title</label>
                            <textarea 
                                id="task-title"
                                className="task-title" 
                                maxLength={50}
                                placeholder=" "
                                onChange={(e) => { updateData(e.target.value, "title") }}
                                value={taskData.title}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="task-desc" className="task-desc-label">Description</label>
                            <textarea 
                                id="task-desc"
                                className="task-desc"
                                maxLength={100}
                                placeholder=" "
                                onChange={(e) => { updateData(e.target.value, "desc") }}
                                value={taskData.desc}
                            />
                        </div>

                        <button className="submit">Create Task</button>
                    </form>
                </section>

                {/* TASK LIST */}
                <h1 className="create-task-title">TASKS</h1>
                <section className="tasklist">

                    {
                        data.tasks.length > 0 ? (
                            data.tasks.map((v, _) => (
                                <TaskTemplate 
                                    key={_}
                                    item={v}

                                    onConclude={onConclude}
                                    onDelete={onTaskDelete}
                                    onEdit={onSingleTaskUpdate}
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