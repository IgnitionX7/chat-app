"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

export const useConversation = () => {
  const params = useParams();

  //useMemo is used to define variables whose value changes only when certain other variables get updated
  const conversationId = useMemo(
    () => params?.conversationId || ("" as string),
    [params?.conversationId],
  );

  const isActive = useMemo(() => !!conversationId, [conversationId]);

  return {
    isActive,
    conversationId,
  };
};
