"use client";
import { TodoType } from "@/types/todo-type";
import { ChangeEvent, FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Check, EditIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Props {
  index: number;
  todo: TodoType;
  changeTodoText: (id: number, text: string) => void;
  toggleIsTodoDone: (id: number, done: boolean) => void;
  deleteTodoItem: (id: number) => void;
}

const Todo: FC<Props> = ({
  todo,
  index,
  changeTodoText,
  toggleIsTodoDone,
  deleteTodoItem,
}) => {
  const [editing, setEditing] = useState(false);

  const [text, setText] = useState(todo.text);

  const [isDone, setIsDone] = useState(todo.done);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleIsDone = async () => {
    toggleIsTodoDone(todo.id, !isDone);
    setIsDone((prev) => !prev);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodoItem(todo.id);
    }
  };

  // Rendering the Todo component
  return (
    <motion.div
      key={todo.id}
      initial={{ opacity: 0, x: -20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
      }}
      layout
    >
      <Card className="p-4 shadow-md hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleIsTodoDone(todo.id, !todo.done)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              todo.done
                ? "bg-gradient-to-r from-green-400 to-green-600 border-green-500"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <AnimatePresence>
              {todo.done && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-3 w-3 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.span
            className={`flex-1 transition-all duration-300 ${
              todo.done ? "text-gray-500 line-through" : "text-gray-800"
            }`}
            animate={{
              opacity: todo.done ? 0.6 : 1,
            }}
          >
            {todo.text}
          </motion.span>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteTodoItem(todo.id)}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            <EditIcon className="h-4 w-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteTodoItem(todo.id)}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Todo;
