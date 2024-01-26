"use client";

import Image from "next/image";
import { useParams } from 'next/navigation'
import { useMemo, useState } from "react";

import data from "../../public/data/word-list.json";
import { Word } from "../Word";
import styles from "./page.module.css";

function playAudioList(audioList: string[], callback?: () => void) {
  const audio = new Audio(audioList[0]);

  audio.addEventListener("ended", () => {
    if (audioList.length > 1) {
      playAudioList(audioList.slice(1), callback);
    } else {
      callback?.();
    }
  });

  audio.play();
}

export default function Home() {
  const params = useParams()
  const words: Word[] = data;
  const word = words.find((word) => word.word === params.word);
  const [showExample, setShowExample ] = useState<boolean>(true);

  const handleKeydown = useMemo(() => {
    return () => {
      if (!word) {
        return;
      }

      setShowExample(true);

      const wordName = word.word;

      playAudioList([
        `/media/${wordName}/example_en.wav`,
        `/media/${wordName}/example_en.wav`
      ], () => {
        setShowExample(false);

        playAudioList([
          `/media/${wordName}/word.wav`,
          `/media/${wordName}/meaning_en.wav`,
          `/media/${wordName}/meaning_cn.wav`,
        ]);
      });
    }
  }, [word]);

  if (!word) {
    return null;
  }

  return (
    <main
      className={styles.main}
      onKeyDown={handleKeydown}
      tabIndex={0}
    >
      <h1 className={styles.wordName}>{word.word}</h1>

      <h3>/{word.pronouciation}/</h3>

      <Image
        alt={word.word}
        src={`/media/${word.word}/image.png`}
        height={300}
        width={300}
      />

      {
        showExample
          ? <div>
              <p dangerouslySetInnerHTML={{ __html: word.example_en }}></p>
              <p dangerouslySetInnerHTML={{ __html: word.example_cn }}></p>
            </div>
          : <div className={styles.wordMeaning}>
              <p dangerouslySetInnerHTML={{ __html: word.meaning_en }}></p>
              <p dangerouslySetInnerHTML={{ __html: word.meaning_cn }}></p>
            </div>
      }
    </main>
  );
}
