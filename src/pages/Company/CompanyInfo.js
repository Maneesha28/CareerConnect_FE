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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import EmailIcon from "@mui/icons-material/Email";
import LaunchIcon from "@mui/icons-material/Launch";
import PhoneIcon from "@mui/icons-material/Phone";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useFetch } from './FetchContext';

function CompanyInfo({ isLoggedInUser, isJobseeker }) {
  const { fetch, setFetch } = useFetch();
  const [companyData, setCompanyData] = useState({});
  const [editedInfo, setEditedInfo] = useState({});

  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [error, setError] = useState("");
  const [avgStars, setAvgStars] = useState(0.0);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [isLoadingStars, setIsLoadingStars] = useState(true);
  const [isFollowing, setIsFollowing] = useState(null);
  const [followButtonText, setFollowButtonText] = useState(null);
  const [isLoadingFollowingInfo, setIsLoadingFollowingInfo] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const id = useParams().company_id;
  // Calculate the number of full stars
  const fullStars = Math.floor(avgStars);

  // Calculate the number of empty stars
  const emptyStars = 5 - fullStars;

  // Style for the full star icons
  const fullStarStyle = { color: "gold" };

  // Create an array of full star icons with the golden color style
  const fullStarIcons = Array.from({ length: fullStars }, (_, index) => (
    <StarIcon key={index} style={fullStarStyle} />
  ));

  // Create an array of empty star icons
  const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
    <StarBorderIcon key={index} />
  ));

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/user", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setCurrentUser(response.data);
      console.log(currentUser);
    } catch (error) {
      setError("Error fetching current user information.");
    }
  };

  const fetchAvgStars = async () => {
    try {
      const response = await axios.get(`/api/review/avg_stars/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setAvgStars(response.data.avg_stars);
      setIsLoadingStars(false);
    } catch (error) {
      setError("Error fetching rating information.");
      setIsLoadingStars(false);
    }
  };

  const fetchIsFollowing = async () => {
    try {
      const response = await axios.get(`/api/follow/is_following/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setIsFollowing(response.data.is_following);
      if (response.data.is_following == 1) {
        setFollowButtonText("Unfollow");
      } else {
        setFollowButtonText("Follow");
      }
      console.log(isFollowing);
      setIsLoadingFollowingInfo(false);
    } catch (error) {
      setError("Error fetching is following information.");
      setIsLoadingFollowingInfo(false);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`/api/company/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setCompanyData(response.data);
      setIsLoadingCompany(false);
    } catch (error) {
      setError("Error fetching company information.");
      setIsLoadingCompany(false);
    }
  };

  const fetchFollowersCount = async () => {
    try {
      const response = await axios.get(`/api/follow/follower_count/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setFollowersCount(response.data.follower_count);
    } catch (error) {
      setError("Error fetching Followers Count.");
    }
  };

  const fetchFollowers = async () => {
    try {
      const response = await axios.get(`/api/follow/followers/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setFollowers(response.data);
    } catch (error) {
      setError("Error fetching Followers.");
    }
  };

  const sendEditedInfoToBackend = async () => {
    try {
      console.log(editedInfo.company_logo);
      const response = await axios.put("/api/company", editedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const requestData = {
    company_id: parseInt(id),
  };

  useEffect(() => {
    fetchCompanyData();
    fetchFollowersCount();
    fetchAvgStars();
  }, [id]);

  useEffect(() => {
    if(fetch){
      fetchAvgStars();
      setFetch(false);
    }
  }, [fetch]);
  useEffect(() => {
    if (isJobseeker) fetchIsFollowing();
  }, [id, isFollowing]);

  //useEffect hook to listen for changes in profile_pic
  useEffect(() => {
    if (editedInfo.company_logo) {
      console.log("Sending edited info to backend");
      sendEditedInfoToBackend();
    }
    fetchCompanyData();
  }, [editedInfo.company_logo]);

  if (isLoadingCompany || isLoadingStars) {
    return <div>Loading Company</div>;
  }
  if (isJobseeker && isLoadingFollowingInfo) {
    return <div>Loading Following Info</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!companyData) {
    return <div>Company Data not found.</div>;
  }

  const handleFollow = async () => {
    console.log("is following ", isFollowing);
    if (isFollowing == 0) {
      try {
        console.log(id);
        const response = await axios.post("/api/follow", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      fetchIsFollowing();
      fetchFollowersCount();
    } else if (isFollowing == 1) {
      try {
        console.log(id);
        const response = await axios.delete("/api/follow", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: requestData,
        });
        console.log(requestData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
      fetchIsFollowing();
      fetchFollowersCount();
    }
  };

  const handleEdit = () => {
    setEditedInfo({ ...companyData });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsDialogOpen(false);
      setIsEditMode(false);
      setIsImageEditMode(false);

      // Send editedInfo to the backend
      const response = await axios.put("/api/company", editedInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        // Update jobseekerData with the editedInfo
        setCompanyData(editedInfo);
      } else {
        console.error("Failed to update Company info.");
      }
    } catch (error) {
      console.error("Error updating Company info:", error);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setIsImageEditMode(false); // Disable image edit mode when saving
    setIsDialogOpen(false);
  };

  const handleImageClick = () => {
    setIsImageEditMode(true);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageRef = ref(storage, `profile_pictures/${file.name + v4()}`);
        await uploadBytes(imageRef, file);
        const imageUrl = await getDownloadURL(imageRef);

        const updatedEditedInfo = { ...editedInfo, company_logo: imageUrl };
        setEditedInfo(updatedEditedInfo);
        setIsImageEditMode(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShowFollowers = (event) => {
    fetchFollowers();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleVisitFollower = (jobseeker_id) => {
    window.location.href = `/jobseeker/${jobseeker_id}`;
  };

  const buttonStyle = {
    backgroundColor: "blue", // Set the background color to blue
    color: "white", // Set the text color to white
  };

  return (
    <>
      <Box display="flex">
        <Box p={3} width="100%">
          <Paper elevation={8} sx={{ p: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ mb: 0, paddingLeft: 10 }}>
                {isEditMode ? (
                  <TextField
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    label="Company Name"
                    value={editedInfo.company_name || ""}
                    onChange={(e) =>
                      setEditedInfo({
                        ...editedInfo,
                        company_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <Typography
                    variant="body1"
                    style={{ fontSize: "40px", fontWeight: "bolder" }}
                  >
                    {companyData.company_name}
                  </Typography>
                )}
              </Box>
              {isLoggedInUser && isEditMode && (
                <Box>
                  <IconButton
                    color="primary"
                    onClick={handleSave}
                    sx={{ mr: 1 }}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={handleCancel}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              )}
              {isLoggedInUser && !isEditMode && (
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
              {isJobseeker && (
                <IconButton
                  onClick={handleFollow} // Define handleFollow function for the "Follow+" button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "bold", color: "white" }}
                  >
                    {followButtonText}
                  </Typography>
                </IconButton>
              )}
            </Box>
            <Box sx={{ paddingLeft: 10 }}>
              <Typography variant="h5" gutterBottom style={{ fontWeight: 700 }}>
                {fullStarIcons}
                {emptyStarIcons}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ paddingLeft: 10}}>
              <Box>
                {isLoggedInUser && isImageEditMode ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ mb: 2 }}
                  >
                    <label htmlFor="image-upload">
                      {editedInfo.company_logo ? (
                        <Avatar
                          src={editedInfo.company_logo}
                          alt="Company Logo"
                          sx={{
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <AccountCircleIcon
                          sx={{
                            fontSize: 200,
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
                    Select New Logo
                    {isLoggedInUser ? (
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    ) : null}
                  </Button>

                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                    {companyData.company_logo ? (
                      <img
                        src={companyData.company_logo}
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
                        sx={{
                          fontSize: 200,
                          color: "#757575",
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick}
                      />
                    )}
                  </Box>
                )}
                <Box alignItems="center" sx={{ paddingTop: 3, paddingLeft: 3 }}>
                  <button
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={handleShowFollowers}
                  >
                    Followers ({followersCount})
                  </button>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    {followers.map((follower) => (
                      <MenuItem
                        key={follower.jobseeker_id}
                        onClick={() =>
                          handleVisitFollower(follower.jobseeker_id)
                        }
                      >
                        {follower.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
              <Box flex="1">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ mb: 5, paddingLeft: 10 }}>
                      {isEditMode ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          label="Description"
                          value={editedInfo.about || ""}
                          onChange={(e) =>
                            setEditedInfo({
                              ...editedInfo,
                              about: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Typography variant="subtitle1" sx={{ p: 3 }}>
                          {companyData.about}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TableContainer sx={{ paddingLeft: 20 }}>
                      <Table aria-label="simple table" sx={{ width: 1 / 2 }}>
                        <TableBody>
                          {companyData.address && (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <MyLocationIcon />
                              </TableCell>
                              <TableCell>{companyData.address}</TableCell>
                            </TableRow>
                          )}
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <EmailIcon />
                            </TableCell>
                            <TableCell>{companyData.email}</TableCell>
                          </TableRow>
                          {companyData.website_address && (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <LaunchIcon />
                              </TableCell>
                              <TableCell>
                                <a
                                  href={`http://${companyData.website_address}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {companyData.website_address}
                                </a>
                              </TableCell>
                            </TableRow>
                          )}
                          {companyData.phone_no && (
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <PhoneIcon />
                              </TableCell>
                              <TableCell>{companyData.phone_no}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancel}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Company Information</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Company Name"
              value={editedInfo.company_name || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, company_name: e.target.value })
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="dense"
              label="Description"
              value={editedInfo.about || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, about: e.target.value })
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
              label="Website"
              value={editedInfo.website_address || ""}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  website_address: e.target.value,
                })
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
              label="Trade License"
              value={editedInfo.trade_license || ""}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, trade_license: e.target.value })
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

export default CompanyInfo;
