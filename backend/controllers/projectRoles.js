const db = require("../database");

const assignUser = async (req, res) => {
    try {
        const { roleId,userId,projectId} = req.body;
        console.log(roleId,userId,projectId);
        const id = String(roleId) + String(userId) + String(projectId);
        await db.serialize(function() {
            return db.run("INSERT INTO project_roles (project_id, role_id,  user_id, id) VALUES (?, ?, ?, ?)", 
            [projectId, roleId, userId, id],  function(err) {
                if(err){
                    res.send("Error encountered while inserting project");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        status: 'success'
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not create new Project" });
  }
};

//gets list of projects fr the usr and if they are an admin on any project
const getIsAdminInd = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            return db.all("SELECT pr.role_id, p.* FROM project_roles pr LEFT JOIN projects p ON pr.project_id = p.id WHERE pr.user_id = ?",id, function(err, rows) { 
                if(err){
                    res.send("Error encountered while checking if user is admin");
                    return console.error(err.message);
                }
                else {
                    let isAdmin = false;
                    rows && rows.map((item) => {
                        if(item.role_id === 1) {
                        isAdmin = true}});
                    res.send({
                        data: {isAdmin,rows},
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not find if user is an admin" });
  }
};

const getUsersProjectRole = async (req, res) => {
    try {
        const { id,pId } = req.params;
        await db.serialize(function() {
            return db.all("SELECT * FROM project_roles WHERE user_id = ? AND project_id = ?", 
            [id,pId],  function(err,rows) {
                if(err){
                    res.send("Error encountered while finding role");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        data: rows ? rows[0]?.role_id : 0,
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not find user's role for this project" });
  }
};

const deleteUserFrmProject = async (req, res) => {
    try {
        const { id } = req.params;
        await db.serialize(function() {
            return db.all("DELETE from project_roles WHERE user_id=?", id, function(err) {
                if(err){
                    res.send("Error encountered while deleting");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        status: 'success'
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not delete user from project" });
  }
};


module.exports = {
    assignUser,
    getIsAdminInd,
    getUsersProjectRole,
    deleteUserFrmProject
}