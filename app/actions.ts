"use server";

import prisma from "@/src/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      // throw new Error("User not authenticated.");
      return redirect("api/auth/register");
    }

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

    revalidatePath("/")
    revalidatePath("/dashboard")

    return redirect("/dashboard");
  } catch (error) {
    console.error("Submission Error:", error);
    throw error;
  }
}
