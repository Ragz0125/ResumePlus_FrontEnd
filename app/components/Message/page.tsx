import { Divider, Grid, Skeleton } from "@mui/material";
import styles from "../Message/Message.module.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailModal from "../Email/emailModal";
import { HILButtons } from "../Button/page";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  content?: string;
  user?: string;
  timestamp?: string;
  loader?: boolean;
  emailOutput?: any;
  hilRequired?: any;
  setOpenEmailModal?: any;
  handleSendEmail?: any;
}

const Message = ({
  content,
  user,
  timestamp,
  loader,
  emailOutput,
  hilRequired,
  setOpenEmailModal,
  handleSendEmail
}: MessageProps) => {
  return (
    <>
      <Grid className={styles.messageContainer}>
        <Grid className={styles.messageHeader}>
          <Grid
            className={styles.userBadge}
            sx={{ backgroundColor: user == "ai" ? "#E5E8FF" : "#ffffff" }}
          >
            {user == "ai" ? (
              <img src="/logo.png" />
            ) : (
              <PersonOutlinedIcon sx={{ color: "#A9A9A9" }} />
            )}
          </Grid>
          <Grid className={styles.senderDetails}>
            <Grid className={styles.senderName}>
              {user === "ai" ? "AI" : "You"}
            </Grid>
            <Grid className={styles.details}>{timestamp}</Grid>
          </Grid>
        </Grid>
        <Grid
          className={styles.messageContent}
          sx={{ backgroundColor: user == "ai" ? "#E5E8FF" : "#ffffff" }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>

          {hilRequired && (
            <Grid className={styles.footer}>
              <HILButtons type="approve" title="Send" onClick={()=> handleSendEmail(true)}/>
              <HILButtons type="reject" title="Reject" onClick={()=> handleSendEmail(false)}/>
              <HILButtons
                type="edit"
                title="Edit"
                onClick={() => setOpenEmailModal(true)}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Message;
