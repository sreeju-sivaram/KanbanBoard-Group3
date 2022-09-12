import React, { useCallback, useEffect, useState } from "react";
import { getRolesList, getExistingUsersList, assignUserToProject, getUsersList, deleteUserFrmProject } from '../api/api';

//assign user to the project and denote a role to the user for the project.

const AssignUser = (props) => {
    const { projectId } = props;
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [roleSelected, setRoleSelected] = useState([]);
    const [userSelected, setUserSelected] = useState([]);
    const [assignUserInd, setAssignUserInd] = useState(false);
    const [refetchData, setRefetchData] = useState(true);
    const [existingUsers, setExistingUsers] = useState([]);

    const fetchData = useCallback(
        async () => {
            const usersList = await getUsersList();
            const rolesList = await getRolesList();
            const existingUserRes = await getExistingUsersList(projectId);

            //get list of non existing users
            let existingIds =[];
            existingUserRes.forEach(user => {existingIds.push(user.id)});       
            setUsers(usersList.filter((user)=>!existingIds.includes(user.id)));
            setExistingUsers(existingUserRes);
            setRoles(rolesList);
            setRefetchData(false);
        },
        [setUsers, setRoles],
    );

    useEffect(
        () => {
            refetchData && fetchData();
        },
        [fetchData, refetchData]
    );

    const assignToProject =
        useCallback(
            async (role, user) => {
                const assignedUser = { "roleId": role, "userId": user, "projectId": projectId };
                const response = await assignUserToProject(assignedUser)
                if (response.data.status === 'success') {
                    setRefetchData(true)
                }
            },
            [setRefetchData, projectId]
        );
    const submission = (e) => {
        e.preventDefault();
        if (roleSelected && userSelected) {
            setRoleSelected("");
            setUserSelected("");
            assignToProject(roleSelected, userSelected);
        }
        setAssignUserInd(false);
    };

    const deleteUser =
        useCallback(
            async (id) => {
                const response = await deleteUserFrmProject(id)
                if (response.data.status === 'success') {
                    setRefetchData(true)
                }
            },
            [setRefetchData]
        );

    return (
        <div className="custom-input">
            {assignUserInd ? (
                <>
                    <table>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Delete</th>
                        </tr>
                        {existingUsers.map(item => {
                            return <tr>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td><button onClick={() => { deleteUser(item.id) }}>Remove</button></td>
                            </tr>
                        })}
                    </table>
                    <form
                        className={`custom-input-edit assign-user`}
                        onSubmit={submission}
                    >
                        <select id="roles" onChange={(event) => setRoleSelected(event.target.value)}>
                            <option value="">Select Role</option>
                            {roles.map((role) => <option value={role.id}>{role.name}</option>)}
                        </select>
                        <select id="users" onChange={(event) => setUserSelected(event.target.value)}>
                            <option value="">Select User</option>
                            {users.map((user) => <option value={user.id}>{user.name}</option>)}
                        </select>
                        <div className="custom-input-edit-footer">
                            <button type="submit">Add</button>
                            <button type="submit" onClick={() => setAssignUserInd(false)}>{"Cancel"}</button>
                        </div>
                    </form></>
            ) : (
                <p
                    className="custom-input-display"
                    onClick={() => setAssignUserInd(true)}
                >Assign Users to Project</p>
            )}
        </div>
    );

};

export default AssignUser;