"use client";
import { useGetQuestion, useGetUserMe, useUpdateActiveQuestion } from "./hook";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetOverlay } from "../overlay/hook";
import { Sidebar } from "@/components/sidebar/sidebar";
import { TUpdateQuestion } from "./api";
import { OverlayCard } from "@/components/ui/overlay-card";

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
          console.log("berhasil Update");
          refetcOverlay();
          setUpdateOverlay("update-overlay", true);
          console.log(questionId);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#FFFAF0] flex flex-col  md:flex-row">
      <Sidebar username={userData?.username || ""} />
      <div className="w-full p-4">
        <section className="mb-8  ">
          <div className="flex gap-2">
            <h2 className="text-xl md:text-2xl font-black mb-4 inline-block bg-[#FFD166] px-4 py-2 border-4 border-black transform -rotate-1">
              Pertanyaan Aktif
            </h2>
            <Button onClick={handleCopy}>
              {copied ? "Berhasil Disalin!" : "Link Overlay"}
            </Button>
            <Button onClick={handleCopyQna}>
              {copiedQna ? "Berhasil Disalin!" : "Link Kirim Pesan"}
            </Button>
          </div>
          <div className="">
            <OverlayCard
              username={
                activeQuestion?.name ? activeQuestion?.name : "Anomalus"
              }
              question={activeQuestion?.question || ""}
              variant="neutral"
              // createAt={distanceDate(activeQuestion?.createAt || "")}
            />
          </div>
        </section>
        <section>
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-xl md:text-2xl font-black mb-4 inline-block bg-[#118AB2] text-white px-4 py-2 border-4 border-black transform rotate-1">
              Pertanyaan Terbaru
            </h2>
            <Button onClick={() => refetch()}>Refresh</Button>
          </div>
          <div className="">
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
                  // size="sm"
                  // createAt={distanceDate(item.createAt)}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};
