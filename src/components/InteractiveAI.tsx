import { useState, useEffect, useRef } from "react";
import { Terminal, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceAI from "@/components/voiceai";


interface InteractiveAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveAI = ({ isOpen, onClose }: InteractiveAIProps) => {
  const [activeAI, setActiveAI] = useState<"voice" | "chat" | null>(null);

  if (!isOpen) return null;

  const TerminalAI = () => {
    const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
    const [input, setInput] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);

    const basePrompt = "C:\\Users\\HP>";

    // Initial Windows CMD-like header
    useEffect(() => {
      const initialOutput = `[Microsoft Windows [Version 10.0.19045.6456]]
(c) Microsoft Corporation. All rights reserved.

Type 'help' to list available commands.`;

      setHistory([{ command: "", output: initialOutput }]);
    }, []);

    const handleCommand = (cmd: string) => {
      let output = "";
      switch (cmd.toLowerCase()) {
        case "help":
          output = `Available commands :\n         
ABOUT          About Alan Roy\n
SKILLS         Shows skills\n
PROJECTS       Lists projects\n
CONTACT        Shows contact info\n
CLEAR          Clears the terminal output\n`;
          break;
        case "about":
          output = "Alan Roy:\n Full Stack Developer specializing in\n Django, React, Flutter, and ML.";
          break;
        case "skills":
          output = "Python\n Django\n React\n Flutter\n Machine Learning\n HTML\n CSS\n JavaScript\n Git\n";
          break;
        case "projects":
          output = `1. Convertto \n A Web Applicaion built with python,django,Javascript,HTML,CSS and AI\n which can convert the real handwritting to text formats with a built in text editor\n and which has Restful API for communication of server and client.
          \n2. LogicCraft \n A web Application which was built using python,django,HTML,CSS and AI\n where the users mainly students can download projects for there use\nfrom a pool of projects and can get training from senior developers and team.\n The project was certified, by the company for its UI and for making a real project.
          \n3. CaterCraft \n A responsive mobile application where the users which are catering and event management organization and customers can make business and real time purchases.The application can identify the user license via ML and Deep learning. The Admin can manage the application via the Web page of the Application.
          \n4. Cardio \n A web application which was built using python,django,HTML,CSS bootstrap and ML were the user or patients can book there appointment for a doctor for cardiac based issues and the ML can predict if the patient has a chance of getting a cardiac desease.
          \n5. Sportellette \n A web application made using c# and .net with CSS and bootstrap where the admin can manage real time events or sports activities and the user can register and view events and participate, the goal was to make sure there were no paper works included in events programmes.\n`;
          break;
        case "contact":
          output = "Email: alanroyff101@gmail.com\nLinkedIn: linkedin.com/in/alan-roy-a87887315\nGitHub: github.com/alnroy\n";
          break;
        case "clear":
          setHistory([]);
          return;
        default:
          output = `'${cmd}' is not recognized as an internal or external command,
operable program or batch file.`;
      }
      setHistory((prev) => [...prev, { command: cmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleCommand(input);
        setInput("");
      }
    };

    useEffect(() => {
      terminalRef.current?.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, [history]);

    return (
      <div className="flex items-start text-left flex-col w-full h-full bg-black text-[#39ff14] [text-shadow:0_0_1px_#39ff14,0_0_1px_#39ff14,0_0_2px_#39ff14,0_0_2px_#39ff14] font-mono rounded-lg shadow-lg p-4">
        {/* Terminal history */}
        <div ref={terminalRef} className="flex-1 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          {history.map((entry, idx) => (
            <div key={idx}>
              {entry.command && (
                <div>
                  <span className="text-[#39ff14]  [text-shadow:0_0_1px_#39ff14,0_0_1px_#39ff14,0_0_2px_#39ff14,0_0_2px_#39ff14]">{basePrompt}</span>
                  {entry.command}
                </div>
              )}
              <div>{entry.output}</div>
            </div>
          ))}
        </div>

        {/* Input prompt */}
        <div className="flex mt-2 flex-col items-start">
          <span className="text-[#39ff14]  [text-shadow:0_0_1px_#39ff14,0_0_1px_#39ff14,0_0_2px_#39ff14,0_0_2px_#39ff14] mr-2">{basePrompt}
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-black text-[#39ff14]  [text-shadow:0_0_1px_#39ff14,0_0_1px_#39ff14,0_0_2px_#39ff14,0_0_2px_#39ff14] outline-none font-mono px-2 py-1 rounded"
          />
          </span>
          
          {/* <Button
            onClick={() => {
              handleCommand(input);
              setInput("");
            }}
            className="ml-2 bg-primary hover:bg-primary/90 neon-glow-hover"
          >
            Enter
          </Button> */}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background/90 glass-strong rounded-2xl p-6 max-w-4xl w-full h-[80vh] relative flex flex-col shadow-2xl">
        <button
          onClick={() => {
            onClose();
            setActiveAI(null);
          }}
          className="absolute top-4 right-4 text-foreground hover:text-primary text-2xl font-bold"
        >
          <X className="h-6 w-6" />
        </button>

        {!activeAI ? (
          <>
            <h2 className="text-3xl font-bold text-center text-primary">
              Choose AI Interaction
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <div
                onClick={() => setActiveAI("voice")}
                className="flex-1 flex flex-col items-center bg-white/10 glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
              >
                <Mic className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Voice AI</h3>
              </div>

              <div
                onClick={() => setActiveAI("chat")}
                className="flex-1 flex flex-col items-center bg-white/10 glass rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer"
              >
                <Terminal className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground">Chat AI</h3>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Terminal-style chat interface.
                </p>
              </div>
            </div>
          </>
        ) : activeAI === "voice" ? (
           <VoiceAI onBack={() => setActiveAI(null)} />
          ) : (
          <TerminalAI />
        )}
      </div>
    </div>
  );
};

export default InteractiveAI;
