import React from 'react'

const InputField = ({text, addText, addTodo}) => {
  return (
    <>
        <input
            type="text"
            value={text}
            onChange={e=>addText(e.target.value)} 
            placeholder='Enter your todo here...'
        />
        <button onClick={addTodo}>Add Todo</button>
    </>
  )
}

export default InputField
