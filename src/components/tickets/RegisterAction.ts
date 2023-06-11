"use server";

import { FormDataType } from "@/dtos/ticket.dto";
import { prisma } from "@/lib/prisma";
import { TicketType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const handleRegisterFormAction = async (data: FormDataType) => {
  console.log("RegisterAction", data);

  try {
    // Starts a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Upserts a user
      const user = await prisma.user.upsert({
        where: { email: data.email },
        update: { name: data.name }, // updates the name if user exists
        create: { email: data.email, name: data.name }, // creates user if not exists
      });

      // Creates a ticket and associates it with the user
      const ticket = await prisma.ticket.create({
        data: {
          type: TicketType.SINGLE,
          remarks: data.remarks,
          isValid: true, // or false, depends on your business logic
          expiresAt: new Date(), // put the correct date here
          customerId: user.id,
        },
      });

      return { user, ticket };
    });

    console.log("result", result);

    revalidatePath("/");
    return result;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error creating ticket");
  }
};

export const deleteTicket = async (id: string) => {
  try {
    const result = await prisma.ticket.delete({
      where: { id },
    });
    console.log("result", result);
    revalidatePath("/");
    return result;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error deleting ticket");
  }
};
