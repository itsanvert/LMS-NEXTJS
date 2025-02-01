"use client";

import * as z from "zod";
import axois from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { title } from "process";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});
const CreatePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  return <div>Create page</div>;
};

export default CreatePage;
