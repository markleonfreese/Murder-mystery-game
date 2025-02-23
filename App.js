import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
];

export default function MurderMysteryGame() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [revealClue, setRevealClue] = useState(false);
  const [messages, setMessages] = useState([]);
  const [gameLog, setGameLog] = useState([]);

  const sendMessage = (message) => {
    setMessages([...messages, { sender: "Player", text: message }]);
  };

  const logGameEvent = (event) => {
    setGameLog([...gameLog, event]);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Murder Mystery Night</h1>
      {!selectedCharacter ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {characters.map((char, index) => (
            <Card key={index} className="cursor-pointer" onClick={() => {setSelectedCharacter(char); logGameEvent(`${char.name} was selected.`);}}>
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
                <Button onClick={() => {setRevealClue(true); logGameEvent(`Clue revealed for ${selectedCharacter.name}.`);}} className="mt-2">Reveal Clue</Button>
              )}
            </CardContent>
          </Card>
          <Button className="mt-4" onClick={() => {setSelectedCharacter(null); logGameEvent(`${selectedCharacter.name} deselected.`);}}>
            Choose Another Character
          </Button>
        </div>
      )}
      <MessageBox messages={messages} onSendMessage={sendMessage} />
      <Chatbot title="Game Master AI" description="Ask for hints, accuse players, and get plot twists!" />
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-lg font-bold">Game Log</h2>
        <ul>
          {gameLog.map((event, index) => (
            <li key={index} className="text-sm">{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
