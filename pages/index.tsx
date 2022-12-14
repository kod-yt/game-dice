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
  const [initialOccurrenceNoun, initialOccurrenceVerb] = getRandomOccurrence(data, false);
  return {
    props: {
      initialOccurrenceNoun,
      initialOccurrenceVerb,
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
          <div className={styles.footer}>
            <a
              href="https://www.youtube.com/channel/UCPxokqPdoBn5Ivb0C57S4MA"
              target="_blank"
              rel="noopener noreferrer"
            >
              by kevin oh{" "}
            </a>
          </div>
        </h1>
        <div className={styles.spacer} style={{ marginBottom: "32px" }} />

        <button className={styles.button} onClick={() => getNewPermutation()}>
          Generate
        </button>

        <h2>Click to lock an option.</h2>
        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.text}>As the</h3>
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
              <h3 className={styles.text}>,</h3>
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
              <h3 className={styles.text}>.</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
