import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

/* Read all notes endpoint */
app.get("/api/notes", async (req, res) => {
    const notes = await prisma.note.findMany();
    res.json({
        status: 200,
        data: notes,
        message: "success"
    });

});

/* Create note endpoint */
app.post("/api/notes", async (req, res) => {
    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(400).json({
            status: 400,
            message: "Please provide title and content"
        });
    }

    try {
        const newNote = await prisma.note.create({
            data: {
                title,
                content
            }
        });
        return res.status(200).json({
            status: 200,
            data: newNote,
            message: "success"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error,
            message: "Oops! Something went wrong"
        });
    }
});

/* Update note endpoint */
app.put("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    if(!title || !content) {
        return res.status(400).json({
            status: 400,
            message: "Please provide title and content"
        });
    }

    if(!id || isNaN(id)) {
        return res.status(400).json({
            status: 400,
            message: "ID must be a valid number"
        });
    }

    try {
        const updatedNote = await prisma.note.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                content
            }
        });
        return res.status(200).json({
            status: 200,
            data: updatedNote,
            message: "success"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error,
            message: "Oops! Something went wrong"
        });
    }
});

/* Delete note endpoint */
app.delete("/api/notes/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
        return res.status(400).json({
            status: 400,
            message: "ID field must be a valid number"
        });
    }

    try {
        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(id)
            }
        });
        return res.status(200).json({
            status: 200,
            data: deletedNote,
            message: "success"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error,
            message: "Oops! Something went wrong"
        });
    }
});
app.listen(4000, () => console.log("Server running on port 4000"));