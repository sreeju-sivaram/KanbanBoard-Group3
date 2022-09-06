const db = require("../database");

const assignUser = async (req, res) => {
    try {
        console.log("in assignUser")
        const { roleId,userId,projectId} = req.body;
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

const getIsAdminInd = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("in getIsAdminInd", id);
        await db.serialize(function() {
            return db.run("SELECT INTO project_roles (user_id) VALUES (?)", 
            [id],  function(err) {
                //iterate through and find if the user is an admin on any project 
                if(err){
                    res.send("Error encountered while checking is user is admin");
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
    return res.status(401).json({ error: "Could not find if user is an admin" });
  }
};

const getUsersProjectRole = async (req, res) => {
    try {
        const { id,pId } = req.params;
        console.log("in getUsersProjectRole", id, pId, req.params);
        await db.serialize(function() {
            return db.run("SELECT INTO project_roles (user_id) VALUES (?)", 
            [id],  function(err) {
                if(err){
                    res.send("Error encountered while finding role");
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
    return res.status(401).json({ error: "Could not find user's role for this project" });
  }
};


module.exports = {
    assignUser,
    getIsAdminInd,
    getUsersProjectRole
}