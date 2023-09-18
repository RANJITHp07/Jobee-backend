import express,{Request,Response} from "express";
import multer from "multer"
import sharp from 'sharp'
import crypto from 'crypto'
import dotenv from "dotenv"
import cors from "cors"
import { getObjectSignedUrl, uploadFile } from "./s3";


const app=express()

app.use(cors())
dotenv.config()

app.use(express.static('public'))



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')




app.post('/v1/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const imageName = generateFileName();
    let fileBuffer;

    if (file.mimetype === 'application/pdf') {
      
      fileBuffer = file.buffer;
    } else if (file.mimetype.startsWith('image/')) {
      
      fileBuffer = await sharp(file.buffer).toBuffer();
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    await uploadFile(fileBuffer, imageName, file.mimetype);

    res.status(200).json(imageName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get("v1/api/upload",async(req, res)=>{
  try{
       const url=getObjectSignedUrl(req.query.imageName as string)
       res.status(200).json(url);
  }catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.listen(3000,()=>{
    console.log("connected to the port")
})
