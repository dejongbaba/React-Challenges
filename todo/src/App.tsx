import { useState } from "react";
import AddTodoBar from "./components/AddTodoBar";
import TodoItem from "./components/TodoItem";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC<{}> = () => {
  // Todo items
  const [todos, setTodos] = useState<Array<Todo>>([]);

  // Add a new todo item
  const addTodo = (title: string, description: string) => {
    setTodos([
      ...todos,
      {
        id: `todo__${Math.random().toString().substr(2)}`,
        title,
        description,
        completed: false,
      },
    ]);
  };

  // Cross off a todo item
  const completedTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else return todo;
      })
    );
  };

  // Remove a todo item
  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <AddTodoBar
        addTodo={(title: string, description: string) =>
          addTodo(title, description)
        }
      />
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            completedTodo={(id: string) => completedTodo(id)}
            removeTodo={(id: string) => removeTodo(id)}
          />
        );
      })}
    </>
  );
};

export default App;
