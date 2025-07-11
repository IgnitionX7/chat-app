"use client";

import ConversationContainer from "@/components/shared/Conversation/ConversationContainer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import { useState } from "react";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";
import DeleteGroupDialog from "./_components/dialogs/DeleteGroupDialog";
import LeaveGroupDialog from "./_components/dialogs/LeaveGroupDialog";

const ConversationPage = () => {
  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = useState(false);
  const [deleteGroupDialogOpen, setDeleteGroupDialogOpen] = useState(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video" | null>(null);

  const params = useParams();
  const conversationId = params.conversationId as Id<"conversations">;

  const conversation = useQuery(api.conversation.get, { id: conversationId });
  return (
    <>
      {conversation === undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="h-8 w-8" />
        </div>
      ) : conversation === null ? (
        <p className="w-full h-full flex items-center justify-center">
          Conversation not found
        </p>
      ) : (
        <ConversationContainer>
          <RemoveFriendDialog
            conversationId={conversationId}
            open={removeFriendDialogOpen}
            setOpen={setRemoveFriendDialogOpen}
          />
          <LeaveGroupDialog
            conversationId={conversationId}
            open={leaveGroupDialogOpen}
            setOpen={setLeaveGroupDialogOpen}
          />
          <DeleteGroupDialog
            conversationId={conversationId}
            open={deleteGroupDialogOpen}
            setOpen={setDeleteGroupDialogOpen}
          />
          <Header
            imageUrl={
              conversation.isGroup
                ? undefined
                : conversation.otherMember?.imageUrl
            }
            name={
              (conversation.isGroup
                ? conversation.name
                : conversation.otherMember?.username) || ""
            }
            options={
              conversation.isGroup
                ? [
                    {
                      label: "Leave group",
                      destructive: false,
                      onClick: () => {
                        setLeaveGroupDialogOpen(true);
                      },
                    },
                    {
                      label: "Delete group",
                      destructive: true,
                      onClick: () => {
                        setDeleteGroupDialogOpen(true);
                      },
                    },
                  ]
                : [
                    {
                      label: "Remove friend",
                      destructive: true,
                      onClick: () => {
                        setRemoveFriendDialogOpen(true);
                      },
                    },
                  ]
            }
            setCallType={setCallType}
          />
          <Body
            members={
              conversation.isGroup
                ? conversation.otherMembers
                  ? conversation.otherMembers
                  : []
                : conversation.otherMember
                  ? [conversation.otherMember]
                  : []
            }
            callType={callType}
            setCallType={setCallType}
          />
          <ChatInput />
        </ConversationContainer>
      )}
    </>
  );
};
export default ConversationPage;
