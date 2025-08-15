import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const [todoText, setTodoText] = useState("");
  const emojiMap: { [key: string]: string } = {
    eat: "🍔",
    sleep: "😴",
    code: "💻",
    repeat: "🔁",
  };

  const handleAddTodo = () => {
    const mappedText = emojiMap[todoText.toLowerCase()] || todoText;
    if (mappedText.trim()) {
      addTodo(mappedText);
      setTodoText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div>
      <em>Made with Zustand</em>
      <h2>Emoji Todo List</h2>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type an emoji or text"
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => removeTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
