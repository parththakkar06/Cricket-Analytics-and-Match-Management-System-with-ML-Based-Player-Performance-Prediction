
const rolemodel = require('../models/RoleModel')

// ------------------------ role create api =---------------------------------------------------------
const createRole = async (req, res) => {

    try {
        const createRole = await rolemodel.create(req.body);
        res.status(201).json({
            mess: "role create successfully !!! ",
            data: createRole
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

// ---------------------------------- get all role api ----------------------------------------------------

const getallrole = async(req,res)=>{

    try{
        const allrole = await rolemodel.find()
        res.status(201).json({
            message:"All role data fetched",
            data:allrole
        }) 

    }catch(err){
        res.status(500).json({
            message:"role internal server error"
        })
    }
}

// ----------------------------------------delete role api --------------------------------------------------------------

const deleteRole = async(req,res)=>{

    try{
        const id = req.params.id
        const deleterole = await rolemodel.findByIdAndDelete(id)
        if(deleterole == null){
            res.status(400).json({
                message:"role not found"
            })
        }
        else{
            res.json({
                message:"role delete successfully",
                data:deleterole
            })
        }

    }catch(err){
        res.status(500).json({
            message:"role internal server error"
        })
    }
}
// ----------------------------------get all by id ----------------------------------------------------------

const getrolebyid = async(req,res)=>{
    
        try{
            const id = req.params.id
            const rolebyid = await rolemodel.findById(id)
            if(rolebyid == null){
                res.status(400).json({
                    message:"role not found"
                })
            }
            else{
                res.json({
                    message:"role fetched successfully",
                    data:rolebyid
                })
            }
    
        }catch(err){
            res.status(500).json({
                message:"role internal server error"
            })
        }
}



module.exports = {
    createRole,
    getallrole,
    deleteRole,
    getrolebyid
}