import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const Home = () => {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);

    // Load notes from localStorage on initial render
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    // Update localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleSaveNote = () => {
        if (note.trim()) {
            setNotes((prevNotes) => [...prevNotes, note]);
            setNote('');
            toast.success('Note saved!');
        } else {
            toast.error('Note cannot be empty');
        }
    };

    const handleEditSaveNote = () => {
        if (editNote && editNote.text.trim()) {
            const updatedNotes = notes.map((n, i) => (i === editNote.index ? editNote.text : n));
            setNotes(updatedNotes);
            setEditNote(null);
            toast.success('Note updated!');
        } else {
            toast.error('Edited note cannot be empty');
        }
    };

    const handleNoteClick = (note, index) => {
        setEditNote({ text: note, index });
    };

    return (
        <>
        <motion.div className=' bg-slate-400'>
            <Toaster position="top-center" reverseOrder={false} />
            
        </motion.div>
        <div className="w-screen h-screen bg-gray-50 flex flex-col items-center p-6">
            <Toaster position="top-right" />
            <div className="w-full max-w-md">
                <TextField
                    fullWidth
                    label="Type your note..."
                    variant="outlined"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mb-4"
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSaveNote}
                    className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
                >
                    Save Note
                </Button>
            </div>

            {editNote && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="w-full max-w-md p-4 bg-blue-100 rounded shadow-lg mb-4"
                >
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Edit your note..."
                        variant="outlined"
                        value={editNote.text}
                        onChange={(e) => setEditNote({ ...editNote, text: e.target.value })}
                        className="mb-4"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleEditSaveNote}
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        Save Edited Note
                    </Button>
                </motion.div>
            )}

            <div className="w-full max-w-md space-y-2">
                <AnimatePresence>
                    {notes.map((note, index) => (
                        <motion.div
                            key={index}
                            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
                            onClick={() => handleNoteClick(note, index)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Typography variant="body1">{note}</Typography>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    </>
    );
}

export default Home;
