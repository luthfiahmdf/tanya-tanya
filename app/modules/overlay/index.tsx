"use client";
import { useParams } from "next/navigation";
import { useGetOverlay } from "./hook";
import { OverlayCard } from "@/components/ui/overlay-card";
import { useEffect } from "react";
import { distanceDate } from "@/app/utils/distance-date";

export const Overlay = () => {
  const params = useParams<{ username: string }>();
  const { data, refetch } = useGetOverlay(params.username);
  useEffect(() => {
    // Menambahkan event listener untuk mendeteksi perubahan pada localStorage
    const handleStorageChange = () => {
      const isUpdateOverlayTrue =
        localStorage.getItem("update-overlay") === "true";
      if (isUpdateOverlayTrue) {
        refetch(); // Melakukan refetch saat update-overlay bernilai true
        localStorage.setItem("update-overlay", "false"); // Reset key setelah refetch
      }
    };

    // Menambahkan event listener ketika localStorage berubah
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener ketika komponen tidak digunakan lagi
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refetch]);
  console.log(data);
  return (
    <OverlayCard
      username={data?.name ? data?.name : "Anomali"}
      variant="neutral"
      createAt={distanceDate(data?.createdAt || "")}
      question={
        data?.question
          ? data?.question
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id leo vitae urna commodo aliquam."
      }
    />
  );
};
