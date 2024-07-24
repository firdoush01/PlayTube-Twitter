//promise method------------------------------------------

const asyncHandler = (requestHandler) =>{
    (req, res, next) =>{
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}

export {asyncHandler}

//try-catch method-------------------------------------
// const asyncHandler = (fn) => async (err, req, next) =>  {
//     try {
//         await fn(err, res, next )
//     } catch (error) {
//         res.status(err.code || 400).json({
//             success: false,
//             message: err.message
//         })
//     }
// }