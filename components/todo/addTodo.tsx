"use client";
import { ChangeEvent, FC, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  createTodo: (value: string) => void;
}

const AddTodo: FC<Props> = ({ createTodo }) => {
  const [input, setInput] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAdd = async () => {
    createTodo(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      createTodo(input);
      setInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-6"
    >
      <Card className="p-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="flex-1 border-0 bg-gray-50 focus:bg-white transition-colors"
          />
          <Button onClick={handleAdd} size="icon" disabled={input.length === 0}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AddTodo;
