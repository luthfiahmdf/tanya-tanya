"use client";
import { useParams } from "next/navigation";
import { useGetOverlay } from "./hook";
import { OverlayCard } from "@/components/ui/overlay-card";
import { useEffect } from "react";

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
    <OverlayCard
      username={data?.name || "Anomali"}
      variant="neutral"
      question={
        data?.question ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id leo vitae urna commodo aliquam."
      }
    />
  ) : null;
};
