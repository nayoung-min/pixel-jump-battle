import wave

with wave.open('/Users/nayoung/visual-novel-game/assets/sfx_click_placeholder.wav', 'wb') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(44100)
    wf.writeframes(b'\x00\x00' * int(44100 * 0.1))