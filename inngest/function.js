import {inngest} from './client'
import prisma from '@/lib/prisma'

//Inngest function to save  user data to a database

export const syncUserCreation = inngest.createFunction(
  {id: 'sunc-user-create'},
  {event: 'client/user.created'},
  async ({ event}) => {
    const {data} = event
    await Prisma.user.create({
      data: {
        id: data.id,
        email:data.email_addresses[0].email_addresses,
        name:'${data.first_name} ${data.last_name}',
        image:data.image_url,
      }
    })
  }
)


// Inngst function to update user data in databas

export const syncUserUpdation = inngest.createFunction(
  {id:'sync-user-update'},
  {event:'clerk/user.updated' },
  async ({event }) => {
    const {data } = event
    await prisma.user.update({
      where: {id: data.id,},

      data: {
       
        email:data.email_addresses[0].email_addresses,
        name:'${data.first_name} ${data.last_name}',
        image:data.image_url,
      }
    })
  }
)


//inngest functio   to delete user from database

export const syncUserDeletion = inngest.createFunction(
  {id:'sync-user-update'},
  {event:'clerk/user.deleted' },
  async ({event }) => {
    const {data } = event
    await prisma.user.delete({
      where : {id: data.id,}
      
    })
  }

)