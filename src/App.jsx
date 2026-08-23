import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => { localStorage.setItem("todos", JSON.stringify(todos)) }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    saveToLS()
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 mt-5 min-h-auto md:container md:mt-5 rounded-xl md:m-auto p-3 bg-violet-100 md:min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-3xl text-center'>ShreeTodo - Manages your todos at one place</h1>
        <div className="addTodo flex flex-col mb-4 gap-6">
          <h2 className='text-xl font-bold mt-4 '>Add a Todo</h2>
          <div className="flex gap-1">
            <input onChange={handleChange} value={todo} name={todo.id} className=' bg-white w-full rounded-full border py-1 px-5' type="text" placeholder="What's on Your Mind 🤔" />
            <button onClick={handleAdd} disabled={todo.length < 3} className='cursor-pointer bg-violet-800 hover:bg-violet-900 p-4 py-1 mx-1 rounded-full disabled:bg-violet-700  text-white text-sm font-bold  h-10 w-20' >Save</button>
          </div>
        </div>
        <div className='h-0.5 bg-black opacity-20 w-[90%] m-auto my-3'></div>
        <input className='mb-3' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className="todos h-auto md:overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-violet-400 [&::-webkit-scrollbar-thumb]:rounded-full md:h-85">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isComplete) && <div key={item.id} className="todo flex justify-between md:w-full my-3 md:pr-8">
              <div className='flex gap-5'>
                <input className='break-all' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} />
                <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='cursor-pointer bg-violet-800 hover:bg-violet-900 p-2 py-1 rounded-md mx-1 text-white text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='cursor-pointer bg-violet-800 hover:bg-violet-900 p-2 py-1 rounded-md mx-1 text-white text-sm font-bold'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
