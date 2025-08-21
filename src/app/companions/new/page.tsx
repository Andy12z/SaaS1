import { auth } from "@clerk/nextjs/server";
import CompanionForm from "../../../components/companion-form";
import { redirect } from "next/navigation";

export default async function NewCompanion() {
  const {userId} =await auth();
  if(!userId){
    redirect('/sign-in');
  }
  return (
    <main className="min-lg:w-1/3 min-md:w-1/3 flex items-center justify-center">
        <article className="w-full gap-4 flex flex-col">
            <h1>Companion builder</h1>
            <CompanionForm />
        </article>
    </main>
  )
}
