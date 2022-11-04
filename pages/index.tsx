import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import TextOption from "./text-option";
import styles from "../styles/Home.module.css";
import data, { Data } from "../possibilities";
import { FiLock } from "react-icons/fi";

const randomElement = (array: any) => array[Math.floor(Math.random() * array.length)];

const getRandomOccurrence = (
  data: Data,
  nounIsLocked: boolean = false,
  currentNoun: any = null
) => {
  // If the noun is locked and the current noun is valid,
  // then use that instead of generating a new one
  const randomOccurrenceKey =
    nounIsLocked && !!currentNoun ? currentNoun : randomElement(Object.keys(data.occurrences));
  let randomOccurrenceVerb = randomElement(data.occurrences[randomOccurrenceKey]);
  return [randomOccurrenceKey, randomOccurrenceVerb];
};

const getRandomNoun = (data: Data) => {
  return randomElement(data.nouns);
};

const getRandomVerb = (data: Data) => {
  return randomElement(data.verbs);
};

export async function getStaticProps() {
  return {
    props: {
      initialOccurrenceNoun: getRandomOccurrence(data, false)[0],
      initialOccurrenceVerb: getRandomOccurrence(data, false)[1],
      initialNoun: getRandomNoun(data),
      initialVerb: getRandomVerb(data),
    },
  };
}

const isLocked = (lockedObj: object, key: string): boolean => {
  return Object.keys(lockedObj).includes(key);
};

export default function Home({
  initialOccurrenceNoun,
  initialOccurrenceVerb,
  initialNoun,
  initialVerb,
}: any) {
  const [randomOccurrenceNoun, setRandomOccurrenceNoun] = useState(initialOccurrenceNoun);
  const [randomOccurrenceVerb, setRandomOccurrenceVerb] = useState(initialOccurrenceVerb);
  const [randomNoun, setRandomNoun] = useState(initialNoun);
  const [randomVerb, setRandomVerb] = useState(initialVerb);

  const [locked, setLocked] = useState({});

  const getNewPermutation = () => {
    const toLock = Object.keys(locked);

    const [occurrenceNoun, occurrenceVerb]: string[] = getRandomOccurrence(
      data,
      toLock.includes("occurrenceNoun"),
      randomOccurrenceNoun
    );
    const keyToUpdateFn: any = {
      occurrenceNoun: () => setRandomOccurrenceNoun(occurrenceNoun),
      occurrenceVerb: () => setRandomOccurrenceVerb(occurrenceVerb),
      noun: () => setRandomNoun(getRandomNoun(data)),
      verb: () => setRandomVerb(getRandomVerb(data)),
    };

    ["occurrenceNoun", "occurrenceVerb", "noun", "verb"]
      .filter((key) => !toLock.includes(key))
      .map((key) => keyToUpdateFn[key])
      .forEach((fn) => fn());
  };

  const toggleLock = (key: string) => {
    console.log("hit");

    const newLocked: any = { ...locked };

    if (Object.keys(locked).includes(key)) {
      // unlock
      delete newLocked[key];
    } else {
      // lock
      if (key === "occurrenceVerb") {
        newLocked["occurrenceNoun"] = true;
        newLocked["occurrenceVerb"] = true;
      } else {
        newLocked[key] = true;
      }
    }

    setLocked(newLocked);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Game Mechanics Generator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Game Mechanics Generator <small></small>
        </h1>

        <div style={{ marginBottom: "100px" }} />

        <div className={styles.grid}>
          {JSON.stringify(locked, null, 2)}
          <div className={styles.card}>
            <h2 className={styles.text}>As the</h2>
          </div>
          <div className={styles.card}>
            <TextOption
              text={randomOccurrenceNoun}
              clickFn={() => toggleLock("occurrenceNoun")}
              locked={isLocked(locked, "occurrenceNoun")}
            />
            <TextOption
              text={randomOccurrenceVerb}
              clickFn={() => toggleLock("occurrenceVerb")}
              locked={isLocked(locked, "occurrenceVerb")}
            />
            <h2 className={styles.text}>,</h2>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <TextOption
              text={randomNoun}
              clickFn={() => toggleLock("noun")}
              locked={isLocked(locked, "noun")}
            />
            <TextOption
              text={randomVerb}
              clickFn={() => toggleLock("verb")}
              locked={isLocked(locked, "verb")}
            />
            <h2 className={styles.text}>.</h2>
          </div>
        </div>

        <div style={{ marginBottom: "40px" }} />

        <button className={styles.button} onClick={() => getNewPermutation()}>
          Throw the dice!
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.youtube.com/channel/UCPxokqPdoBn5Ivb0C57S4MA"
          target="_blank"
          rel="noopener noreferrer"
        >
          by{" "}
          <span className={styles.logo}>
            kevin oh
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
    </div>
  );
}
