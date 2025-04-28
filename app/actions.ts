"use server";

import prisma from "@/src/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";



// export async function handleSubmission(formData: FormData) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();

//   const title = formData.get("title");
//   const content = formData.get("content");
//   const url = formData.get("url");

//   const data = await prisma.blogPost.create({
//     data: {
//       title: title as string,
//       imageUrl: url as string,
//       content: content as string,
//       authorId: user?.id as string,
//       authorImage: user?.picture as string,
//       authorName: user?.given_name as string,
//     },
//   });
//     return redirect("/dashboard")
// }



export async function handleSubmission(formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      // throw new Error("User not authenticated.");
      return redirect ("api/auth/register")
    } ;

    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const url = formData.get("url")?.toString();

    if (!title || !content || !url) {
      throw new Error("Missing form data.");
    }

    await prisma.blogPost.create({
      data: {
        title,
        imageUrl: url,
        content,
        authorId: user.id,
        authorImage: user.picture || "",
        authorName: user.given_name || "",
      },
    });

    return redirect("/dashboard");
  } catch (error) {
    console.error("Submission Error:", error);
    throw error;
  }
}
