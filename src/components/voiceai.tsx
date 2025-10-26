import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from "react-router-dom";

// ---------- WaveLayer ----------
const WaveLayer = ({ radius, color, speed, amplitude, frequency, offset }: any) => {
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

        const wave =
          Math.sin(normal.x * frequency + time) *
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

// ---------- Orb ----------
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
      const scale = isActive ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.04 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
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
        <meshBasicMaterial color={colors[0]} transparent opacity={isActive ? 0.08 : 0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// ---------- VoiceAI ----------
interface VoiceAIProps {
  onBack?: () => void;
  handleBackendCommand?: (query: string, speak: (text: string, onSpeechEnd?: () => void) => void) => void;
}

const VoiceAI: React.FC<VoiceAIProps> = ({ onBack, handleBackendCommand }) => {
  const [isActive, setIsActive] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [floating, setFloating] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [lastApiResponse, setLastApiResponse] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
  }, []);

  const getMaleVoice = useCallback(() => {
    if (!synthRef.current) return null;
    const voices = synthRef.current.getVoices();
    return (
      voices.find((v) =>
        v.name.includes('Male') ||
        v.name.includes('David') ||
        v.name.includes('Mark') ||
        v.name.includes('Google US English')
      ) || null
    );
  }, []);

  const speak = useCallback((text: string, onSpeechEnd?: () => void) => {
    if (!synthRef.current) return onSpeechEnd?.();
    synthRef.current.cancel();
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getMaleVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 1;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    utterance.onend = () => {
      setSpeaking(false);
      onSpeechEnd?.();
    };
    synthRef.current.speak(utterance);
  }, [getMaleVoice]);
const defaultHandleCommand = useCallback((query: string) => {
    const q = query.toLowerCase();
    if (q.includes('stop') || q.includes('silence') || q.includes("don't speak")) { 
      speak('Stopping voice assistant', () => { stopSpeechRecognition(); 
        setIsActive(false); 
        setFloating(false); 
      }); return; }
    if (q.includes('project')) { setIsAnimatingOut(true);
      speak('Here are the projects Alan has worked on.', () => { setFloating(true);
      setTimeout(() => { navigate("/projects");}, 600); });
     } else if (q.includes('home')){ 
      setIsAnimatingOut(true);
      speak('Taking you home!', () => { setFloating(true);
      setTimeout(() => { navigate("/"); }, 600); });
     } else if (q.includes('resume')) { setIsAnimatingOut(true);
      speak('Here is Alan\'s resume.', () => { setFloating(true);
      setTimeout(() => { navigate("/resume"); }, 600); });
     } else if (q.includes('about')) { setIsAnimatingOut(true);
      speak('Let me tell you about Alan. He is a passionate and reliable individual, he is always working on something new!', () => { setFloating(true);
      setTimeout(() => { navigate("/about"); }, 600); });
     } else if (q.includes('alenso')) { setIsAnimatingOut(true);
      speak('Yes! I am listening.', () => { setFloating(true);
      setTimeout(() => { navigate(""); }, 600); });
     } else if (q.includes('skill')) { setIsAnimatingOut(true);
      speak('Alan is skilled in React, TypeScript, Node.js, Python, and many more technologies.', () => { setFloating(true);
      setTimeout(() => { navigate("/skills"); }, 600); });
     } else if (q.includes('contact')) { setIsAnimatingOut(true); 
      speak('You can reach Alan via email at alan roy f f 101 at gmail dot com or phone at 7 5 1 1 1 3 6 1 7 1.', () => { setFloating(true); 
      setTimeout(() => { navigate("/contact"); }, 600); });
     } else if (q.includes('name')) { 
      speak("Hi, I'm Alan's AI Assistant, Alenso! How can I help you?");
     } else if (q.includes('hello') || q.includes('hi')) {
       speak('Hello! My name is Alenso, Alan\'s AI assistant. How can I assist you today?');
     } else if (q.includes('help')) { 
      speak('You can ask me about projects, skills, resume, about Alan, or how to contact him.');
     } else { speak(""); } },
      [speak, navigate]);

  const handleCommandInternal = useCallback((query: string) => {
    if (handleBackendCommand) {
      handleBackendCommand(query, speak);
    } else {
      defaultHandleCommand(query);
    }
  }, [handleBackendCommand, speak, defaultHandleCommand]);

  // ---------- Voice Recording Logic ----------
  const startSpeechRecognition = useCallback(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const res = await fetch('/api/speech', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audioBase64: reader.result }),
            });
            const data = await res.json();
            setTranscript(data.transcript || '');
            handleCommandInternal(data.transcript || '');
          } catch (err) {
            console.error(err);
          }
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();
      setListening(true);

      timeoutRef.current = setTimeout(() => {
        mediaRecorder.stop();
        setListening(false);
      }, 5000); // record for 5 seconds
    });
  }, [handleCommandInternal]);

  const stopSpeechRecognition = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
    setListening(false);
  }, []);

  // ---------- UI Controls ----------
  const startListening = useCallback(() => {
    setIsActive(true);
    setFloating(true);
    speak("Hi! I'm Alenso, Alan's AI assistant. Feel free to ask anything about him.", startSpeechRecognition);
  }, [speak, startSpeechRecognition]);

  const stopListening = useCallback(() => {
    stopSpeechRecognition();
    setIsActive(false);
  }, [stopSpeechRecognition]);

  // Keep orb across routes
  useEffect(() => {
    setFloating(true);
  }, [location]);

  // ---------- Render ----------
  return (
    <AnimatePresence>
      {floating && (
        <motion.div
          className="fixed bottom-4 right-4 w-24 h-24 z-50 cursor-pointer shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => (isActive ? stopListening() : startListening())}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[2, 2, 2]} intensity={1} />
            <Orb listening={listening} speaking={speaking} />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAI;
