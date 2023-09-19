import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Preahvihear, Space_Grotesk } from "next/font/google";
import classNames from "classnames";
import BackgroundGradient from "../components/background-gradient";
import Card from "../components/card";
import { MouseEvent, useCallback, useRef, useState } from "react";
import client from "../config-client";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | undefined>(undefined);
  const [receiving, setReceiving] = useState(false);
  const web_html = client.appName;


  const start = useCallback(async () => {
    setResult("");
    setReceiving(true);

    const response = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input ? input : client.exampleInput,
      }),
    });

    if (!response.ok) {
      setReceiving(false);
      return;
    }

    const data = response.body;

    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setResult((prev) => prev + chunkValue);
    }

    setReceiving(false);
  }, [input]);

  return ( 
    <body dangerouslySetInnerHTML={{ __html: web_html }}>
    
    </body>
  )
};

export default Home;
