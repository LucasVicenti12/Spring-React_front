import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../shared/HttpHelper";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ReactDOM from "react-dom/client";
import NoteModal from "../components/NoteModal";

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [change, setChange] = useState(true);

  const handleOpenModalNote = (noteID) => {
    const root = ReactDOM.createRoot(document.getElementById("note-modal"));
    return root.render(
      <NoteModal noteID={noteID} isOpen={true} callBack={updatePage} />
    );
  };

  const updatePage = () => {
    setChange(!change);
  };

  useEffect(() => {
    const getNotes = () => {
      return http.get("/notes/list");
    };
    getNotes().then((response) => setNotes(response.data));
  }, [change]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <input type="hidden" id="note-modal" />
      <Paper sx={{ width: "50%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 1,
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", textAlign: "left" }}>
            Notes
          </Typography>
          <Tooltip title="Add new note">
            <IconButton onClick={() => handleOpenModalNote()}>
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableCell sx={{ backgroundColor: "#000", color: "#fff" }}>
                Title
              </TableCell>
              <TableCell sx={{ backgroundColor: "#000", color: "#fff" }}>
                Description
              </TableCell>
              <TableCell sx={{ backgroundColor: "#000", color: "#fff" }}>
                &nbsp;
              </TableCell>
            </TableHead>
            <TableBody>
              {notes.map((note) => (
                <TableRow>
                  <TableCell>{note.title}</TableCell>
                  <TableCell sx={{width: "60%", textOverflow: "ellipsis", overflow: "hidden"}}>{note.description}</TableCell>
                  <TableCell align="right" width={"20%"}>
                    <Tooltip title="Edit note" placement="top">
                      <IconButton onClick={() => handleOpenModalNote(note.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default NotePage;
