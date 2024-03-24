import React, { useState } from "react";
import { Container, Typography, Button, TextField, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import { set } from "date-fns";

const Settings = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const baseURL = `http://localhost:14000/api/users/update`;
    const { userId } = useParams();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleChangeEmail = async () => {
        if (newEmail !== confirmEmail) {
            alert("Emails do not match");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:14000/api/users/update`, {
                userId: userId,
                oldEmail: oldEmail,
                newEmail: newEmail,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            alert("Email updated successfully");
            setOldEmail("");
            setNewEmail("");
            setConfirmEmail("");          
        } catch (error) {
            alert("Failed to update email: " + error.response.data.error);
            console.error("Error updating email:", error);
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:14000/api/users/update`, {
                userId: userId,
                oldEmail: oldEmail,
                newEmail: newEmail,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            alert("Password updated successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (error) {
            alert("Failed to update password: " + error.response.data.error);
            console.error("Error updating password:", error);
        }
    };


    return (
        <div style={{ width: "100%", position: "relative", minHeight: "100vh" }}>
            <Header />

            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Old Email"
                            variant="outlined"
                            fullWidth
                            value={oldEmail}
                            onChange={(e) => setOldEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="New Email"
                            variant="outlined"
                            fullWidth
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Confirm New Email"
                            variant="outlined"
                            fullWidth
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                        />
                    </Grid>
                    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <Button variant="contained" onClick={handleChangeEmail} sx={{ ml: 2 }}>
                            Change Email
                        </Button>
                    </div>
                </Grid>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField
                            label="Old Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>

                <div style={{ marginTop: "20px" }}>
                    <Button variant="contained" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                    <Button variant="outlined" onClick={handleGoBack} sx={{ ml: 2 }}>
                        Go Back
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default Settings;