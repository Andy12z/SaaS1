import { currentUser } from "@clerk/nextjs/server";
import { getCompanion } from "../../../lib/actions/companion.action";
import { redirect } from "next/navigation";
import { getSubjectColor } from "../../../lib/utils";
import Image from "next/image";
import CompanionComponent from "../../../components/CompanionComponent";

type CompanionSesssionPageProps = {
  params: Promise<{ id: string }>;
};
export default async function CompanionSession({params}:CompanionSesssionPageProps) {
  const {id} = await params;
  const companion =await getCompanion(id);
  const user = await currentUser();

  const {name,subject,title,topic,duration} = companion;
  if(!user) redirect('/sign-in');
  if(!companion) redirect('/companions');
  return (
    <main>
      <article className="flex rouned-border justify-between p-6 max-md:flex-col">
    <div className="flex items-center gap-2">
      <div className="size-[72px]  flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor:getSubjectColor(companion.subject)}}>
        <Image
          src={`/icons/${companion.subject}.svg`} 
          alt={companion.subject} 
          width={35} 
          height={35} 
        />


      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="font-bold text-2xl">{companion.name}</p>
          <div className="subject-badge max-sm:hidden">{
            companion.subject}</div>
        </div>
        <p className="text-lg">{companion.topic}</p>
      </div>

    </div>
    <div className="text-2xl items-start max-md:hidden">{companion.duration}minutes</div>

      </article>
      <CompanionComponent
      {...companion}
      companionId={id}
      userName={user.firstName!}
      userImage={user.imageUrl!}
       />

    </main>
  );
}
