"use client";
import {
  useGetDashboardData,
  useGetUserMe,
  useUpdateActiveQuestion,
  useRealTimeQuestions,
  useGetQuestion,
} from "./hook";

import { useState, useCallback, useEffect, useRef } from "react";
import { useGetOverlay } from "../overlay/hook";
import { TUpdateQuestion } from "./api";
import {
  Blocks,
  Mail,
  MailQuestion,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { QuestionCard } from "@/components/ui/question-card";
import { ErrorBoundary } from "@/components/error-boundary";
import { getErrorMessage } from "@/lib/axios";
import { RealTimeNotification } from "@/components/ui/real-time-notification";
import { useSidebarStore } from "@/app/provider/sidebar-store-provider";
import { ThemeSelector } from "@/components/ui/theme-selector";

export const ModuleDashboard = () => {
  const { data: userData, error: userError } = useGetUserMe();
  const [copied, setCopied] = useState(false);
  const [copiedQna, setCopiedQna] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const [realtimeQuestions, setRealtimeQuestions] = useState<
    Array<{
      id: string;
      name: string;
      question: string;
      isViewed: boolean | null;
      createAt?: string;
    }>
  >([]);
  const wsRef = useRef<WebSocket | null>(null);
  const { sidebarCollapsed } = useSidebarStore((state) => state);

  useRealTimeQuestions(userData?.id, userData?.username);

  const {
    data: dataDashboard,
    isLoading,
    error: dashboardError,
    refetch: refetchTotalData,
  } = useGetDashboardData(userData?.id || "");

  const { data: apiQuestions, refetch: refetchQuestions } = useGetQuestion(
    userData?.username || "",
  );

  useEffect(() => {
    if (
      apiQuestions &&
      apiQuestions.length > 0 &&
      realtimeQuestions.length === 0
    ) {
      setRealtimeQuestions(apiQuestions);
    }
  }, [apiQuestions, realtimeQuestions.length]);

  const finalQuestionData =
    realtimeQuestions.length > 0 ? realtimeQuestions : apiQuestions || [];

  const {
    data: activeQuestion,
    // error: overlayError,
    refetch: refetcOverlay,
  } = useGetOverlay(userData?.id || "");

  const { mutate } = useUpdateActiveQuestion(userData?.id || "");
  const setUpdateOverlay = (key: string, value: boolean) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleCopy = useCallback(async () => {
    try {
      setCopyError(null);
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}overlay/${userData?.id}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopyError("Gagal menyalin link. Silakan coba lagi.");
      console.error("Copy failed:", error);
    }
  }, [userData?.id]);

  const handleCopyQna = useCallback(async () => {
    try {
      setCopyError(null);
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_URL}tanyain/${userData?.username}`,
      );
      setCopiedQna(true);
      setTimeout(() => setCopiedQna(false), 2000);
    } catch (error) {
      setCopyError("Gagal menyalin link. Silakan coba lagi.");
      console.error("Copy failed:", error);
    }
  }, [userData?.username]);

  const onShow = useCallback(
    (questionId: TUpdateQuestion) => {
      mutate(questionId, {
        onSuccess: () => {
          refetchQuestions();
          refetcOverlay();
          setUpdateOverlay("update-overlay", true);
        },
        onError: (error) => {
          console.error("Failed to show question:", getErrorMessage(error));
        },
      });
    },
    [mutate, refetcOverlay, refetchQuestions],
  );

  const refetchData = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([refetchTotalData(), refetchQuestions()]);
    } catch (error) {
      console.error("Failed to refresh data:", getErrorMessage(error));
    } finally {
      setRefreshing(false);
    }
  }, [refetchTotalData, refetchQuestions]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  useEffect(() => {
    if (!userData?.id && !userData?.username) return;

    const setupWebSocket = () => {
      try {
        const identifier = userData?.username || userData?.id;
        const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/status/${identifier}`;
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          setWsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "new_question") {
              if (data.data)
                setRealtimeQuestions((prev) => [data.data, ...prev]);
              if (
                "Notification" in window &&
                Notification.permission === "granted"
              ) {
                new Notification("Pertanyaan Baru!", {
                  body: `Dari: ${data.data?.name || "Anonymous"}\n${data.data?.question}`,
                  icon: "/logo-tanyain.webp",
                  silent: true,
                });
              }
              refetchTotalData();
            }
            if (data.type === "question_update") {
              if (data.data?.id) {
                setRealtimeQuestions((prev) =>
                  prev.map((q) =>
                    q.id === data.data.id ? { ...q, ...data.data } : q,
                  ),
                );
              }
              refetcOverlay();
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        wsRef.current.onerror = () => setWsConnected(false);
        wsRef.current.onclose = () => setWsConnected(false);
      } catch (err) {
        console.error("WebSocket setup failed:", err);
        setWsConnected(false);
      }
    };

    setupWebSocket();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [userData?.id, userData?.username, refetchTotalData, refetcOverlay]);

  // Error state
  if (userError) {
    return (
      <div
        className={`bg-background min-h-screen flex flex-col transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="bg-secondary-background border-2 border-border p-10 shadow-[6px_6px_0px_var(--border)] text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-foreground mx-auto mb-4" />
            <h2 className="text-xl font-black text-foreground mb-2 uppercase">
              Gagal Memuat Data
            </h2>
            <p className="text-foreground/60 mb-6 font-medium text-sm">
              {getErrorMessage(userError)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-foreground text-secondary-background px-6 py-3 border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <RealTimeNotification userId={userData?.id} />

      <div
        className={`bg-background min-h-screen flex flex-col transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <div className="w-full md:p-8 p-4 flex flex-col gap-6">
          {/* Page header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tight">
                Dashboard
              </h1>
              <p className="text-foreground/60 font-medium text-sm mt-1">
                Halo, {userData?.username || "..."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-2 border-2 border-border font-bold text-xs uppercase ${wsConnected ? "bg-secondary-background text-foreground" : "bg-foreground text-secondary-background"}`}
              >
                <div
                  className={`w-2 h-2 ${wsConnected ? "bg-foreground" : "bg-secondary-background"} ${wsConnected ? "animate-pulse" : ""}`}
                />
                {wsConnected ? "Live" : "Offline"}
              </div>
              <button
                onClick={refetchData}
                disabled={refreshing}
                className="bg-foreground text-secondary-background px-4 py-2 border-2 border-border font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "..." : "Refresh"}
              </button>
              <ThemeSelector />
            </div>
          </div>

          {/* Error / offline banners */}
          {copyError && (
            <div className="bg-secondary-background border-2 border-border p-4 shadow-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-foreground" />
                  <span className="text-foreground font-bold text-sm">
                    {copyError}
                  </span>
                </div>
                <button
                  onClick={() => setCopyError(null)}
                  className="text-foreground font-black hover:opacity-60"
                >
                  X
                </button>
              </div>
            </div>
          )}

          {!wsConnected && (
            <div className="bg-secondary-background border-2 border-border p-4 shadow-shadow">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-foreground" />
                <span className="text-foreground font-bold text-sm">
                  Koneksi terputus - mencoba menghubungkan kembali...
                </span>
              </div>
            </div>
          )}

          {/* Stats + Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ErrorBoundary
              fallback={
                <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow">
                  <p className="text-foreground font-bold text-sm">
                    Gagal memuat stats
                  </p>
                </div>
              }
            >
              {/* Total Questions */}
              <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-foreground border-2 border-border">
                    <Mail className="h-5 w-5 text-secondary-background" />
                  </div>
                  <p className="text-4xl font-black text-foreground">
                    {dashboardError || isLoading
                      ? "..."
                      : dataDashboard?.totalQuestion || 0}
                  </p>
                </div>
                <h3 className="text-foreground/60 font-bold text-xs mt-4 uppercase">
                  Total Pertanyaan
                </h3>
              </div>
            </ErrorBoundary>

            {/* Overlay Link */}
            <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-foreground border-2 border-border">
                  <Blocks className="h-5 w-5 text-secondary-background" />
                </div>
                <span className="text-xs text-foreground/60 font-bold uppercase border-2 border-border px-2 py-1">
                  OBS
                </span>
              </div>
              <h3 className="text-foreground/60 font-bold text-xs uppercase mb-4">
                Overlay Link
              </h3>
              <button
                onClick={handleCopy}
                className="w-full bg-foreground text-secondary-background py-2.5 px-4 border-2 border-border font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Tersalin!" : "Salin Link"}
              </button>
            </div>

            {/* QnA Link */}
            <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-foreground border-2 border-border">
                  <MailQuestion className="h-5 w-5 text-secondary-background" />
                </div>
                <span className="text-xs text-foreground/60 font-bold uppercase border-2 border-border px-2 py-1">
                  Share
                </span>
              </div>
              <h3 className="text-foreground/60 font-bold text-xs uppercase mb-4">
                QnA Link
              </h3>
              <button
                onClick={handleCopyQna}
                className="w-full bg-foreground text-secondary-background py-2.5 px-4 border-2 border-border font-bold text-xs uppercase shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {copiedQna ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copiedQna ? "Tersalin!" : "Salin Link"}
              </button>
            </div>
          </div>

          {/* Questions */}
          <ErrorBoundary
            fallback={
              <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow text-center">
                <AlertCircle className="h-8 w-8 text-foreground mx-auto mb-3" />
                <p className="text-foreground font-bold mb-4 text-sm">
                  Gagal memuat pertanyaan
                </p>
                <button
                  onClick={refetchData}
                  className="bg-foreground text-secondary-background px-6 py-3 border-2 border-border font-bold text-sm uppercase shadow-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                >
                  Coba Lagi
                </button>
              </div>
            }
          >
            <div className="bg-secondary-background border-2 border-border shadow-shadow">
              {/* Section header */}
              <div className="p-4 border-b-2 border-border flex items-center gap-3">
                <MailQuestion className="h-5 w-5 text-foreground" />
                <h2 className="text-sm font-black text-foreground uppercase">
                  Pertanyaan
                </h2>
                <span className="bg-foreground text-secondary-background px-2.5 py-0.5 text-xs font-bold border-2 border-border">
                  {finalQuestionData.length}
                </span>
              </div>

              <div className="p-6">
                {finalQuestionData && finalQuestionData.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {finalQuestionData
                        .slice(
                          (currentPage - 1) * ITEMS_PER_PAGE,
                          currentPage * ITEMS_PER_PAGE,
                        )
                        .map(
                          (
                            item: {
                              id: string;
                              name: string;
                              question: string;
                              isViewed: boolean | null;
                            },
                            index: number,
                          ) => (
                            <QuestionCard
                              key={item.id || index}
                              index={(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                              name={item.name}
                              question={item.question}
                              isViewed={item.isViewed}
                              isActive={
                                activeQuestion?.question === item.question &&
                                activeQuestion?.sender === (item.name || "Anonymous")
                              }
                              onShow={() => onShow({ questionId: item.id })}
                            />
                          ),
                        )}
                    </div>

                    {/* Pagination */}
                    {finalQuestionData.length > ITEMS_PER_PAGE && (
                      <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-border">
                        <p className="text-xs font-bold text-foreground/60 uppercase">
                          {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                          {Math.min(
                            currentPage * ITEMS_PER_PAGE,
                            finalQuestionData.length,
                          )}{" "}
                          dari {finalQuestionData.length}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            disabled={currentPage === 1}
                            className="p-2 border-2 border-border bg-secondary-background text-foreground font-bold shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0px_var(--border)]"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          {Array.from(
                            {
                              length: Math.ceil(
                                finalQuestionData.length / ITEMS_PER_PAGE,
                              ),
                            },
                            (_, i) => i + 1,
                          ).map((page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-9 h-9 border-2 border-border font-black text-xs transition-all ${
                                currentPage === page
                                  ? "bg-foreground text-secondary-background shadow-none"
                                  : "bg-secondary-background text-foreground shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() =>
                              setCurrentPage((p) =>
                                Math.min(
                                  Math.ceil(
                                    finalQuestionData.length / ITEMS_PER_PAGE,
                                  ),
                                  p + 1,
                                ),
                              )
                            }
                            disabled={
                              currentPage ===
                              Math.ceil(
                                finalQuestionData.length / ITEMS_PER_PAGE,
                              )
                            }
                            className="p-2 border-2 border-border bg-secondary-background text-foreground font-bold shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[2px_2px_0px_var(--border)]"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-16 bg-background border-2 border-dashed border-border">
                    <MailQuestion className="h-10 w-10 text-foreground/40 mx-auto mb-4" />
                    <h3 className="text-base font-black text-foreground mb-1 uppercase">
                      Belum Ada Pertanyaan
                    </h3>
                    <p className="text-foreground/50 text-sm font-medium">
                      Pertanyaan akan muncul di sini secara real-time
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
