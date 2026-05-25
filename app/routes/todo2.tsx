"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import ReusableComponents from "../components/ReusableComponents";

type Task = {
    _id: string;
    text: string;
    createdAt?: string;
};

const Todo2 = () => {
    const [arr, setArr] = useState<Task[]>([]);
    const [add, setAdd] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/task");
            setArr(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    function handleChange(e: any) {
        setAdd(e.target.value);
    }

    const addValue = async () => {
        if (!add.trim()) return;
        try {
            setLoading(true);
            const { data } = await axios.post("/api/task", { text: add });
            setArr((prev) => [data, ...prev]);
            setAdd("");
        } catch (error) {
            console.error("Error adding task:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeValue = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete("/api/task", { data: { id } });
            setArr((prev) => prev.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        } finally {
            setLoading(false);
        }
    }

    const updateValue = async (id: string) => {
        if (!editValue.trim()) return;
        try {
            setLoading(true);
            const { data } = await axios.put("/api/task", { id, text: editValue });
            setArr((prev) => prev.map((task) => task._id === id ? data : task));
            setEditingId(null);
            setEditValue("");
        } catch (error) {
            console.error("Error updating task:", error);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (task: Task) => {
        setEditingId(task._id);
        setEditValue(task.text);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-xl bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
                <h1 className="text-3xl font-semibold text-slate-900 mb-5">Todo List</h1>
                <div className="flex gap-3 mb-5">
                    <input
                        className="flex-1 border border-slate-300 rounded-2xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        type="text"
                        name="add"
                        placeholder="Add a task"
                        value={add}
                        onChange={handleChange}
                    />
                    <button
                        className="bg-slate-900 text-white rounded-2xl px-5 py-3 hover:bg-slate-800"
                        onClick={addValue}
                    >
                        Add
                    </button>
                </div>
                <div className="space-y-3">
                    {loading ? (
                        <p className="text-center text-slate-500">Loading...</p>
                    ) : arr.length === 0 ? (
                        <p className="text-center text-slate-500">No tasks yet. Add one to get started!</p>
                    ) : (
                        arr.map((task) => {
                            return (
                                <div key={task._id} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    {editingId === task._id ? (
                                        <input
                                            className="flex-1 border border-slate-300 rounded-xl py-1 px-3 focus:outline-none focus:ring-2 focus:ring-slate-300"
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                    ) : (
                                        <ReusableComponents heading={task.text} />
                                    )}
                                    <div className="flex gap-2">
                                        {editingId === task._id ? (
                                            <button className="text-sm text-green-600 hover:text-green-700" onClick={() => updateValue(task._id)}>
                                                Save
                                            </button>
                                        ) : (
                                            <button className="text-sm text-blue-600 hover:text-blue-700" onClick={() => startEditing(task)}>
                                                Edit
                                            </button>
                                        )}
                                        <button className="text-sm text-red-600 hover:text-red-700" onClick={() => removeValue(task._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
export default Todo2;