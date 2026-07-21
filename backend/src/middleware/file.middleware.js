import multer from 'multer';
const storage = multer.memoryStorage();

const fileFilter = (req,file,cb)=>{
    console.log(file.mimetype);
    
    if(file.mimetype==='application/pdf'){
        cb(null,true)
    }else{
        cb(new Error("Only PDF allowed"),false)
    }
}
const upload = multer({storage,fileFilter})

export default upload