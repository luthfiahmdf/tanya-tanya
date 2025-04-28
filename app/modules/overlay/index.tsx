"use client";
import { useParams } from "next/navigation";
import { useGetOverlay } from "./hook";
import { useEffect } from "react";
import { ActiveQuestions } from "@/components/ui/active-question";
import { distanceDate } from "@/app/utils/distance-date";

export const Overlay = () => {
  const params = useParams<{ username: string }>();
  const { data, refetch } = useGetOverlay(params.username);
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000); // refetch API tiap 3 detik

    return () => {
      clearInterval(interval);
    };
  }, [refetch]);
  console.log(data);
  return data ? (
    <ActiveQuestions overlay name={data.name} question={data.question} createdAt={distanceDate(data.createdAt)} />
  ) : null;
};
