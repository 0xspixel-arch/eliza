import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { Phone, PhoneOff } from 'lucide-react';
import React, { useRef, useState } from 'react';

export const VoiceChat = () => {
    const { toast } = useToast();
    const [isSessionActive, setIsSessionActive] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const dataChannelRef = useRef<RTCDataChannel | null>(null);

    const startSession = async () => {
        try {
            // Get ephemeral token
            const tokenResponse = await fetch('/api/openai/token');
            if (!tokenResponse.ok) {
                const errorData = await tokenResponse.json();
                throw new Error(errorData.error || 'Failed to get token');
            }
            const data = await tokenResponse.json();
            const EPHEMERAL_KEY = data.client_secret.value;

            // Create peer connection
            const pc = new RTCPeerConnection();
            peerConnectionRef.current = pc;

            // Set up remote audio
            const audioEl = document.createElement('audio');
            audioEl.autoplay = true;
            audioRef.current = audioEl;
            pc.ontrack = (e) => {
                audioEl.srcObject = e.streams[0];
            };

            // Add local audio track
            const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
            pc.addTrack(ms.getTracks()[0]);

            // Data channel
            const dc = pc.createDataChannel("oai-events");
            dataChannelRef.current = dc;

            // Offer
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            // Connect to OpenAI Realtime API
            const baseUrl = "https://api.openai.com/v1/realtime";
            const model = "gpt-4o-realtime-preview-2024-12-17";
            const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
                method: "POST",
                body: offer.sdp,
                headers: {
                    Authorization: `Bearer ${EPHEMERAL_KEY}`,
                    "Content-Type": "application/sdp"
                },
            });

            const answer: RTCSessionDescriptionInit = {
                type: "answer",
                sdp: await sdpResponse.text(),
            };
            await pc.setRemoteDescription(answer);

            setIsSessionActive(true);
            toast({
                title: "Voice Chat Started",
                description: "You are now connected to OpenAI Realtime.",
            });

        } catch (error) {
            console.error('Voice chat error:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to start voice chat. Ensure OPENAI_API_KEY is set.",
            });
            stopSession();
        }
    };

    const stopSession = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        if (audioRef.current) {
            audioRef.current.remove();
            audioRef.current = null;
        }
        setIsSessionActive(false);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={isSessionActive ? "destructive" : "ghost"}
                    size="icon"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    onClick={isSessionActive ? stopSession : startSession}
                >
                    {isSessionActive ? <PhoneOff className="size-3 sm:size-4" /> : <Phone className="size-3 sm:size-4" />}
                    <span className="sr-only">{isSessionActive ? "End Call" : "Start Voice Chat"}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
                <p>{isSessionActive ? "End Call" : "Start Voice Chat"}</p>
            </TooltipContent>
        </Tooltip>
    );
};
