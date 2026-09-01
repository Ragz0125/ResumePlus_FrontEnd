import { Grid, Typography } from "@mui/material";
import styles from "../home/HomeScreen.module.scss";
import ChatScreen from "@/app/components/ChatScreen/page";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { features } from "@/app/constants";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const HomeScreen = () => {
  const featureIcons = {
    "Candidate Intelligence": (
      <PersonOutlineOutlinedIcon sx={{ color: "#5661F6" }} />
    ),
    "AI Resume Assistant": (
      <EmojiObjectsOutlinedIcon sx={{color:"#5661F6"}}/>
    ),
    "Email Candidate": <EmailOutlinedIcon sx={{ color: "#5661F6" }} />,
  };
  return (
    <Grid className={styles.layout}>
      <Typography variant="h4" className={styles.textDefault}>
        Because Great Hiring Starts with Great Questions.
      </Typography>

      <Grid className={styles.featureContainer}>
        {features.map((feature: any, index: number) => (
          <Grid className={styles.featureBox} key={index}>
            <Grid className={styles.row}>
              <Grid>{featureIcons[feature?.title]}</Grid>
              <Typography className={styles.title}>{feature?.title}</Typography>
            </Grid>
            <Typography className={styles.description}>
              {feature?.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default HomeScreen;
