import mongoose from "mongoose"
export const userModel=mongoose.model(
    "usuarios", 
    new mongoose.Schema(
        {
            name: String, 
            email: {
                type: String, unique:true
            }
        },
        {
            // collection: "users2021",
            timestamps: true, 
            strict: false,
        }
    )
)