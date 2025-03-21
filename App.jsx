import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    console.log(todostring)
    if(todostring){
      let todos = JSON.parse(todostring)
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  


  useEffect(() => {
    saveToLS(todos)
  }, [todos])


  

  

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4() ,todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }


  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()
  }



  const handleDelete = (e,id) => {
    console.log(`this is ${id}`)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS()

  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    // console.log(`this is the ${id}`)
    let index = todos.findIndex(item=>{
      return item.id == id;
    })
    // console.log(index)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()

  }
  

  return (
    <>
      <Navbar />
      <div className="container bg-violet-100 p-5 my-4 mx-auto w-[90%] min-h-[80vh] rounded-xl">
        <div className="addtodo">
          <h2 className='text-[18px] font-bold ml-1 my-2'>Todos</h2>
          <input onChange={handleChange} value={todo} className='bg-white border-1 border-black rounded-3xl w-1/4' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3}  className='bg-violet-600 text-white p-1 px-4 ml-5 rounded-2xl hover:bg-violet-800 disabled:bg-violet-600'>Save</button>
        </div>
        <div className="todos">
          <h2 className='text-[18px] font-bold py-5'>Your Todos</h2>
          {todos.length === 0 && <div className='ml-7 font-bold' >No Todos to Display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex gap-6 px-6 my-3 justify-between w-1/3">
              <div className='flex gap-5 items-center' >
                <input onChange={handleCheckbox} type="checkbox" name={item.id} id="" checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-600 text-white p-1 py-1 px-4 ml-5 rounded-2xl'>Edit</button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-600 text-white p-1 py-1 px-4 ml-5 rounded-2xl'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
