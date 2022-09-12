const db = require("../database");

const getAllProjects = async (req, res) => {
    try {
        await db.serialize(function() {
            return db.all("SELECT * from projects", function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching");
                    return console.error(err.message);
                }
                else {
                    res.send({
                        data: rows,
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not fetch Project data" });
  }
};

const addNewProject = async (req, res) => {
    try {
        const { inputText, description, startDate, endDate,id} = req.body;
        const img_url = `https://avatars.dicebear.com/api/identicon/:${id}.svg`
        await db.serialize(function() {
            return db.run("INSERT INTO projects (name, id,  description, start_date, end_date, avatar_image_url ) VALUES (?, ?, ?, ?, ?, ?)", 
            [inputText, id, description, startDate, endDate, img_url],  function(err) {
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

const getExistingUsersForProject = async (req, res) => {
    const { id } = req.params;
    try {
        await db.serialize(function() {
            return db.all("SELECT u.*, r.name,pr.id AS prId FROM project_roles pr JOIN users u ON u.id = pr.user_id JOIN roles r ON r.id = pr.role_id WHERE pr.project_id = ?", id, function(err, rows) {
                if(err){
                    res.send("Error encountered while fetching");
                    return console.error(err.message);
                }
                else {
                    console.log("getting users by p id", rows)
                    res.send({
                        data: rows,
                    });
                }
            });
        });
    } catch (error) {
    return res.status(401).json({ error: "Could not fetch Users data" });
  }
};


module.exports = {
    getAllProjects,
    addNewProject,
    getExistingUsersForProject
}
