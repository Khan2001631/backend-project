const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }
}




// const asyncHandler = () => {}
// const asyncHandler = (func) => {() => {}}
// const asyncHandler = (func) => async () => {}   


// /*
// // Async Handler using try catch block (One of the ways in production)
// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     }
//     catch(error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
// */