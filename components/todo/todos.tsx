"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TodoType } from "@/types/todo-type";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "@/actions/todo-action";
import Todo from "./todo";
import AddTodo from "./addTodo";

interface Props {
  todos: TodoType[];
}

export default function Component({ todos }: Props) {
  const [todoItems, setTodoItems] = useState<TodoType[]>(todos);

  useEffect(() => {
    const sortedTodos = todos.sort((a, b) => a.id - b.id);
    setTodoItems(sortedTodos);
  }, [todos]);

  const createTodo = (text: string) => {
    if (text.trim() === "") return;
    const id = (todoItems.at(-1)?.id || 0) + 1;
    addTodo(id, text);
    setTodoItems((prev) => [...prev, { id: id, text, done: false }]);
  };

  const changeTodoText = (id: number, text: string) => {
    setTodoItems((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    editTodo(id, text);
  };

  const toggleTodoItem = (id: number) => {
    setTodoItems((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
    toggleTodo(id);
  };

  const deleteTodoItem = (id: number) => {
    setTodoItems((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodo(id);
  };

  const completedCount = todoItems.filter((todo) => todo.done).length;
  const totalCount = todoItems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Todo App</h1>
          <p className="text-gray-600">Stay organized and productive</p>
          {totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 text-sm text-gray-500"
            >
              {completedCount} of {totalCount} tasks completed
            </motion.div>
          )}
        </motion.div>

        <AddTodo createTodo={createTodo} />

        <div className="space-y-3">
          <AnimatePresence>
            {todoItems.map((todo, index) => (
              <Todo
                todo={todo}
                key={todo.id}
                index={index}
                changeTodoText={changeTodoText}
                toggleTodoItem={toggleTodoItem}
                deleteTodoItem={deleteTodoItem}
              />
            ))}
          </AnimatePresence>
        </div>

        {todoItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No tasks yet
            </h3>
            <p className="text-gray-500">Add your first task to get started!</p>
          </motion.div>
        )}

        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <Card className="p-4 shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Progress
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((completedCount / totalCount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
