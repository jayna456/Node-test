const { generateToken } = require('../middleware/authorization');
const { generatePassword, verifyPassword } = require('../util/password');
const user = require('./user.model')

exports.signUp = async (req,res) => {
    console.log("sign up aapi called ", req.body)

    let newUser = new user();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = generatePassword(req.body.password);
    const storedUser = await newUser.save();

    if(storedUser) {
        const tokenObject = {
            _id: storedUser._id,
            email: storedUser.email,
            password: storedUser.password
        }
        res.json({
            code:200,
            success:true,
            data: storedUser,
            authToken: generateToken(tokenObject)
        })
    }
    else {
        res.json({
            code:500,
            success:false,
        })
    }
}

exports.login = async (req,res) => {
    console.log("login API called");

    const foundUser = await user.findOne({email:req.body.email}).lean().exec();

    if(foundUser) {
        if(verifyPassword(foundUser.password, req.body.password)) {
            const tokenObject = {
                _id: foundUser._id,
                email: foundUser.email,
                password: foundUser.password
            }
            res.json({
                code:200,
                success:true,
                data: foundUser,
            authToken: generateToken(tokenObject)
            })
        }
        else {
            res.json({
                code: 409,
                success: false,
                message: "Password is wrong!"
            })
        }
    }
    else {
        res.json({
            code:404,
            success:false,
            message:"No such user found with this email"
        })
    }
}

exports.getProfile = async (req,res) => {
    console.log("get profile api called");

    const userDetail = await user.findById({ _id: req.query.id }).lean().exec();

    if(userDetail) {
        res.json({
            code:200,
            success:true,
            data:userDetail
        })
    }
    else {
        res.json({
            code: 404,
            success:false,
            message: "No data found with the given id"
        })
    }
}

exports.updateProfile = async (req,res) => {
    console.log("update profile api called ", req.body, req.file);

    const foundUser = await user.findOne({_id:req.body.id}).lean().exec();

    if(foundUser) {
        const image = req.file ? 'http://localhost:8000/'+ req.file.filename : '';

        user.findByIdAndUpdate({ _id: foundUser._id }, 
            {
                image:image,
                gender:req.body.gender?req.body.gender: foundUser.gender,
                phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : foundUser.phoneNumber,
                email: req.body.email?req.body.email:foundUser.email,
                firstName: req.body.firstName ? req.body.firstName : foundUser.firstName,
                lastName: req.body.lastName ? req.body.lastName : foundUser.lastName
            }, {new:true}, (err) => {
                if(err) {
                    req.json({
                        code: 500,
                        success: false,
                        message: err.message
                    })
                }
                else {
                    res.json({
                        code: 200,
                        success:true,
                    })
                }
            })
    }
    else {
        res.json({
            code: 404,
            success:false,
            message: "No User found"
        })
    }
}