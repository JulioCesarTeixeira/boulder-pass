import { RegisterForm } from "@/components/tickets/RegisterForm";
import { TicketList } from "@/components/tickets/TicketList";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <RegisterForm />
      <Suspense fallback={<div>Loading tickets...</div>}>
        {/* @ts-ignore */}
        <TicketList />
      </Suspense>
    </>
  );
}
