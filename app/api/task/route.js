import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Task from "../../routes/model/task";

export async function GET() {
    await connectDB();
    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json(tasks);
}

export async function POST(req) {
    const { text } = await req.json();

    if (!text) {
        return NextResponse.json({ error: "Text required" }, { status: 400 });
    }

    await connectDB();
    const task = await Task.create({ text });

    return NextResponse.json(task);
}

export async function DELETE(req) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await connectDB();
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Task deleted" });
}

export async function PUT(req) {
    const { id, text } = await req.json();

    if (!id || !text) {
        return NextResponse.json({ error: "ID and text required" }, { status: 400 });
    }

    await connectDB();
    const task = await Task.findByIdAndUpdate(id, { text }, { new: true });

    if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
}