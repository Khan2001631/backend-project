import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser = asyncHandler((req,res) => {
    res.status(200).json({
        message: 'register user testing'
    })
})

export {registerUser}