import { RegisterForm } from "@/components/tickets/RegisterForm";
import { TicketList } from "@/components/tickets/TicketList";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <RegisterForm />
      <Suspense fallback={<div>Loading tickets...</div>}>
        <TicketList />
      </Suspense>
    </>
  );
}
