import { redirect } from "next/navigation";

const redirectToParent = (id: string, path: string) => {
  redirect(`/${id}/${path}`);
};

export default redirectToParent;
