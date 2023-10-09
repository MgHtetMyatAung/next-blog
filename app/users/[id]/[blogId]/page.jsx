import React from "react";
import BlogDetail from "./BlogDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function BlogDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <div className="container mx-auto">
        <BlogDetail blogId={params.blogId} />
      </div>
    </div>
  );
}
