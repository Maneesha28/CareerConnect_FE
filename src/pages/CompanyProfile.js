import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyProfile.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// Helper components for each tab
const AboutTab = ({ companyData, onFormSubmit,onCancel }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ ...companyData });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData({ ...companyData });
    onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(editedData);
    setEditMode(false);
  };
  // Render the about tab content
  
  return (
    <div>
      <h3>About</h3>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>Name:</th>
                <td>
                  <input
                    type="text"
                    name="company_name"
                    value={editedData.company_name}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Logo:</th>
                <td>
                  <input
                    type="text"
                    name="company_logo"
                    value={editedData.company_logo}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={editedData.description}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>
                  <input
                    type="text"
                    name="adress"
                    value={editedData.address}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Website:</th>
                <td>
                  <input
                    type="text"
                    name="website_address"
                    value={editedData.website_address}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Phone No:</th>
                <td>
                  <input
                    type="text"
                    name="phone_no"
                    value={editedData.phone_no}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Trade License:</th>
                <td>
                  <input
                    type="text"
                    name="trade_license"
                    value={editedData.trade_license}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              {/* Add other editable fields in a similar manner */}
            </tbody>
          </table>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
      <table>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{companyData.company_name}</td>
          </tr>
          <tr>
            <th>Logo:</th>
            <td>{companyData.company_logo}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{companyData.description}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{companyData.address}</td>
          </tr>
          <tr>
          <th>Website:</th>
          {companyData.website_address ? (
                        <td> 
                          <a
                            href={companyData.website_address.startsWith('http') ? companyData.website_address : `http://${companyData.website_address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                          Website Link
                          </a>
                      </td>) : 
                      (<td></td>)}
          </tr>
          <tr>
            <th>Phone No:</th>
            <td>{companyData.phone_no || 'Not available.'}</td>
          </tr>
          <tr>
            <th>Trade License:</th>
            <td>{companyData.trade_license || 'Not available.'}</td>
          </tr>
          {/* Add more rows for other general information */}
        </tbody>
      </table>
      )}
      {!editMode && (
        <button type="button" onClick={handleEditClick}>
          Edit
        </button>
      )}
    </div>
  );
};

const CompanyProfile = () => {
    const navigate = useNavigate();
    
    const [companyData, setCompanyData] = useState(null);
    
    const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('about'); // Initial active tab
  
    const id = useParams().company_id;

// Inside the CompanyProfile component
const handleFormSubmit = async (editedData) => {
  try {
    // Perform the PUT request to save the edits in the backend
    const response = await axios.put(`http://localhost:3001/api/company/${id}`, editedData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(response.data);
    // Assuming the response from the backend contains a success status, e.g., { success: true }
    if (response.data.status === "Company edited") {
      console.log("Inside if")
      // Redirect to the profile page after successful edit
      navigate.push(`company/${id}`); 
    } else {
      // Handle the case when the backend returns an error status
      setError('Error saving company information.');
    }
  } catch (error) {
    setError('Error saving company information.');
  }
};

  
    const handleCancelForm = () => {
      // You can add any additional logic here if needed when canceling the form.
    };
  
  
    useEffect(() => {
      const fetchCompanyData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/company/${id}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          console.log(response.data);
          setCompanyData(response.data);
          setIsLoadingCompany(false);
        } catch (error) {
          setError('Error fetching company information.');
          setIsLoadingCompany(false);
        }
      };
  
    fetchCompanyData();

    }, [id]);
  
    if (isLoadingCompany) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    const handleTabChange = (tabName) => {
      setActiveTab(tabName);
    };
  
    if (!companyData) {
      return <div>Company not found.</div>;
    }

    const handleLogout = () => {
        axios.post('http://localhost:3001/api/auth/logout', {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = '/auth/login';
            }
        })
        .catch((error) => {
            console.log(error);
        });
      };
  
    return (
      <div className="company-profile">
        {/* add a logout button on the top right corner */}
        <div className="logout" onClick={handleLogout}>
        Logout
      </div>
        <h2>Company Profile</h2>
        <div className="tab">
          <div
            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleTabChange('about')}
          >
            About
          </div>
        </div>
  
        <div className="tab-content">
        {/* Render the content of the selected tab */}
        {activeTab === 'about' && (
          <AboutTab
            companyData={companyData}
            onFormSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        )}
      </div>
      </div>
    );
  };
  

export default CompanyProfile;