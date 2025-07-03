"use client";

import { TodoType } from "@/types/todo-type";
import { ChangeEvent, FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Check, EditIcon, CheckIcon, XIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
interface Props {
  index: number;
  todo: TodoType;
  changeTodoText: (id: number, text: string) => void;
  toggleTodoItem: (id: number, done: boolean) => void;
  deleteTodoItem: (id: number) => void;
}

const Todo: FC<Props> = ({
  todo,
  index,
  changeTodoText,
  toggleTodoItem,
  deleteTodoItem,
}) => {
  const [editing, setEditing] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [text, setText] = useState(todo.text);

  const [isDone, setIsDone] = useState(todo.done);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleIsDone = async () => {
    toggleTodoItem(todo.id, !isDone);
    setIsDone((prev) => !prev);
  };

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleSave = async () => {
    if (text.trim() === "") return;
    changeTodoText(todo.id, text);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setText(todo.text);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = () => {
    deleteTodoItem(todo.id);
  };

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
            onClick={handleIsDone}
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

          {editing ? (
            <motion.input
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              value={text}
              onChange={handleTextChange}
              className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
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
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={editing ? handleSave : handleEdit}
            className={cn(
              "flex-shrink-0 p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200",
              {
                editing: "hover:text-green-500!",
              }
            )}
          >
            {editing ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <EditIcon className="h-4 w-4" />
            )}
          </motion.button>
          {!editing ? (
            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
              <AlertDialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpenDelete}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCancel}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <XIcon className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default Todo;
