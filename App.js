import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map, Marker } from "@/components/ui/map";
import { MessageBox } from "@/components/ui/messagebox";
import { Chatbot } from "@/components/ui/chatbot";

const characters = [
  {
    name: "Caitlin - The Perfectionist Chef",
    description:
      "A world-class chef who despises experimental flavors and argued with the victim over a chili & chocolate IPA.",
    clue: "A strange note from the victim about a 'kitchen catastrophe.'",
  },
  {
    name: "Mark - The Forward-Thinking Brewmaster",
    description:
      "A genius in food science and beer innovation. The victim was about to steal Mark's secret beer formula.",
    clue: "The victim’s last text was to YOU: 'I know what you did.'",
  },
  {
    name: "Tim - The Laid-Back Beer Critic",
    description:
      "Runs a beer review blog called 'Tastes Like Ass Hair.' Had a feud with the victim over a bad review.",
    clue: "A half-smoked joint was found near the murder scene.",
  },
  {
    name: "Megan - The Controlling Businesswoman",
    description:
      "CEO of a hospitality empire. The victim stole her brewery business idea years ago.",
    clue: "A missing business contract connects her to the victim.",
  },
  {
    name: "Nick - The Rugby Enthusiast",
    description:
      "Works in sports management but secretly dreams of being a beer sommelier. Banned from the brewery after a fight.",
    clue: "A blood-stained rugby ball was found near the scene.",
  },
  {
    name: "Kirsty - The Rebellious Yachtie",
    description:
      "Prefers cocktails over beer. Had a massive argument with the victim about his anti-Cape Town comments.",
    clue: "A boarding pass to Europe was in the victim’s pocket, with her name on it.",
  },
  {
    name: "Janet - The Mysterious Matriarch",
    description:
      "A former scientist turned migration expert. The victim was blackmailing her about her past in Africa.",
    clue: "The murder weapon smells suspiciously like a chemical compound.",
  },
];

export default function MurderMysteryGame() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [revealClue, setRevealClue] = useState(false);
  const [messages, setMessages] = useState([]);
  const [plotTwists, setPlotTwists] = useState([
    "A new witness emerges with shocking evidence.",
    "A secret letter is found in the victim’s pocket.",
    "The crime scene reveals a hidden message under UV light.",
    "Someone confesses... but are they telling the truth?",
    "The murder weapon is missing from evidence!",
  ]);

  const sendMessage = (message) => {
    setMessages([...messages, message]);
  };

  const revealPlotTwist = () => {
    if (plotTwists.length > 0) {
      const randomTwist = plotTwists[Math.floor(Math.random() * plotTwists.length)];
      setMessages([...messages, { sender: "Game Master", text: randomTwist }]);
      setPlotTwists(plotTwists.filter((twist) => twist !== randomTwist));
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Murder Mystery Night</h1>
      <Map image="/mnt/data/floor_plan.png">
        <Marker location="Living Room" label="Crime Scene" />
        <Marker location="Kitchen" label="Suspicious Clue" />
      </Map>
      {!selectedCharacter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char, index) => (
            <Card key={index} className="cursor-pointer" onClick={() => setSelectedCharacter(char)}>
              <CardContent>
                <h2 className="text-xl font-semibold">{char.name}</h2>
                <p>{char.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold">{selectedCharacter.name}</h2>
              <p>{selectedCharacter.description}</p>
              {revealClue ? (
                <p className="mt-2 font-bold">Clue: {selectedCharacter.clue}</p>
              ) : (
                <Button onClick={() => setRevealClue(true)} className="mt-2">Reveal Clue</Button>
              )}
            </CardContent>
          </Card>
          <Button className="mt-4" onClick={() => setSelectedCharacter(null)}>
            Choose Another Character
          </Button>
        </div>
      )}
      <MessageBox messages={messages} onSendMessage={sendMessage} />
      <Button className="mt-4" onClick={revealPlotTwist}>
        Reveal a Plot Twist
      </Button>
      <Chatbot title="Game Master AI" description="Ask for hints, accuse players, and get plot twists!" />
    </div>
  );
}
