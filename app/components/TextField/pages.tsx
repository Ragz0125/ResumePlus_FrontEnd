"use client";

import { Grid, TextareaAutosize, TextField } from "@mui/material";
import styles from "../TextField/TextField.module.scss";
import { useState } from "react";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const CustomTextField = ({inputMessage, setInputMessage}: any) => {
  const [text, setText] = useState("");
  const jumpLine = text.includes("\n")

  const handleSend = () => {
    setInputMessage((prev:any) => [...prev, {"user": "You", "content": text, "timestamp": new Date().toLocaleTimeString()}]);
    setText("")
  }

  return (
    <>
      <div className={styles.chatInput}>
        <EmojiObjectsOutlinedIcon sx={{color:"#5661F6"}}/>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text || ""}
          placeholder="What's in your mind?..."
          rows={jumpLine ? 10 : 1}/>
        <SendButton handleSend={handleSend}/>
      </div>
    </>
  );
};


const SendButton = ({handleSend}:any) => {
    return (
        <Grid className={styles.sendButton} onClick={handleSend}>
            <SendOutlinedIcon />
        </Grid>
    )
}

export default CustomTextField;
