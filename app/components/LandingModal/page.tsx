"use client";

import { Grid } from "@mui/material";
import modalStyles from "../Email/Email.module.scss";
import styles from "../LandingModal/LandingModal.module.scss";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useContext } from "react";
import { AppContext } from "@/app/store/store";

const cardContent = [
  {
    title: "Get to know me better",
    description:
      "Ask any questions about my experience, skills, projects, education or anything else.",
    icon: (
      <PersonOutlineOutlinedIcon sx={{ color: "#5661F6" }} fontSize="large" />
    ),
  },
  {
    title: "AI-Powered Answers",
    description:
      "I'll provide accurate and relevant answers based on my resume and background.",
    icon: (
      <AutoAwesomeOutlinedIcon sx={{ color: "#5661F6" }} fontSize="large" />
    ),
  },
];

const questions = [
  "What is your experience?",
  "What are your key skills?",
  "Tell me about your projects.",
];

const LandingModal = () => {
  const { state, setState }: any = useContext(AppContext);
  return (
    <Grid className={modalStyles.modalBackdrop}>
      <Grid className={styles.modalContainer}>
        <Grid
          className={styles.closeButton}
          onClick={() => setState({ ...state, openModal: false })}
        >
          <CloseOutlinedIcon sx={{ color: "gray" }}/>
        </Grid>
        <Grid className={styles.left}>
          <Grid className={styles.title}>
            Welcome to <Grid className={styles.colorText}>ResuMe</Grid> !
          </Grid>
          <Grid className={styles.description}>
            This is my{" "}
            <Grid className={styles.colorText}>personal portfolio</Grid> powered
            by AI
          </Grid>
          {cardContent.map((card: any, index) => (
            <Card
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
          <Grid className={styles.breakLine} />
          <Grid className={styles.exampleQuestions}>
            Try asking questions like:
          </Grid>
          <Grid className={styles.tileContainer}>
            {questions.map((q: any, index: any) => (
              <QuestionTile content={q} />
            ))}
          </Grid>
        </Grid>
        <Grid className={styles.right}>
          <img src="/heroImage.png" width={"60%"} />
          <Grid className={styles.introCard}>
            <Grid className={styles.title}>Raghav Rajaraman</Grid>
            <Grid className={styles.skills}>
              Frontend Developer | GenAI Enthusiast
            </Grid>
          </Grid>
          <Grid className={styles.button} onClick={() => setState({...state, openModal: false})}>Got it, let's start!</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Card = ({ title, description, icon }: any) => {
  return (
    <Grid className={styles.cardContainer}>
      <Grid className={styles.icon}>{icon}</Grid>
      <Grid className={styles.content}>
        <Grid className={styles.title}>{title}</Grid>
        <Grid className={styles.description}>{description}</Grid>
      </Grid>
    </Grid>
  );
};

const QuestionTile = ({ content }: any) => {
  return <Grid className={styles.tile}>{content}</Grid>;
};

export default LandingModal;
