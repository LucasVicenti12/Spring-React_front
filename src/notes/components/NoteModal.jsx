import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../shared/HttpHelper";
import Swal from "sweetalert2";

const noteModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "50%",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  outline: "none",
  flexWrap: "wrap",
};

const NOTE = {
  id: 0,
  title: "",
  description: "",
};

const NoteModal = ({ noteID, isOpen, callBack }) => {
  const [open, setOpen] = useState(isOpen);
  const [note, setNote] = useState(NOTE);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOnChangeNote = (evt) => {
    const { name, value } = evt.target;
    setNote({ ...note, [name]: value });
  };

  const handleSaveNote = () => {
    try {
      const putNote = async () => {
        return await http.post(
          `/notes/${noteID !== undefined ? "alter" : "add"}`,
          note
        );
      };
      putNote().then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.response,
        });
        callBack(true);
        setOpen(false);
      });
      putNote().catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.response,
        });
      });
    } catch (error) {
      alert("error");
    }
  };

  const handleDeleteNote = () => {
    try {
      const deleteNote = async () => {
        return await http.delete(`/notes/delete/${noteID}`);
      };
      deleteNote().then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.response,
        });
        callBack(true);
        setOpen(false);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.response,
      });
    }
  };

  useEffect(() => {
    if (noteID !== undefined) {
      const getNote = () => {
        return http.get(`/notes/note/${noteID}`);
      };
      getNote().then((response) => setNote(response.data));
    }
  }, [noteID]);

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Box sx={noteModalStyle}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ m: 2, marginTop: 0 }}>
            <Typography sx={{ fontSize: "1.5rem", textAlign: "left" }}>
              Note
            </Typography>
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField
              name="title"
              fullWidth
              label="Title"
              value={note.title}
              onChange={(evt) => handleOnChangeNote(evt)}
            />
          </Box>
          <Box sx={{ m: 2 }}>
            <TextField
              name="description"
              fullWidth
              label="Description"
              value={note.description}
              onChange={(evt) => handleOnChangeNote(evt)}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <Button
              sx={{ m: 1 }}
              variant="outlined"
              onClick={() => handleSaveNote()}
            >
              Save
            </Button>
            {noteID !== undefined ? (
              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDeleteNote()}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default NoteModal;
