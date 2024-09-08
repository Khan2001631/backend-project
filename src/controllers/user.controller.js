import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res) => {
    // Get user details from front-end
    // Provide validation checks - not empty
    // Check if user already exists. - username, email (One is enough)
    // Check for images, avatar (required)
    // upload image on cloudinary, avatar
    // Create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response

    const {username, email, password, fullName} = req.body;

    if(
        [username, email, password, fullName].some((field) => field?.trim() === "") 
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    });

    if(existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar image is required");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

})

export {registerUser}

// Here we will notice that although we have an asyncHandler utitlity function which returns a promise,
// still it is better to write our function using async because there might be a case where we have 
// to intentionally wait some fields like in the case of uploadOnCloudinary.