import { Grid } from "@mui/material";
import styles from "../Email/Email.module.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext, useState } from "react";
import { HILButtons } from "../Button/page";
import { sendHilResposne } from "@/app/api/apiCalls";
import { AppContext } from "@/app/store/store";

const EmailModal = ({
  setOpenEmailModal,
  emailOutput,
  setInputMessage,
  conversationId,
}: any) => {
  const [subject, setSubject] = useState(emailOutput?.subject);
  const [body, setBody] = useState(emailOutput?.body);
  const { state, setState }: any = useContext(AppContext);
  console.log(state)

  const handleSendEmail = (sendEmail: any) => {
    const payload = sendEmail
      ? {
          conversation_id: state?.conversationId ?? conversationId,
          is_approve: true,
          email_input: {
            body: body,
            subject: subject,
          },
        }
      : {
          conversation_id: "string",
          is_approve: false,
        };
    
    setOpenEmailModal(false)
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
    <Grid
      className={styles.modalBackdrop}
      onClick={(e) => {
        if (e.target == e.currentTarget) setOpenEmailModal(false);
      }}
    >
      <Grid className={styles.modalContainer}>
        <Grid className={styles.title}>
          <EmailOutlinedIcon sx={{ color: "#5661F6" }} />
          Email Editing
        </Grid>
        <Grid className={styles.row}>
          <Grid className={styles.title}>To:</Grid>
          <Grid>raghav.rajaraman@gmail.com</Grid>
        </Grid>
        <Grid className={styles.row}>
          <Grid className={styles.title}>Reply-To:</Grid>
          <Grid>scs.rajaraman@gmail.com</Grid>
        </Grid>
        <Grid className={styles.column}>
          <Grid className={styles.title}>Subject</Grid>
          <input
            value={subject}
            onChange={(e: any) => {
              setSubject(e.target.value);
            }}
          />
        </Grid>
        <Grid className={styles.column}>
          <Grid className={styles.title}>Email Body</Grid>
          <textarea
            value={body}
            onChange={(e: any) => {
              setBody(e.target.value);
            }}
          />
        </Grid>

        <Grid className={styles.footer}>
          <HILButtons
            title="Send"
            type="approve"
            onClick={() => handleSendEmail(true)}
          />
          <HILButtons
            title="Reject"
            type="reject"
            onClick={() => handleSendEmail(false)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmailModal;
