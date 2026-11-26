import "./App.css";

import { useState } from "react";
import TaskManager from "./components/TaskManager";

const ProfileTemplate = ({users, userid, onLogin}) => {

  const USERCONTENT = users.find(i=>i.id===userid);

  const USERINFO = {
    userid: USERCONTENT.id,
    profile: USERCONTENT.profile,
    tasks: USERCONTENT.tasks,
  }

  const LOGIN = () => {
    return onLogin(userid)
  }

  return (
      <div className="profile-template">

        <img onClick={LOGIN} src="/assets/profiles/icon-cat.jpg" alt="user profile icon" className="profile-icon" />

        <h2 className="username">
          {USERCONTENT.profile.username}
        </h2>

        <p className="tasks-count">
          Tasks: {USERINFO.tasks.length}
        </p>

    </div>
  )

}

export default function App() {

  const [users, setUsers] = useState([
    {
      id: 0,

      profile: {
        username: "ADMIN"
      },

      tasks: [
        {id:0,title:"Task Test 01",desc:"Survive 2026",finished:false}
      ]
    },
  ])

  const [userData, setUserDt] = useState({});

  
  const SetUserData = (userid) => {

    const __USER__ = users.find(item=>item.id===userid);

    const newData = {
      id: __USER__.id,
      profile: __USER__.profile,
      tasks: __USER__.tasks
    }

    setUserDt(newData);
  }

  const handle_updatetasks = (tasksArray) => {
    setUserDt((prev) => ({
      ...prev,
      tasks: tasksArray
    }))
  }

  const handle_addnewtask = (data) => {
    setUserDt((prev)=> ({
      ...prev,
      tasks: [
        ...prev.tasks,
        data
      ]
    }))
  }

  const handle_signoff = () => {

    setUsers((prev)=>{
      return prev.map((profile)=>{
        return profile.id===userData.id
              ? {...profile, profile: userData.profile, tasks: userData.tasks}
              : profile
      })
    })

    console.log(users)

    setUserDt({});
  }
  
  return (
    <>
    
      <main className="main-items">

       {
        Object.keys(userData).length > 0 ? (
          <TaskManager
              data={userData}
              onTaskCreate={handle_addnewtask}
              onTaskUpdate={handle_updatetasks}      
              onLogout={handle_signoff}
            />
        ) :
        (
          <div className="profiles">

            <h1 className="profile-title">
              Welcome to Profisk
            </h1>

            <div className="task-profiles">

                {
                  users.map((USR, IND)=>(
                    <ProfileTemplate key={IND} users={users} userid={IND} onLogin={SetUserData} />
                  ))
                }

            </div>

          </div>

        )
       }

      </main>
    
    </>
  )
}