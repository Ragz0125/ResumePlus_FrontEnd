"use client";

import ChatScreen from "@/app/components/ChatScreen/page";
import Message from "@/app/components/Message/page";
import CustomTextField from "@/app/components/TextField/pages";
import { ChatScreenDefaultMessage } from "@/app/constants";
import { Grid, Skeleton, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import customStyles from "../../pages/home/HomeScreen.module.scss";
import { useRouter } from "next/compat/router";
import { useParams } from "next/navigation";
import { getConversationHistory, getLlmResponse } from "@/app/api/apiCalls";
import { AppContext } from "@/app/store/store";
import EmailModal from "@/app/components/Email/emailModal";

const ChatHistory = () => {
  const params: any = useParams();
  const conversationId = params?.conversationId;
  const { state, setState }: any = useContext(AppContext);
  const [inputMessage, setInputMessage] = useState<any[]>([]);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);

  console.log(conversationId)

  const getConversationHistoryById = () => {
    if (conversationId) {
      getConversationHistory(conversationId)
        .then((response: any) => {
          console.log(response);
          if (response.status == 200) {
            console.log(response?.data?.data);
            setInputMessage(response?.data?.data?.messages);
          }
        })
        .catch((err: any) => console.log(err));
    }
  };

  useEffect(() => {
    getConversationHistoryById();
  }, [conversationId]);

  useEffect(() => {
    if (inputMessage) {
      if (inputMessage[inputMessage?.length - 1]?.role === "You") {
        setTimeout(() => {
          setInputMessage((prev: any) => [
            ...prev,
            {
              role: "ai",
              content: "Hello! How can I assist you today?",
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
        }, 1000);
      }
    }
  }, [inputMessage]);

  useEffect(() => {
    if (inputMessage[inputMessage.length - 1]?.user === "You") {
      let data = {
        query: inputMessage[inputMessage.length - 1]?.content,
        ...(conversationId !== null && { conversation_id: conversationId }),
        ...(state?.isLoggedIn && { user_id: state?.userDetails?.user_id }),
      };
      getLlmResponse(data).then((response: any) => {
        setInputMessage((prev: any) => [
          ...prev,
          {
            role: "ai",
            content: response?.data?.content,
            timestamp: new Date().toLocaleTimeString(),
            hilRequired: response?.data?.hil_required,
            emailOutput: response?.data?.email_output,
          },
        ]);
      });
    }
  }, [inputMessage]);

  const loader = inputMessage[inputMessage.length - 1]?.role !== "ai";

  return (
    <>
      {openEmailModal && (
        <EmailModal
          setOpenEmailModal={setOpenEmailModal}
          emailOutput={inputMessage[inputMessage.length - 1]?.emailOutput}
          setInputMessage={setInputMessage}
          conversationId={conversationId}
        />
      )}
      <Grid className={customStyles.layout}>
        <ChatScreen>
          <Grid className={customStyles.populatedChat}>
            <Grid className={customStyles.chatBox}>
              {inputMessage?.map((message: any, index) => (
                <Message
                  content={message?.content}
                  user={message?.role}
                  timestamp={message?.timestamp}
                  hilRequired={message?.hilRequired}
                  emailOutput={message?.emailOutput}
                  setOpenEmailModal={setOpenEmailModal}
                />
              ))}
              {loader && (
                <Grid className={customStyles.skeletonLoader}>
                  <Skeleton variant="rectangular" width={"90%"} height={60} />
                </Grid>
              )}
            </Grid>
            <CustomTextField setInputMessage={setInputMessage} />
          </Grid>
        </ChatScreen>
      </Grid>
    </>
  );
};

export default ChatHistory;
