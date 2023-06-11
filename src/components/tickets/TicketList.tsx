"use server";

import { prisma } from "@/lib/prisma";
import { TicketItem } from "./TicketItem";

async function getAllTickets() {
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
  });

  const userIds = tickets.map((ticket) => ticket.customerId);

  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });

  return { tickets, users };
}

export async function TicketList() {
  const { tickets, users } = await getAllTickets();

  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900">Users</h2>
      <ul className="mt-2 space-y-2">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} users={users} />
          ))
        ) : (
          <li>
            <p className="text-sm leading-6 text-gray-500">No users yet</p>
          </li>
        )}
      </ul>
    </div>
  );
}
