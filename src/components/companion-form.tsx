"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z} from "zod";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
   
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea";
import { subjects } from "../constants";
import { createCompanion } from "../lib/actions/companion.action";
import { redirect } from "next/navigation";

const formSchema = z.object({
   name: z.string().min(1,{ message:"companion is required"}),
   subject: z.string().min(1,{ message:"subject is required"}),
   voice: z.string().min(1,{ message:"voice is required"}),
    topic: z.string().min(1,{ message:"topic is required"}),
    style: z.string().min(1,{ message:"style is required"}),
    duration:z.coerce.number().min(1, { message: "Duration is required" }),
})


export default function CompanionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      subject: "",
      voice: "",
      topic: "",
      style: "",
      duration: 15,
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    const companion =await createCompanion(values);
    if(companion){
      redirect( `/companions/${companion.id}`);
    }
    else {
      console.error("Failed to create companion");
      redirect('/');
    }
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the companion name" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="subject" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="Select the subject." />
  </SelectTrigger>
  <SelectContent>
    {subjects.map((subject)=>(
      <SelectItem 
      value={subject}
      key={subject}
         className="capitalize"
      >
        {subject}
      </SelectItem>

    ))}
  </SelectContent>
</Select>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="Select the voice." />
  </SelectTrigger>
  <SelectContent>
      <SelectItem 
      value="male">male
      
      </SelectItem> 
      <SelectItem value='casual'>casual</SelectItem>


    
  </SelectContent>
</Select>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
  <SelectTrigger className="input capitalize">
    <SelectValue placeholder="Select the style." />
  </SelectTrigger>
  <SelectContent>
      <SelectItem 
      value="formal">formal
      
      </SelectItem> 
      <SelectItem value='female'>casual</SelectItem>


    
  </SelectContent>
</Select>
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should the companion help with?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Derivatives & Integrals" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Session Duration in minutes.</FormLabel>
              <FormControl>
                <Input 
                type="number"
                placeholder="15" {...field} className="input" />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Build your companion</Button>
      </form>
    </Form>
  );
}
