import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import { useWhiteboardStore } from "../../store/whiteBoardStore";

const initialForm = {
    title: "",
    description: "",
};

export const CreateWhiteboard = ({ open, setOpen }) => {
    const { form, onInputChange, setForm } = useForm(initialForm);
    const createWhiteboard = useWhiteboardStore((state) => state.createWhiteboard)
    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        createWhiteboard(form)
        setOpen(false)
    };

    return (
        <Dialog open={open} onClose={handleClose} keepMounted={false}>
            <DialogTitle>Crear nuevo Whiteboard</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    type="text"
                    fullWidth
                    name="title"
                    value={form.title}
                    onChange={onInputChange}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    name="description"
                    type="text"
                    fullWidth
                    multiline
                    rows={3}
                    value={form.description}
                    onChange={onInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                    Cancelar
                </Button>
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
};
