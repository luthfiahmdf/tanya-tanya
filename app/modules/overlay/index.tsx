"use client";
import { useParams } from "next/navigation";
import { useGetOverlay } from "./hook";
import { OverlayCard } from "@/components/ui/overlay-card";
import { useEffect } from "react";

export const Overlay = () => {
  const params = useParams<{ username: string }>();
  const { data, refetch } = useGetOverlay(params.username);
  useEffect(() => {
    const handleStorageChange = () => {
      const isUpdateOverlayTrue =
        localStorage.getItem("update-overlay") === "true";
      if (isUpdateOverlayTrue) {
        refetch();
        localStorage.setItem("update-overlay", "false");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
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
  ) : (
    <OverlayCard
      username="Anomali"
      variant="neutral"
      question={
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id leo vitae urna commodo aliquam."
      }
    />
  );
};
