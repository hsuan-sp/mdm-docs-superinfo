import Guide from "@/components/features/Guide";
import { getQAData } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "實戰指南", // 預設 SEO 標題
};

export default async function Page() {
  const data = await getQAData();
  return <Guide initialData={data} />;
}