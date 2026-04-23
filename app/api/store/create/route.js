import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
 

// Create the store

export async function POST(request){
  try{
     const {userId} =getAuth(request)
     // get the request from the from

     const formData = await request.formData()

     const name = formData.get("name")
     const username = formData.get("username")
     const description = formData.get("escription")
     const email = formData.get("email")
     const contact = formData.get("contact")
     const address = formData.get("address")
     const image = formData.get("image")




     if(!name || !username || !description || !email || !contact || !address || !image)
     { 
      return NextResponse.json({error: "missing store info"},{status:400})

     }

     // check is user have already registerd is store
     const store = await prisma.store.findFirst({
      where: {userId:userId}
     })

     // if store is already register then send status fo  store

     if(store){
      return NextResponse.json({status: store.status})
     }


     // check is username is already taken
     const isUsernameTaken = await prisma.store.findFirst({
      where:{ username: username.toLowercase() }
     })
     
     if(isUsernameTaken){
      return NextResponse.json({error:"username alrady taken"},{status:
        400})
     }

     
    }catch (error) {

     }
     
  }
