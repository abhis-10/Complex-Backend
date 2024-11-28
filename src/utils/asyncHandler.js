// const asyncHandler = (func)=>async (req, res, next)=>{}   // both are same function
// try {
//     await func(req,res,next)
    
// } catch (error) {
//     res.status(error.code || 500).json({
//         success:false,
//         message:error.message
//     })
// }

const asyncHandler = (requestHandler)=>{
  return  (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}
export {asyncHandler}