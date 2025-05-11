export type TOverlaySettings = {
  id?: string
  userId: string
  border: boolean
  textColor: string
  bgColor: string
  fontFamily: string
}

export type TUpdateOverlaySettings = Omit<TOverlaySettings, "id" | "userId">;
