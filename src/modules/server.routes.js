import { globalError } from "../middlewares/globalError.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import SubCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishListRouter from "./wishList/wishList.routes.js"

const init = (app)=>{
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/subcategories', SubCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/auth',authRouter),
    app.use('/api/v1/users',userRouter),
    app.use('/api/v1/reviews',reviewRouter),
    app.use('/api/v1/wishLists',wishListRouter),
    app.use('/api/v1/coupons',couponRouter)






    //GLOBAL ERROR 
    app.use(globalError)
}
export default init