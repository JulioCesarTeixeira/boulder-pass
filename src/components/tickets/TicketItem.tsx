"use client";

import { Ticket, User } from "@prisma/client";
import { deleteTicket } from "./RegisterAction";

async function handleTicketDelete(id: string) {
  if (confirm("Are you sure?")) {
    await deleteTicket(id);
  } else {
    return;
  }
}

export function TicketItem({
  ticket,
  users,
}: {
  ticket: Ticket;
  users: User[];
}) {
  return (
    <li key={ticket.id}>
      <div className="flex items-center justify-start gap-4">
        <p className="flex-shrink-0 text-sm font-semibold leading-6 text-gray-900">
          {users.find((user) => user.id === ticket.customerId)?.name}
        </p>
        <p className="text-sm leading-6 text-gray-500">
          {ticket.createdAt.toString()}
        </p>

        <button
          onClick={() => handleTicketDelete(ticket.id)}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Delete
        </button>
      </div>
      <p className="text-sm leading-6 text-gray-500">{ticket.remarks}</p>
    </li>
  );
}
