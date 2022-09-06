import React, { useCallback, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getProjectsList, addProject, getIsAdminInd } from '../api/api';
import CustomInput from "./CustomInput";
import AssignUser from "./AssignUser";
import ChangePassword from "./ChangePassword";
import { CardActionArea, CardHeader, Typography, Avatar, CardMedia, CardContent, Card } from "@mui/material";
import AuthContext from "../context/AuthProvider";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [refetchData, setRefetchData] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { auth,setAuthData } = useContext(AuthContext);

    const fetchData = useCallback(
        async () => {
            const projectListResponse = await getProjectsList()
            setProjects(projectListResponse);
            const isAdminResponse = await getIsAdminInd(auth.data.id);
            setIsAdmin(isAdminResponse);
            setRefetchData(false);
        },
        [setProjects, setIsAdmin],
    );

    useEffect(
        () => {
            refetchData && fetchData();
        },
        [fetchData, refetchData]
    );

    const addNewProject =
        useCallback(
            async (values) => {
                const newProjectData = { ...values, "id": projects.length + 1 };
                const response = await addProject(newProjectData)
                if (response.data.status === 'success') {
                    setRefetchData(true)
                }
            },
            [projects, setRefetchData]
        );

    return (
        <div className="app">
            <div className="app-nav">
                <h1>Projects Dashboard</h1>
                {isAdmin && <div>
                    <CustomInput
                        displayClass="app-boards-add-board"
                        editClass="app-boards-add-board-edit"
                        text="Add Project"
                        buttonText="Add Project"
                        onSubmit={addNewProject}
                        isAddProject={true}
                        placeholder="Add project name"
                    />
                </div>}
                <div>
                    <ChangePassword />
                </div>
                <div className="projects">
                    {projects.map((item) => (
                        <div className="projects-item">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea component={Link} to="/kanban_board" onClick={() =>{setAuthData({...auth.data,"projectId":item.id})}}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.avatar_image_url}
                                /></CardActionArea>
                                    <CardHeader
                                        avatar={<Avatar alt={item?.name} src={item.avatar_image_url} />}
                                        title={item?.name} />
                                    <CardContent>
                                        <Typography>{item.description}</Typography>

                                    </CardContent>
                                    
                                <AssignUser
                                    projectId={item.id} />
                            </Card></div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default Project