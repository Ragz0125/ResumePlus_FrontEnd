"use client";

import { Grid, Skeleton, Typography } from "@mui/material";
import customStyles from "../pages/home/HomeScreen.module.scss";
import ChatScreen from "../components/ChatScreen/page";
import { ChatScreenDefaultMessage } from "../constants";
import TextField from "../components/TextField/pages";
import CustomTextField from "../components/TextField/pages";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "../components/Message/page";
import { getLlmResponse, sendHilResposne } from "../api/apiCalls";
import EmailModal from "../components/Email/emailModal";
import { AppContext } from "../store/store";
import CustomModal from "../components/CustomModal";

const Chat = () => {
  const { state, setState }: any = useContext(AppContext);
  const [inputMessage, setInputMessage] = useState<any>([]);
  const [conversationId, setConversationId] = useState(null);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (inputMessage[inputMessage.length - 1]?.user === "You") {
      let data = {
        query: inputMessage[inputMessage.length - 1]?.content,
        ...(conversationId !== null && { conversation_id: conversationId }),
        ...(state?.isLoggedIn && { user_id: state?.userDetails?.user_id }),
      };
      getLlmResponse(data).then((response: any) => {
        if (!conversationId) {
          setState({
            ...state,
            conversationId: response?.data?.conversation_id,
          });
          setConversationId(response?.data?.conversation_id);
        }
        setInputMessage((prev: any) => [
          ...prev,
          {
            user: "ai",
            content: response?.data?.content,
            timestamp: new Date().toLocaleTimeString(),
            hilRequired: response?.data?.hil_required,
            emailOutput: response?.data?.email_output,
          },
        ]);
      });
    }
  }, [inputMessage]);

  const loader = inputMessage[inputMessage.length - 1]?.user !== "ai";

  const handleSendEmail = (sendEmail: any) => {
    if (!state?.isLoggeIn) {
      setOpenModal(true);
      return;
    }
    const payload = sendEmail
      ? {
          conversation_id: state?.conversationId ?? conversationId,
          is_approve: true,
          email_input: {
            body: inputMessage[inputMessage.length - 1]?.emailOutput?.body,
            subject:
              inputMessage[inputMessage.length - 1]?.emailOutput?.subject,
          },
        }
      : {
          conversation_id: "string",
          is_approve: false,
        };

    setOpenEmailModal(false);
    sendHilResposne(payload).then((response: any) => {
      if (response.status == 200) {
        setInputMessage((prev: any) => [
          ...prev,
          {
            user: "you",
            content: sendEmail ? "Yes, please send" : "Do not send the email",
          },
        ]);
        setInputMessage((prev: any) => [
          ...prev,
          {
            user: "ai",
            content: response?.data?.data,
          },
        ]);
      }
    });
  };

  return (
    <>
      <CustomModal
        open={openModal}
        message={"Please log in to send/reject/edit e-mails"}
        handleSubmit={() => {
          setOpenModal(false);
        }}
        btnTitle={"Close"}
      />
      {openEmailModal && (
        <EmailModal
          setOpenEmailModal={setOpenEmailModal}
          emailOutput={inputMessage[inputMessage.length - 1]?.emailOutput}
          setInputMessage={setInputMessage}
          setOpenModal={setOpenModal}
        />
      )}
      <Grid className={customStyles.layout}>
        <ChatScreen>
          {inputMessage?.length < 1 ? (
            <>
              <Typography className={customStyles.textDefault}>
                {ChatScreenDefaultMessage}
              </Typography>
              <Grid size={{md: 7}}>
                <CustomTextField setInputMessage={setInputMessage} />
              </Grid>
            </>
          ) : (
            <Grid className={customStyles.populatedChat}>
              <Grid className={customStyles.chatBox}>
                {inputMessage.map((message: any, index: any) => (
                  <Message
                    content={message?.content}
                    user={message?.user}
                    timestamp={message?.timestamp}
                    hilRequired={message?.hilRequired}
                    emailOutput={message?.emailOutput}
                    setOpenEmailModal={setOpenEmailModal}
                    handleSendEmail={handleSendEmail}
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
          )}
        </ChatScreen>
      </Grid>
    </>
  );
};

export default Chat;
