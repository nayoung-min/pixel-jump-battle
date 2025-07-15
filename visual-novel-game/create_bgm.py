import wave

with wave.open('/Users/nayoung/visual-novel-game/assets/bgm_placeholder.wav', 'wb') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(44100)
    wf.writeframes(b'\x00\x00' * 44100 * 5)