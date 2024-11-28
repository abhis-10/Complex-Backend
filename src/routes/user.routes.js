import {Router} from "express"
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
            // middleware aise inject krte hai method se phele
    upload.fields([  
        {name:"avatar",
            maxCount:1
        },
        {name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser // ye method hai 
)

export default router