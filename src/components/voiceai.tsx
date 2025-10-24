import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useNavigate } from "react-router-dom"; // Corrected import
import { Button } from "@/components/ui/button";
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';



// Siri-style Wave Layer Component
const WaveLayer = ({
  radius,
  color,
  speed,
  amplitude,
  frequency,
  offset
}: {
  radius: number;
  color: string;
  speed: number;
  amplitude: number;
  frequency: number;
  offset: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.SphereGeometry>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  useEffect(() => {
    if (geometryRef.current) {
      initialPositions.current = new Float32Array(geometryRef.current.attributes.position.array);
    }
  }, [radius]);

  useFrame((state) => {
    if (geometryRef.current && initialPositions.current) {
      const time = state.clock.elapsedTime * speed + offset;
      const positionAttribute = geometryRef.current.attributes.position;
      const vertex = new THREE.Vector3();
      const initialVertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        initialVertex.set(
          initialPositions.current[i * 3],
          initialPositions.current[i * 3 + 1],
          initialPositions.current[i * 3 + 2]
        );

        const normal = initialVertex.clone().normalize();
        const initialDistance = initialVertex.length();

        const wave = Math.sin(normal.x * frequency + time) *
                     Math.cos(normal.y * frequency * 0.7 + time * 0.7) *
                     Math.sin(normal.z * frequency * 0.5 + time * 0.5);

        vertex.copy(normal).multiplyScalar(Math.max(initialDistance + wave * amplitude, radius * 0.5));

        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      positionAttribute.needsUpdate = true;
      geometryRef.current.computeVertexNormals();
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry ref={geometryRef} args={[radius, 64, 64]} />
      <meshPhongMaterial
        color={color}
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        shininess={50}
        emissive={new THREE.Color(color).multiplyScalar(0.7)}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

// Main Orb Component
const Orb = ({ listening, speaking }: { listening: boolean; speaking: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);

  const idleColors = ['#00D4FF', '#0099FF', '#0066FF'];
  const activeColors = ['#FF00FF', '#9370DB', '#00FF88', '#FFD700', '#FF006E'];

  const isActive = listening || speaking;
  const colors = isActive ? activeColors : idleColors;

  const baseAmplitude = isActive ? 0.06 : 0.015;
  const baseSpeed = isActive ? 1.5 : 0.4;
  const layerCount = isActive ? 5 : 3;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      if (isActive) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.04;
        groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={colors[0]} transparent opacity={0.6} />
      </mesh>

      {Array.from({ length: layerCount }).map((_, i) => (
        <WaveLayer
          key={i}
          radius={1.0 + i * 0.1}
          color={colors[i % colors.length]}
          speed={baseSpeed * (1 + i * 0.2)}
          amplitude={baseAmplitude * (1 + i * 0.5)}
          frequency={2 + i * 0.5}
          offset={i * Math.PI * 0.5}
        />
      ))}

      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color={colors[0]}
          transparent
          opacity={isActive ? 0.08 : 0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

interface VoiceAIProps {
  onBack?: () => void;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [floating, setFloating] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const navigate = useNavigate();

  // Initialize speech synthesis
  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    // Load voices
    const loadVoices = () => {
      if (synthRef.current) {
        synthRef.current.getVoices();
      }
    };
    
    loadVoices();
    if (synthRef.current) {
      synthRef.current.addEventListener('voiceschanged', loadVoices);
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  const getMaleVoice = useCallback(() => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();
    return voices.find(
      (v) =>
        v.name.includes('Male') ||
        v.name.includes('David') ||
        v.name.includes('Mark') ||
        v.name.includes('Google US English') ||
        (v.lang === 'en-US' && !v.name.includes('Female'))
    ) || null;
  }, []);

  const speak = useCallback((text: string, onSpeechEnd?: () => void) => {
    if (!synthRef.current) {
      console.warn("SpeechSynthesis not available.");
      onSpeechEnd?.();
      return;
    }

    try {
      // Cancel any existing speech
      synthRef.current.cancel();
    } catch (e) {
      // Silently ignore cancel errors
    }

    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);

    const voice = getMaleVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = 1.0;
    utterance.pitch = 0.8;
    utterance.volume = 1.0;

    utterance.onend = () => {
      setSpeaking(false);
      onSpeechEnd?.();
    };

    utterance.onerror = (event: any) => {
      // Safely handle error event - avoid logging entire event object
      const errorType = event?.error || 'unknown';
      console.error('Speech synthesis error:', errorType);
      setSpeaking(false);
      onSpeechEnd?.();
    };

    try {
      synthRef.current.speak(utterance);
    } catch (e) {
      console.error('Failed to speak:', e);
      setSpeaking(false);
      onSpeechEnd?.();
    }
  }, [getMaleVoice]);

  const startSpeechRecognition = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      setIsActive(false);
      return;
    }

    if (recognitionRef.current) {
      console.log("Recognition already running.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started');
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setListening(false);
      
      // Auto-restart if still active
      if (isActive && recognitionRef.current) {
        setReconnecting(true);
        setTimeout(() => {
          try {
            if (recognitionRef.current) {
              recognitionRef.current.start();
              setTimeout(() => setReconnecting(false), 800);
            }
          } catch (e) {
            console.warn('Recognition restart failed:', e);
            setReconnecting(false);
          }
        }, 100);
      }
    };

    recognition.onerror = (event: any) => {
      // Silently handle expected errors during continuous listening
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        // These are normal - user just isn't speaking
        return;
      }
      
      // Only log and handle unexpected errors
      console.error('Speech recognition error:', event.error);
      
      if (event.error === 'aborted' || event.error === 'network') {
        setListening(false);
      }
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(interimTranscript || finalTranscript);

      if (finalTranscript) {
        console.log('Final transcript:', finalTranscript);
        handleCommand(finalTranscript);
        setTranscript('');
      }
    };

    recognitionRef.current = recognition;
    
    try {
      recognition.start();
    } catch (e) {
      console.error('Failed to start recognition:', e);
    }
  }, [isActive]);

  const stopSpeechRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  }, []);

  const handleCommand = useCallback((query: string) => {
    const q = query.toLowerCase().trim();
    console.log('Command received:', q);

    // Stop command
    if (q.includes('stop') || q.includes('silence') || q.includes("don't speak")) {
      speak('Stopping voice assistant', () => {
        stopSpeechRecognition();
        setIsActive(false);
        setFloating(false);
      });
      return;
    }

    // Navigation commands - trigger animation before navigation
    if (q.includes('project')) {
      setIsAnimatingOut(true);
      speak('Here are the projects Alan has worked on.', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/projects");
        }, 600);
      });
    } else if (q.includes('home')) {
      setIsAnimatingOut(true);
      speak('Taking you home!', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/");
        }, 600);
      });
    } else if (q.includes('resume')) {
      setIsAnimatingOut(true);
      speak('Here is Alan\'s resume.', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/resume");
        }, 600);
      });
    } else if (q.includes('about')) {
      setIsAnimatingOut(true);
      speak('Let me tell you about Alan. He is a passionate and reliable individual, he is always working on something new!', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/about");
        }, 600);
      });
    } else if (q.includes('alenso')) {
      setIsAnimatingOut(true);
      speak('Yes! I am listening.', () => {
        setFloating(true);
        // setTimeout(() => {
        //   navigate("");
        // }, 600);
      }); }
      else if (q.includes('skill')) {
      setIsAnimatingOut(true);
      speak('Alan is skilled in React, TypeScript, Node.js, Python, and many more technologies.', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/skills");
        }, 600);
      });
    } else if (q.includes('contact')) {
      setIsAnimatingOut(true);
      speak('You can reach Alan via email at alan roy f f 101 at gmail dot com or phone at 7 5 1 1 1 3 6 1 7 1.', () => {
        setFloating(true);
        setTimeout(() => {
          navigate("/contact");
        }, 600);
      });
    } else if (q.includes('name')) {
      speak("Hi, I'm Alan's AI Assistant, Alenso! How can I help you?");
    } else if (q.includes('hello') || q.includes('hi')) {
      speak('Hello! My name is Alenso, Alan\'s AI assistant. How can I assist you today?');
    } else if (q.includes('help')) {
      speak('You can ask me about projects, skills, resume, about Alan, or how to contact him.');
    } else {
      speak("");
    }
  }, [speak, navigate, stopSpeechRecognition]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    setIsActive(true);

    // Speak greeting first, then start listening
    speak("Hi, I'm an AI assistant developed by Alan. My name is Alenso. Feel free to ask anything about Alan, I have all the info about him.", () => {
      // Start listening after greeting completes
      startSpeechRecognition();
    });
  }, [speak, startSpeechRecognition]);

  const stopListening = useCallback(() => {
    setIsActive(false);
    setFloating(false);
    stopSpeechRecognition();

    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setSpeaking(false);
  }, [stopSpeechRecognition]);

  const toggleListening = useCallback(() => {
    if (isActive) {
      stopListening();
    } else {
      startListening();
    }
  }, [isActive, startListening, stopListening]);

  return (
    <AnimatePresence>
      {/* Floating Orb in corner */}
      {floating && (
        <motion.div
          className="fixed bottom-4 right-4 w-24 h-24 z-50 cursor-pointer shadow-2xl"
          initial={{ scale: 0, x: 200, y: 200, opacity: 0 }}
          animate={isAnimatingOut ? { scale: 0.3, x: -20, y: 0, opacity: 0.7 } : { scale: 1, x: 0, y: 0, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: isAnimatingOut ? 300 : 200, 
            damping: isAnimatingOut ? 20 : 25,
            duration: 0.5
          }}
          onClick={() => setFloating(false)}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={1} />
            <Orb listening={listening} speaking={speaking} />
          </Canvas>
          
          {/* Reconnection indicator */}
          {reconnecting && (
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/90 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Reconnecting...
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Main Voice AI Interface */}
      {!floating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center justify-center w-full max-w-3xl h-[85vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800"
          >
            {/* 3D Orb Canvas */}
            <div className="w-full h-3/5 mb-8 ml-10">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3cfffb" />
                <Orb listening={listening} speaking={speaking} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={!listening && !speaking} autoRotateSpeed={0.5} />
              </Canvas>
            </div>

            {/* Status Indicator */}
            <div className="mb-4 relative">
              {reconnecting && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-500/90 text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-lg"
                >
                  🔄 Reconnecting...
                </motion.div>
              )}
              
              {listening && !reconnecting && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-green-400 font-semibold text-lg"
                >
                  Listening...
                </motion.div>
              )}
              {speaking && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-blue-400 font-semibold text-lg"
                >
                  Speaking...
                </motion.div>
              )}
              {!listening && !speaking && !reconnecting && (
                <div className="text-gray-500 font-semibold text-lg">
                  {isActive ? 'Ready' : 'Press Start to begin'}
                </div>
              )}
            </div>

            {/* Live Transcript */}
            <div className="min-h-[60px] max-w-2xl mb-8">
              <p className="text-green-400 font-mono text-center text-sm leading-relaxed">
                {transcript || 'Your voice input will appear here...'}
              </p>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={toggleListening}
                className={`${
                  isActive
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white shadow-lg transform hover:scale-105 transition-all`}
              >
                {isActive ? 'Stop' : 'Start'}
              </Button>

              {onBack && (
                <Button
                  onClick={() => {
                    stopListening();
                    onBack();
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white shadow-lg transform hover:scale-105 transition-all"
                >
                  Back
                </Button>
              )}
            </div>

            {/* Helper Text */}
            <div className="mt-8 text-gray-400 text-sm text-center max-w-md">
              <p className="mb-2">Try saying:</p>
              <p className="text-xs">"What's your name?" | "Tell me about skills" | "Show me projects" | "Stop"</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAI;
