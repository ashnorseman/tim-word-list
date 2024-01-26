import data from "../public/data/word-list.json";
import { Word } from "./Word";
import styles from "./page.module.css";

export default async function Home() {
  const words: Word[] = data;

  return (
    <main className={styles.main}>
      {
        words.map((word) => (
          <div key={word.word}><a href={word.word}>{word.word}</a></div>
        ))
      }
    </main>
  );
}
