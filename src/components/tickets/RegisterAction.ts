"use server";

import { prisma } from "@/lib/prisma";

type FormDataType = {
  email: string;
  name: string;
  remarks?: string | undefined;
};

export const handleRegisterFormAction = async (data: FormDataType) => {
  console.log("RegisterAction", data);

  try {
    // Save to database using Prisma client
    // It should create a new ticket in the database and associate it with a user
    // If the user already exists, it should associate the ticket with the existing user
    // If the user does not exist, it should create a new user and associate the ticket with the new user

    // const user = await prisma.user.upsert({
    //   where: { email: data.email },
    //   update: {},
    //   create: {
    //     email: data.email,
    //     name: data.name,
    //   },
    // });

    // const ticket = await prisma.ticket.create({
    //   data: {
    //     remarks: data.remarks,
    //     user: {
    //       connect: {
    //         id: user.id,
    //       },
    //     },
    //   },
    // });

    // console.log("ticket", ticket);

    return {
      success: true,
      message: "Ticket created successfully",
      data: {
        status: "success",
        email: data.email,
        name: data.name,
        remarks: data.remarks,
      },
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Error creating ticket");
  }
};
