import React from "react"
import './app.css'
import sunIcon from './assets/images/icon-sun.svg'
import Task from "./components/task/Task"
import { useState } from "react"
import { useRef } from "react"
import uniqid from 'uniqid'
import { useEffect } from "react"

function App() {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState({})
  const [currentSection, setCurrentSection] = useState('All')
  const itemsFiltersRef = useRef(null)
  const inputCheckRef = useRef(null)
  const taskInputRef = useRef()

  const handleChange = (e)=>{
    setCurrentTask({description:e.target.value,id:uniqid()})
  }

  const handleAddTask = ()=>{
    if(Object.keys(currentTask).length !== 0){
      setTasks(()=>{
        const updatedTasks = [...tasks,currentTask]
        localStorage.setItem('tasks',JSON.stringify(updatedTasks))
        console.log(localStorage);
        return updatedTasks
      })

      taskInputRef.current.value = "";
      setCurrentTask({})
    }
    setTimeout(() => {
      inputCheckRef.current.checked = false
    }, 200);

  }

  const handleCurrentSection = ()=>{
    if(currentSection == 'All'){
      let allTasks = localStorage.getItem('tasks');
      setTasks(JSON.parse(allTasks))
    } else if(currentSection == 'Active'){
      let activeTasks = tasks.filter(task => task.checked !== true)
      setTasks(activeTasks)
    } else if(currentSection == 'Completed'){
      let completedTasks = tasks.filter(task => task.checked == true)
      setTasks(completedTasks)
    }
  }

  const handleTaskDelete = ()=>{
    localStorage.clear()
    let updatedTasks = tasks.filter(el=> el.checked !== true)
    localStorage.setItem('tasks',JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
  }

  useEffect(() => {
    let storedTasks = localStorage.getItem('tasks')
    setTasks(JSON.parse(storedTasks))

    
  }, [localStorage])

  useEffect(() => {

    handleCurrentSection()

  }, [currentSection])
  
  

  return (
    <>
    <div className="container">
      <header>
        <div className="header-top">
          <h1 className="header__title">TODO</h1>
          <img src={sunIcon} alt="Light Theme" className="header__theme-switch" />
        </div>
        <div className="header-input-container">
          <input type="checkbox" className="header__check" ref={inputCheckRef} onClick={handleAddTask}/>
          <input type="text" placeholder="Create a new todo..." className="header__input-task" onChange={handleChange} ref={taskInputRef}
          />
        </div>
      </header>
      <main>
        <div className="tasks-container">
          {tasks.map((task,index)=>{
            return (<Task task={task} index={index} key={task.id} tasks={tasks} setTasks={setTasks}/>)
          })}
        </div>
      </main>
      <footer>
        <div className="items-left">
          <p>{tasks.length} items left</p>
        </div>
        <div className="items-filter" ref={itemsFiltersRef}>
          <span className={`items-filter__all ${currentSection == 'All' && 'items-filter--active'}`} onClick={()=> setCurrentSection('All')}>All</span>
          <span className={`items-filter__active ${currentSection == 'Active' && 'items-filter--active'}`} onClick={()=> setCurrentSection('Active')}>Active</span>
          <span className={`items-filter__completed ${currentSection == 'Completed' && 'items-filter--active'}`} onClick={()=> setCurrentSection('Completed')}>Completed</span>
        </div>
        <div className="items-clear">
          <p onClick={()=> handleTaskDelete()}>Clear Completed</p>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
