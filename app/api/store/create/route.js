import { prisma } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    const formData = await request.formData();

    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description")
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    if (!name || !username || !description || !email || !contact || !address || !image) {
      return NextResponse.json({ error: "missing store info" }, { status: 400 });
    }

    const store = await prisma.store.findFirst({
      where: { userId },
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json({ error: "username already taken" }, { status: 400 });
    }

    // create store
    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        username:username.toLowerCase(),
        description,
        email,
        contact,
        address,
        image,
      },
    });

    return NextResponse.json(newStore);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}