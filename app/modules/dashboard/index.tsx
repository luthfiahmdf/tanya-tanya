"use client";
import { useGetDashboardData, useGetQuestion, useGetUserMe, useUpdateActiveQuestion } from "./hook";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetOverlay } from "../overlay/hook";
import { TUpdateQuestion } from "./api";
import { StatCard } from "@/components/ui/card-stats";
import { ActiveQuestions } from "@/components/ui/active-question";
import { Blocks, Mail, MailQuestion } from "lucide-react";
import { useGetOverlaySettings } from "../setting/hook";

export const ModuleDashboard = () => {
  const { data: userData } = useGetUserMe();
  const [copied, setCopied] = useState(false);
  const [copiedQna, setCopiedQna] = useState(false);
  const { data: dataDashboard, isLoading, refetch: refetchTotalData } = useGetDashboardData(userData?.id || "",)
  const { data: questionData, refetch, isLoading: isloadingQuestion } = useGetQuestion(
    userData?.username || ""
  );
  const { data: activeQuestion, refetch: refetcOverlay } = useGetOverlay(
    userData?.id || ""
  );
  const { data: settings, } = useGetOverlaySettings(userData?.id || "");
  const { mutate } = useUpdateActiveQuestion(userData?.id || "");
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
  const refetchData = () => {
    refetch()
    refetchTotalData()
  }
  return (
    <div className=" bg-[#FFFAF0] flex flex-col md:ml-64    md:flex-row">
      <div className="w-full md:p-12 p-6 flex flex-col gap-10">
        {/* <h1 className="text-2xl underline font-bold">Dashboard</h1> */}
        <section className=" flex flex-col  gap-10 ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
            <StatCard title="Total Pertanyaan"

              value={isLoading ? 0 : (dataDashboard?.totalQuestion)}

              icon={<Mail />} />
            <StatCard title="Link Overlay" button buttonName={`${copied ? "Berhasil disalin" : "Salin Link"} `} onClick={() => handleCopy()} icon={<Blocks />} />
            <StatCard title="Link QnA" button buttonName={`${copiedQna ? "Berhasil disalin" : "Salin Link"}`} onClick={() => handleCopyQna()} icon={<MailQuestion />} />
          </div>


          <ActiveQuestions
            bgColor={settings?.bgColor}
            textColor={settings?.textColor}
            fontFamily={settings?.fontFamily}
            border={settings?.border}
            name={isLoading ? "Memuat..." : activeQuestion?.sender || "Anomali"}
            question={isLoading ? "Memuat..." : activeQuestion?.question || "Belum Ada Pertanyaan Aktif"}
          />
        </section>
        <section>
          <div className="border-border border-2 p-4 bg-background ">
            <div className="flex flex-row justify-between gap-2">

              <h1 className="text-2xl font-bold text-black">Pertanyaan Baru</h1>
              <Button variant="neutral" className="cursor-pointer" onClick={refetchData}>Segarkan</Button>
            </div>


            {isloadingQuestion ? (
              <p className="text-white mt-4">Memuat pertanyaan...</p>
            ) : questionData && questionData.length > 0 ? (
              questionData.map((item, index) => (
                <Card
                  key={index}
                  variant="neutral"
                  username={item.name || "Belum Ada"}
                  question={item.question || "Belum Ada"}
                  onShow={() =>
                    onShow({
                      questionId: item.id,
                    })
                  }
                  isViewed={item.isViewed || false}
                />
              ))
            ) : (
              <p className="text-white mt-4">Belum ada pertanyaan baru.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
