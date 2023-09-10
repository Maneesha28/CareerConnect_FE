import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useParams } from "react-router-dom";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import {
  StyledTableCell,
  StyledTableRow,
  commonStyles,
} from "./ComponentStyles";
import DateComponent from "../../components/DateComponent";

function PersonalInfo({ isLoggedInUser }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});

  const [jobseekerData, setJobseekerData] = useState(null);
  const [error, setError] = useState(null);

  const id = useParams().jobseeker_id;

  const fetchJobseekerData = async () => {
    try {
      const response = await axios.get(`/api/jobseeker/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.status === "not a jobseeker") {
        setError("Not a jobseeker");
        return;
      }
      setJobseekerData(response.data);
      setEditedInfo(response.data);
    } catch (error) {
      setError("Error fetching jobseeker information.");
    }
  };

  const sendEditedInfoToBackend = async () => {
    try {
      const response = await axios.put("/api/jobseeker", editedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobseekerData();
  }, [id]);

  //useEffect hook to listen for changes in profile_pic
  if (isLoggedInUser) {
    useEffect(() => {
      if (editedInfo.profile_pic) {
        sendEditedInfoToBackend();
      }
    }, [editedInfo.profile_pic]);
  }

  if (error)
    return (
      <>
        <Typography variant="h4" align="center">
          {error}
        </Typography>
      </>
    );

  if (!jobseekerData) return <div>Loading...</div>;

  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...jobseekerData });
  };

  const handleSave = async () => {
    try {
      setIsDialogOpen(false);
      setIsEditMode(false);
      setIsImageEditMode(false);

      // Send editedInfo to the backend
      const response = await axios.put("/api/jobseeker", editedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Update jobseekerData with the editedInfo
        setJobseekerData(editedInfo);
      } else {
        console.error("Failed to update jobseeker info.");
      }
    } catch (error) {
      console.error("Error updating jobseeker info:", error);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
    setIsImageEditMode(false); // Disable image edit mode when canceling
  };

  const handleImageClick = () => {
    if (isLoggedInUser) setIsImageEditMode(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageRef = ref(storage, `profile_pictures/${file.name + v4()}`);
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);

        const updatedEditedInfo = { ...editedInfo, profile_pic: imageUrl };
        setEditedInfo(updatedEditedInfo);
        setIsImageEditMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
    <div style={{marginTop: '80px'}}>
      <Box display="flex">
        <Box p={0} width="100%">
          <Paper elevation={3}>
            <Box
              p={0}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              {isLoggedInUser && isEditMode && (
                <>
                  <IconButton color="primary" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </>
              )}
              {isLoggedInUser && !isEditMode && (
                <IconButton
                  color="primary"
                  onClick={handleEdit}
                  sx={{ mt: 4, mr: 4, paddingTop:5 }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Box>
            <Box p={3} display="flex">
              <Box flex={1} paddingLeft={30} paddingTop={20}>
                {isLoggedInUser && isImageEditMode ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <label htmlFor="image-upload">
                      {editedInfo.profile_pic ? (
                        <img
                          src={editedInfo.profile_pic}
                          alt="Profile"
                          style={{
                            maxWidth: "250px",
                            maxHeight: "250px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <AccountCircleIcon
                          style={{
                            fontSize: "200px",
                            color: "#757575",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <Button component="label" color="primary">
                      Select New Picture
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center">
                    {jobseekerData.profile_pic ? (
                      <img
                        src={jobseekerData.profile_pic}
                        alt="Profile"
                        style={{
                          maxWidth: "300px",
                          maxHeight: "300px",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick}
                      />
                    ) : (
                      <AccountCircleIcon
                        style={{
                          fontSize: "200px",
                          color: "#757575",
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick}
                      />
                    )}
                  </Box>
                )}
              </Box>
              <TableContainer sx={{ paddingLeft: 30 }}>
                <Table aria-label="simple table" sx={{ width: 1, fontSize:"8px" }}>
                  <TableBody>
                    {jobseekerData.name && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Name</Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.name}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.gender && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Gender</Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.gender}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.date_of_birth && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Date of Birth
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(
                            jobseekerData.date_of_birth
                          ).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.nationality && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Nationality
                          </Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.nationality}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.nid && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>NID</Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.nid}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.address && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Address
                          </Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.address}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.phone_no && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Phone</Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.phone_no}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.email && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Email</Typography>
                        </TableCell>
                        <TableCell>{jobseekerData.email}</TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.github_link && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>GitHub</Typography>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`http://${jobseekerData.github_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {jobseekerData.github_link}
                          </a>
                        </TableCell>
                      </TableRow>
                    )}
                    {jobseekerData.linkedin_link && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Linkedin</Typography>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`http://${jobseekerData.linkedin_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {jobseekerData.linkedin_link}
                          </a>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Name"
              value={editedInfo.name || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, name: e.target.value })
              }
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
                value={editedInfo.gender || ""}
                onChange={(e) =>
                  setEditedInfo({ ...editedInfo, gender: e.target.value })
                }
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Date of Birth"
              type="date"
              value={
                new Date(editedInfo.date_of_birth).toLocaleDateString(
                  "en-CA"
                ) || ""
              }
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, date_of_birth: e.target.value })
              }
              InputProps={{
                inputProps: {
                  max: new Date().toISOString().split("T")[0], // Set the max date to today
                },
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Nationality"
              value={editedInfo.nationality || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, nationality: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="NID"
              value={editedInfo.nid || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, nid: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Address"
              multiline
              rows={4}
              value={editedInfo.address || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, address: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Phone No"
              value={editedInfo.phone_no || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, phone_no: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="GitHub Link"
              value={editedInfo.github_link || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, github_link: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Linkedin Link"
              value={editedInfo.linkedin_link || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, linkedin_link: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PersonalInfo;
