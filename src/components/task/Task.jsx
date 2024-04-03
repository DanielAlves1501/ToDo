import React, { useRef } from 'react'
import './task.css'
import { useState } from 'react'

const Task = ({task,tasks,setTasks,index}) => {
  const taskCheckRef = useRef(false)

  const handleTaskCheck = ()=>{
    localStorage.clear()
    let updatedTasks = [...tasks];
    updatedTasks[index] = {...updatedTasks[index],checked:taskCheckRef.current.checked}
    updatedTasks.sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? -1 : 1));
    localStorage.setItem('tasks',JSON.stringify(updatedTasks))
    setTasks(updatedTasks);
  }

  return (
    <div className='task'>
      <div className='task-left'> 
      <input type="checkbox" className={`task__check`} defaultChecked={task.checked} onClick={handleTaskCheck} ref={taskCheckRef}/>
        <p className={`task__description ${task.checked && 'task--checked'}`}>{task.description}</p>
      </div>
    </div>
  )
}

export default Task