export const catchAsyncErrors=(asyncFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(asyncFunction(req,res,next)).catch(next)
    }
}