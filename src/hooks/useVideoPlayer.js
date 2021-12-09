import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement) => {
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        loaded: false,
        speed: 1,
        isMuted: true,
    });

    const togglePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        });
    };

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
        });
    };

    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed,
        });
    };

    const toggleMute = () => {
        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted,
        });
    };

    useEffect(() => {
        playerState.isMuted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [playerState.isMuted, videoElement]);

    console.log('current', videoElement.current?.readyState)

    useEffect(() => {
        if (!videoElement.current) return
        const handler = () => {
            if (videoElement.current.readyState >= 3) {
                setPlayerState({
                    ...playerState,
                    loaded: true
                })
            }
        }

        videoElement.current.onloadeddata = handler
    })

    return {
        toggleMute,
        setPlayerState,
        playerState,
        isMuted: playerState.isMuted,
        loaded: playerState.loaded
    }
};

export default useVideoPlayer;