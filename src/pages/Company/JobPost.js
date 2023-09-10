import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import BookmarkAddedTwoToneIcon from "@mui/icons-material/BookmarkAddedTwoTone";
import {
  StyledTableCell,
  StyledTableRow,
  commonStyles,
} from "../JobSeeker/ComponentStyles";
import DateComponent from "../../components/DateComponent";
import { useFetch } from "./FetchContext";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const JobPost = ({
  user_id,
  isCompany,
  isJobseeker,
  isLoggedInUser,
  selectedJob,
  setSelectedJob,
}) => {
  const { fetch, setFetch } = useFetch();
  const company_id = useParams().company_id;
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [applications2, setApplications2] = useState([]);
  const [applicationCount, setApplicationCount] = useState(0);
  const [isLoadingJobPost, setIsLoadingJobPost] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedInfo, setEditedInfo] = useState({});
  const [isShortlisted, setIsShortListed] = useState(false);
  const [shortListButtonText, setShortListButtonText] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [applyButtonText, setApplyButtonText] = useState("");
  //---------------------------Edit---------------------------------------
  const handleSave = async () => {
    try {
      let updatedInfo;
      if (editedInfo.keywords) {
        console.log("here");
        const words = editedInfo.keywords.split(",").join("|");
        updatedInfo = { ...editedInfo, keywords: words };
        // Now, you can use the updatedInfo object as needed
        console.log(updatedInfo);
      } else {
        updatedInfo = editedInfo;
      }
      setIsDialogOpen(false);
      setIsEditMode(false);
      console.log("They should be | separated: ", updatedInfo);

      // Send editedInfo to the backend
      const response = await axios.put(
        `/api/jobpost/${selectedJob.jobpost_id}`,
        updatedInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSelectedJob(editedInfo);
      console.log("1)fetch: ", fetch);
      setFetch(true);
    } catch (error) {
      console.error("Error updating jobpost info:", error);
    }
  };

  const handleEdit = () => {
    setIsDialogOpen(true);
    setEditedInfo({ ...selectedJob });
  };
  const handleCancel = () => {
    setIsDialogOpen(false);
    setIsEditMode(false);
  };
  //---------------------------Apply ---------------

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleApply = () => {
    // Open the apply dialog
    if (isApplied == 0) setIsApplyDialogOpen(true);
  };

  const handleUploadResume = () => {
    // Create an input element dynamically
    const input = document.createElement("input");
    input.type = "file";

    // Listen for the 'change' event when the user selects a file
    input.addEventListener("change", (e) => {
      const selectedFile = e.target.files[0];

      // You can now handle the selected file, for example, by uploading it to a server
      // Here, we're just logging the selected file
      console.log("Selected file:", selectedFile);

      // Close the dialog
      setIsApplyDialogOpen(false);
    });

    // Trigger a click event on the input element to open the file selection dialog
    input.click();
  };

  const handleBuildResume = () => {
    // Open the resume builder link in a new tab
    window.open(`/application/${user_id}`, "_blank");
    // Close the dialog
    setIsApplyDialogOpen(false);
  };
  //--------------------------Application---------------------------------
  const [selectedTab, setSelectedTab] = useState("Get All");
  const [sortAscending, setSortAscending] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllApplications = async () => {
    const endpoint = `/api/application/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Modify data (e.g., remove columns containing "_id")
      if (response.data.status === "Access Denied") {
        setError(response.data.status);
        setIsLoadingJobPost(false);
        return;
      }
      setApplications(response.data);
      setApplications2(response.data);
      console.log("Application: ", response.data);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError(`Error fetching all applications.`);
      setIsLoadingJobPost(false);
    }
  };
  const fetchSuggestedApplications = async () => {
    const endpoint = `/api/application/suggested/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Modify data (e.g., remove columns containing "_id")
      if (response.data.status === "Access Denied") {
        setError(response.data.status);
        setIsLoadingJobPost(false);
        return;
      }
      setApplications(response.data);
      setApplications2(response.data);
      console.log("Application: ", response.data);
      setIsLoadingJobPost(false);
    } catch (error) {
      setError(`Error fetching suggested applications.`);
      setIsLoadingJobPost(false);
    }
  };
  const handleTabClick = (tab) => {
    setSelectedTab(tab);

    // Perform the corresponding action based on the selected tab
    if (tab === "Get All") {
      fetchAllApplications();
    } else if (tab === "Get Suggested") {
      fetchSuggestedApplications();
    }
  };

  const handleSortClick = () => {
    // Toggle sorting order
    setSortAscending(!sortAscending);

    // Sort applications based on the sorting order and re-render
    const sortedApplications = [...applications].sort((a, b) => {
      const compareResult = a.name.localeCompare(b.name);
      return sortAscending ? compareResult : -compareResult;
    });

    setApplications(sortedApplications);
  };
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter applications based on the search query
    const filteredApplications = applications2.filter((applicant) =>
      applicant.name.toLowerCase().includes(query.toLowerCase())
    );

    setApplications(filteredApplications);
  };

  const fetchApplicationsCount = async () => {
    try {
      const response = await axios.get(
        `/api/application/count/${selectedJob.jobpost_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response ", response.data);
      setApplicationCount(response.data.application_count);
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  };
  const fetchIsApplied = async () => {
    const endpoint = `/api/application/is_applied/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "Access Denied") {
        setError(response.data.status);
      }
      setIsApplied(response.data.is_applied);
      if (response.data.is_applied == 1) {
        setApplyButtonText("Applied");
      } else {
        setApplyButtonText("Apply Now");
      }
      console.log("is applied: ", response.data);
    } catch (error) {
      setError(`Error fetching applied information.`);
    }
  };
  //---------------------------Shortlist------------------------

  const fetchIsShortListed = async () => {
    const endpoint = `/api/jobpost/is_shortlisted/${selectedJob.jobpost_id}`;
    try {
      const response = await axios.get(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.status === "Access Denied") {
        setError(response.data.status);
      }
      setIsShortListed(response.data.is_shortlisted);
      if (response.data.is_shortlisted == 1) {
        setShortListButtonText("Shortlisted");
      } else {
        setShortListButtonText("Shortlist");
      }
      console.log("is shortlisted: ", response.data);
    } catch (error) {
      setError(`Error fetching shortlisted information.`);
    }
  };

  const handleShortlist = async () => {
    const requestData = {
      jobpost_id: selectedJob.jobpost_id,
    };
    console.log("is shortlisted ", isShortlisted);
    if (isShortlisted == 0) {
      try {
        const response = await axios.post(
          "/api/jobpost/shortlisted",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setShortListButtonText("Shortlisted");
        setIsShortListed(1);
        setFetch(true);
      } catch (error) {
        console.error(error);
      }
    } else if (isShortlisted == 1) {
      try {
        const response = await axios.delete("/api/jobpost/shortlisted", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: requestData,
        });
        console.log(requestData);
        console.log(response.data);
        setShortListButtonText("Shortlist");
        setIsShortListed(0);
        setFetch(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  //----------------------------Delete JobPost-----------------------------
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleDeleteConfirmationOpen = (jobpostId) => {
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirmationClose = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      // Send a DELETE request to delete the job post by its ID
      const response = await axios.delete(
        `/api/jobpost/${selectedJob.jobpost_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Job post deleted successfully:", response.data);
      setIsDeleteDialogOpen(false);
      setSelectedJob(null);
      setFetch(true); // Trigger a fetch after deletion
    } catch (error) {
      // Handle error
      console.error("Error deleting job post:", error);
      setIsDeleteDialogOpen(false);
    }
  };
  //---------------------------------------------------------------

  useEffect(() => {
    if (selectedJob) {
      fetchAllApplications();
      fetchApplicationsCount();
      console.log("2)fetch: ", fetch);
      if (isJobseeker) {
        fetchIsApplied();
        fetchIsShortListed();
      }
    }
  }, [selectedJob]);

  if (selectedJob && isLoadingJobPost) {
    return <div>Loading JobPost</div>;
  }

  return (
    <>
      {selectedJob !== null ? (
        <Container sx={{ marginTop: "40px" }}>
          <Box p={0} width="100%">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {selectedJob.title}
              </Typography>
            </Box>
            <Paper elevation={3} sx={{ padding: "16px", marginBottom: "16px" }}>
              <Box
                p={0}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
              >
                {isLoggedInUser && isCompany && isEditMode && (
                  <>
                    <IconButton color="primary" onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="error" onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </>
                )}
                {isLoggedInUser && isCompany && !isEditMode && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() =>
                        handleDeleteConfirmationOpen(selectedJob.jobpost_id)
                      }
                    >
                      Delete
                    </Button>
                  </div>
                )}

                {isJobseeker && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={
                        isShortlisted ? (
                          <BookmarkAddedTwoToneIcon />
                        ) : (
                          <BookmarkAddTwoToneIcon />
                        )
                      }
                      onClick={handleShortlist}
                    >
                      {shortListButtonText}
                    </Button>
                  </div>
                )}
              </Box>
              {/* <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Description: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Description"
                      value={editedInfo.description || ""}
                      onChange={(e) =>
                        setEditedInfo({
                          ...editedInfo,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography>{selectedJob.description}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Requirements: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Requirements"
                      value={editedInfo.requirements || ""}
                      onChange={(e) =>
                        setEditedInfo({
                          ...editedInfo,
                          requirements: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography>{selectedJob.requirements}</Typography>
                  )}
                </Box>
                {isLoggedInUser && isCompany && (
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ ...commonStyles.box }}
                  >
                    <Typography>Keywords: </Typography>
                    {isEditMode ? (
                      <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        label="Keywords"
                        value={editedInfo.keywords || ""}
                        onChange={(e) =>
                          setEditedInfo({
                            ...editedInfo,
                            keywords: e.target.value,
                          })
                        }
                      />
                    ) : (
                      <Typography>
                        {selectedJob && selectedJob.keywords
                          ? selectedJob.keywords.split("|").join(", ")
                          : ""}
                      </Typography>
                    )}
                  </Box>
                )}

                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Vacancy: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="number"
                      label="Vacancy"
                      value={editedInfo.vacancy || ""}
                      onChange={(e) =>
                        setEditedInfo({
                          ...editedInfo,
                          vacancy: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography>{selectedJob.vacancy}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Salary: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="number"
                      label="Salary"
                      value={editedInfo.salary || ""}
                      onChange={(e) =>
                        setEditedInfo({ ...editedInfo, salary: e.target.value })
                      }
                    />
                  ) : (
                    <Typography>{selectedJob.salary}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Employment Type: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      label="Employment Type"
                      value={editedInfo.employment_type || ""}
                      onChange={(e) =>
                        setEditedInfo({
                          ...editedInfo,
                          employment_type: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography>{selectedJob.employment_type}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ ...commonStyles.box }}
                >
                  <Typography>Application deadline: </Typography>
                  {isEditMode ? (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      type="date"
                      label="Application Deadline"
                      value={
                        new Date(editedInfo.deadline).toLocaleDateString() || ""
                      }
                      onChange={(e) =>
                        setEditedInfo({
                          ...editedInfo,
                          deadline: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography variant="body1">
                      {new Date(selectedJob.deadline).toLocaleDateString()} at{" "}
                      {new Date(selectedJob.deadline).toLocaleTimeString([], {
                        timeStyle: "short",
                      })}
                    </Typography>
                  )}
                </Box>
              </Box> */}
              <TableContainer>
                <Table aria-label="simple table" sx={{ width: 1 }}>
                  <TableBody>
                    {selectedJob.description && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Description
                          </Typography>
                        </TableCell>
                        <TableCell>{selectedJob.description}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.requirements && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Requirements
                          </Typography>
                        </TableCell>
                        <TableCell>{selectedJob.requirements}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.keywords && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Keywords
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {selectedJob && selectedJob.keywords
                            ? selectedJob.keywords.split("|").join(",")
                            : ""}
                        </TableCell>
                      </TableRow>
                    )}
                    {selectedJob.vacancy && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Vacancy
                          </Typography>
                        </TableCell>
                        <TableCell>{selectedJob.vacancy}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.salary && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>Salary</Typography>
                        </TableCell>
                        <TableCell>{selectedJob.salary}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.employment_type && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Employment Type
                          </Typography>
                        </TableCell>
                        <TableCell>{selectedJob.employment_type}</TableCell>
                      </TableRow>
                    )}
                    {selectedJob.deadline && (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography sx={{ color: "gray" }}>
                            Application Deadline
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {new Date(selectedJob.deadline).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(selectedJob.deadline).toLocaleTimeString(
                            [],
                            {
                              timeStyle: "short",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {isJobseeker && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Button variant="contained" onClick={handleApply}>
                  {applyButtonText}
                </Button>
              </div>
            )}
          </Box>
          {isLoggedInUser && isCompany && (
            <Paper elevation={3} sx={{ padding: "16px", flex: 1 }}>
              <Typography variant="h6">
                Total Applicants ( {applicationCount} ):
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Tabs
                  value={selectedTab}
                  onChange={(e, newValue) => handleTabClick(newValue)}
                  style={{ marginRight: "16px" }} // Add margin to create space
                >
                  <Tab label="Get All" value="Get All" />
                  <Tab label="Get Suggested" value="Get Suggested" />
                </Tabs>
                <TextField
                  label="Search by Applicant's name"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={handleSortClick}
                  startIcon={
                    sortAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />
                  }
                  style={{ marginLeft: "400px" }} // Add margin to create space
                >
                  Sort by Name
                </Button>
              </div>
              <List>
                {Array.isArray(applications) &&
                  applications.map((applicant) => (
                    <ListItem key={applicant.jobseeker_id}>
                      <ListItemText primary={applicant.name} />
                      <Button
                        variant="outlined"
                        component="a"
                        href={applicant.resume}
                        target="_blank"
                      >
                        View Resume
                      </Button>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          )}

          <Dialog
            open={isDialogOpen}
            onClose={handleCancel}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>Edit Job Post</DialogTitle>
            <DialogContent>
              <Box>
                {/* <Typography>{selectedJob.jobpost_id}</Typography> */}
                <TextField
                  label="Title"
                  fullWidth
                  margin="dense"
                  value={editedInfo.title}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, title: e.target.value })
                  }
                />
                <TextField
                  label="Description"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={4}
                  value={editedInfo.description}
                  onChange={(e) =>
                    setEditedInfo({
                      ...editedInfo,
                      description: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Requirements"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={4}
                  value={editedInfo.requirements}
                  onChange={(e) =>
                    setEditedInfo({
                      ...editedInfo,
                      requirements: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Keywords"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={4}
                  value={editedInfo.keywords}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, keywords: e.target.value })
                  }
                />
                <TextField
                  select
                  label="Employment Type"
                  fullWidth
                  margin="dense"
                  value={editedInfo.employment_type}
                  onChange={(e) =>
                    setEditedInfo({
                      ...editedInfo,
                      employment_type: e.target.value,
                    })
                  }
                >
                  <MenuItem value="full-time">Full-Time</MenuItem>
                  <MenuItem value="part-time">Part-Time</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </TextField>
                <TextField
                  label="Vacancy"
                  fullWidth
                  margin="dense"
                  type="number"
                  value={editedInfo.vacancy}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, vacancy: e.target.value })
                  }
                />
                <TextField
                  label="Salary"
                  fullWidth
                  margin="dense"
                  type="number"
                  value={editedInfo.salary}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, salary: e.target.value })
                  }
                />
                <TextField
                  label="Aplication Deadline"
                  fullWidth
                  margin="dense"
                  type="date"
                  value={
                    new Date(editedInfo.deadline).toLocaleDateString("en-CA") ||
                    ""
                  }
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, deadline: e.target.value })
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
          <Dialog
            open={isDeleteDialogOpen}
            onClose={handleDeleteConfirmationClose}
          >
            <DialogTitle>Delete Job Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this job post?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteConfirmationClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} color="secondary">
                Confirm Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={isApplyDialogOpen}
            onClose={() => setIsApplyDialogOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>Apply for the Job</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Choose how you want to apply for this job:
              </DialogContentText>
              <div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleUploadResume}
                  sx={{ fontSize: "1.2rem", marginBottom: "1rem" }}
                >
                  Upload Resume
                </Button>
                <Button
                  variant="contained"
                  onClick={handleBuildResume}
                  sx={{ fontSize: "1.2rem" }}
                >
                  Build Resume
                </Button>
              </div>
              {/* Add the file input element */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsApplyDialogOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      ) : (
        <div style={{ textAlign: "center", marginTop: "70px" }}>
          <h1>Select A Post to Show</h1>
        </div>
      )}
    </>
  );
};

export default JobPost;
