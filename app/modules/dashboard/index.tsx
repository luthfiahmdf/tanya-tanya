"use client";
import { useGetQuestion, useGetUserMe, useUpdateActiveQuestion } from "./hook";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetOverlay } from "../overlay/hook";
import { TUpdateQuestion } from "./api";
import { StatCard } from "@/components/ui/card-stats";
import { ActiveQuestions } from "@/components/ui/active-question";
import { Blocks, Mail, MailQuestion } from "lucide-react";

export const ModuleDashboard = () => {
  const { data: userData } = useGetUserMe();
  const [copied, setCopied] = useState(false);
  const [copiedQna, setCopiedQna] = useState(false);
  const { data: questionData, refetch } = useGetQuestion(
    userData?.username || ""
  );
  const { data: activeQuestion, refetch: refetcOverlay } = useGetOverlay(
    userData?.id || ""
  );
  const { mutate } = useUpdateActiveQuestion(userData?.username || "");
  const setUpdateOverlay = (key: string, value: boolean) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}overlay/${userData?.id}`
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleCopyQna = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}tanyain/${userData?.username}`
    );
    setCopiedQna(true);
    setTimeout(() => {
      setCopiedQna(false);
    }, 2000);
  };

  const onShow = (questionId: TUpdateQuestion) => {
    try {
      mutate(questionId, {
        onSuccess: () => {
          refetcOverlay();
          setUpdateOverlay("update-overlay", true);
          //   console.log(questionId);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" bg-[#FFFAF0] flex flex-col md:ml-64    md:flex-row">
      <div className="w-full md:p-12 p-6 flex flex-col gap-10">
        {/* <h1 className="text-2xl underline font-bold">Dashboard</h1> */}
        <section className=" flex flex-col  gap-10 ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
            <StatCard color="#ff6b6b" title="Total Pertanyaan" value="100" icon={<Mail />} />
            <StatCard color="#ffe66d" title="Link Overlay" button buttonName={`${copied ? "Berhasil disalin" : "Salin Link"} `} onClick={() => handleCopy()} icon={<Blocks />} />
            <StatCard color="#4ecdc4" title="Link QnA" button buttonName={`${copiedQna ? "Berhasil disalin" : "Salin Link"}`} onClick={() => handleCopyQna()} icon={<MailQuestion />} />
          </div>

          <ActiveQuestions name={activeQuestion?.name || "Anomali"} question={activeQuestion?.question || ""} />
        </section>
        <section>
          <div className="border-border border-2 p-4 bg-[#4ecdc4] ">
            <div className="flex flex-row justify-between gap-2">

              <h1 className="text-2xl font-bold text-black">Pertanyaan Baru</h1>
              <Button variant="neutral" className="cursor-pointer" onClick={() => refetch()}>Segarkan</Button>
            </div>

            {questionData &&
              questionData.map((item, index) => (
                <Card
                  key={index}
                  // shadow="none"
                  variant="neutral"
                  username={item.name ? item.name : "Anomalus"}
                  question={item.question}
                  onShow={() =>
                    onShow({
                      questionId: item.id,
                    })
                  }
                  isViewed={item.isViewed}
                // createAt={distanceDate(item.createAt)}
                // size="sm"
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
