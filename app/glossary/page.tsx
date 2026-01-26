import Glossary from "@/components/features/Glossary";
import { getGlossaryData } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "術語表", // 預設 SEO 標題
};

export default async function Page() {
  const data = await getGlossaryData();
  return <Glossary initialData={data} />;
}