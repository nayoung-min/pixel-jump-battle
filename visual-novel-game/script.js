document.addEventListener('DOMContentLoaded', () => {
    const nameInputContainer = document.getElementById('name-input-container');
    const playerNameInput = document.getElementById('player-name-input');
    const startGameButton = document.getElementById('start-game-button');
    const gameContainer = document.getElementById('game-container');

    const dialogueBox = document.getElementById('dialogue-box');
    const characterNameElement = document.getElementById('character-name');
    const dialogueTextElement = document.getElementById('dialogue-text');
    const characterElement = document.getElementById('character');
    
    const backgroundElement = document.getElementById('background');
    const choicesElement = document.getElementById('choices');

    let playerName = '영민'; // Default name

    const characters = {
        jiah: {
            name: '지아',
            image: 'url(assets/jiah_character.png)'
        },
        nayoung: {
            name: '나영',
            image: 'url(assets/nayoung_character.png)'
        },
        seohyun: {
            name: '서현',
            image: 'url(assets/seohyun_character.png)'
        }
    };

    const story = [
        // 0: Intro
        {
            character: null,
            dialogue: '새로운 교복, 낯선 복도를 따라 교실로 향하는 발걸음이 유난히 무겁게 느껴진다. 과연 잘 적응할 수 있을까?',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '걱정과 설렘이 뒤섞인 채 교실 문을 열자, 시끄럽던 교실이 순간 조용해지며 모든 시선이 내게로 쏠렸다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나는 어색하게 웃으며 빈자리를 찾아 앉았다. 점심시간이 되자, 나는 원래 가입하고 싶었던 동아리를 찾아 나서기로 했다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            dialogue: '어떤 동아리에 가입할까?',
            choices: [
                { text: '조용한 문예부에 가입한다', next: 4 },
                { text: '활기찬 운동부를 둘러본다', next: 5 }
            ]
        },
        // 문예부 루트
        {
            character: null,
            dialogue: '나는 조용한 복도를 지나 문예부실에 도착했다. 하지만 문은 굳게 닫혀 있었다.',
            background: 'url(assets/realistic_library.jpg)'
        },
        // 운동부 루트
        {
            character: null,
            dialogue: '운동장에서는 힘찬 기합 소리가 들려왔다. 하지만 나는 운동에는 영 소질이 없어서... 발길을 돌렸다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '어디로 가야 할지 막막해하며 복도를 헤매던 중, 어디선가 감미로운 기타 소리가 들려왔다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            dialogue: '소리를 따라가 볼까?',
            choices: [
                { text: '소리를 따라가 본다', next: 8 },
                { text: '그냥 교실로 돌아간다', next: 9 }
            ]
        },
        // 소리 따라가기
        {
            character: null,
            dialogue: '소리가 이끄는 곳은 낡은 음악실이었다. 문틈으로 살짝 엿보니, 세 명의 여학생이 즐겁게 합주를 하고 있었다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        // 교실로 돌아가기
        {
            character: null,
            dialogue: '나는 조용히 교실로 돌아왔다. 하지만 아까 들었던 기타 소리가 귓가에 맴돌았다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나도 모르게 악보에 무언가를 끄적이고 있었다. 그때, 누군가 내게 다가왔다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        // Jiah appears
        {
            character: 'jiah',
            dialogue: '안녕! 네가 이번에 새로 온 전학생 맞지? 나는 지아라고 해. 만나서 반가워!',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '그녀의 밝은 미소에 나도 모르게 긴장이 조금 풀리는 것 같았다.'
        },
        {
            character: 'jiah',
            dialogue: '혹시 밴드부 같은 동아리에 관심 있어? 우리 밴드부 정말 재밌는데!',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        // Nayoung appears
        {
            character: 'nayoung',
            dialogue: '흥, 시끄러워. 어차피 들어올 녀석도 아니야. 괜히 귀찮게 하지 마.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '차가운 목소리에 심장이 덜컥 내려앉는 기분이었다. 첫날부터 제대로 찍힌 건가...'
        },
        // Seohyun appears
        {
            character: 'seohyun',
            dialogue: '나영아, 그렇게 쌀쌀맞게 굴지 마. 전학생, 미안해. 얘가 원래 좀 낯을 가려서 그래. 나는 서현이야.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '다정한 목소리에 안도감이 들었다. 세 사람은 이 학교에서 꽤나 유명한 선배들인 것 같았다.'
        },
        {
            dialogue: '나는 어떤 선배를 따라 밴드부에 들어가 새로운 학교생활을 시작해볼까?',
            choices: [
                { text: '활발하고 애교 많은 지아 선배', next: 19 },
                { text: '시크하지만 매력적인 나영 선배', next: 40 },
                { text: '다정하고 똑똑해 보이는 서현 선배', next: 65 }
            ]
        },

        // Jiah's Route
        {
            character: 'jiah',
            dialogue: '얏호! 잘 생각했어! 사실 내가 너 점찍어놨었거든~ 네가 만든 곡 듣고 완전 반했잖아!',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'jiah',
            dialogue: '우리 오늘부터 같이 점심 먹자! 응? 그리고 말 편하게 해, **아!',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 적극적인 스킨십이 조금은 부담스럽게 느껴졌다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '며칠 후, 나는 우연히 음악실에서 혼자 울고 있는 지아 선배를 발견했다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: 'jiah',
            dialogue: '(훌쩍)... 아, **아... 여긴 어떻게...',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '항상 밝기만 하던 선배의 처음 보는 모습. 나는... 선배를 지켜주고 싶다고 생각했다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '나는 조심스럽게 지아 선배에게 다가갔다. 선배는 놀란 듯 눈을 크게 떴다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: 'jiah',
            dialogue: '**아... 사실은... 밴드부 예산이 너무 부족해서... 이대로는 대회를 나갈 수 없을지도 몰라...',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 눈물 섞인 고백에 나는 마음이 아팠다. 그때부터였다. 선배의 옆을 지키고 싶다는 생각이 확신으로 변한 것은.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '나는 지아 선배와 함께 밴드부 예산 문제를 해결하기 위해 여러 방안을 모색했다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'jiah',
            dialogue: '**아, 네 덕분에 용기가 생겼어! 우리 꼭 해내자!',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '지아 선배의 밝은 미소를 보며, 나는 그녀를 향한 내 마음이 더욱 커지고 있음을 느꼈다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        // New segment starts here (index 30)
        {
            dialogue: '지아 선배와 함께하는 시간이 늘어날수록, 나는 그녀의 매력에 점점 빠져들었다. 어느 날, 선배가 내게 조심스럽게 말을 걸었다.',
            choices: [
                { text: '선배의 이야기를 들어준다', next: 31 }, // New path A
                { text: '지금은 바쁘다고 말한다', next: 37 } // New path B
            ]
        },
        // Path A: Help Jiah (index 31)
        {
            character: 'jiah',
            dialogue: '**아... 사실은... 내가 요즘 작곡이 잘 안 돼서 고민이야. 네가 좀 도와줄 수 있을까?',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 진지한 모습에 나는 망설임 없이 고개를 끄덕였다. 우리는 함께 밤늦도록 곡 작업을 했다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: 'jiah',
            dialogue: '**아, 네 덕분에 좋은 곡이 나올 것 같아! 정말 고마워!',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 환한 미소를 보며, 나는 그녀를 향한 내 마음이 더욱 깊어졌음을 느꼈다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '지아 선배와의 관계는 더욱 돈독해졌다. 우리는 밴드부의 핵심 멤버로 성장했고, 함께 많은 추억을 만들었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '게임이 종료되었습니다.', // End of Path A (index 36)
            background: 'url(assets/realistic_classroom.jpg)'
        },
        // Path B: Decline Jiah (index 37)
        {
            character: null,
            dialogue: '나는 지아 선배의 이야기를 듣지 않고 교실로 돌아왔다. 선배는 조금 실망한 듯 보였다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '그날 이후, 지아 선배와는 조금 서먹해졌다. 밴드부 활동은 계속했지만, 이전처럼 편하게 지내지는 못했다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '게임이 종료되었습니다.', // End of Path B (index 39)
            background: 'url(assets/realistic_classroom.jpg)'
        },
        

        // Nayoung's Route
        {
            character: 'nayoung',
            dialogue: '흐음, 날 선택하다니. 의외네. ...따라와.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배는 첫인상처럼 차가웠다. 하지만...',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '이거. 지난번에 물어봤던 거. ...모르면 그냥 물어봐.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '어느새부턴가 선배는 내가 물어본 것들을 잊지 않고 챙겨주기 시작했다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '너, 우산 없지? ...혹시 몰라서 챙겨왔어. 같이 쓰고 가.',
            background: 'url(assets/realistic_rainy_day.jpg)'
        },
        {
            character: null,
            dialogue: '무심하게 내미는 우산. 그 순간, 선배에게서 눈을 뗄 수 없었다.',
            background: 'url(assets/realistic_rainy_day.jpg)'
        },
        {
            character: null,
            dialogue: '그날 이후, 나는 나영 선배에게 조금 더 다가가기로 결심했다.',
            background: 'url(assets/realistic_rainy_day.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '**아, 연습할 때 그 부분은 이렇게 해보는 게 어때? 네 연주, 나쁘지 않아.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 무심한 듯한 칭찬과 조언은 나에게 큰 힘이 되었다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배와 함께 연습하는 시간이 늘어날수록, 나는 그녀의 차가운 겉모습 속에 숨겨진 따뜻한 마음을 느낄 수 있었다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '...다음 주말에, 시간 되면 같이 악기 보러 갈래?',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 예상치 못한 제안에, 내 심장이 두근거렸다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배와 함께 악기 상점에 갔다. 선배는 악기를 고르는 내내 진지한 표정으로 조언을 해주었다.',
            background: 'url(assets/realistic_music_store.jpeg)'
        },
        {
            character: 'nayoung',
            dialogue: '네가 고른 악기, 나쁘지 않네. 잘 다루면 멋있을 거야.',
            background: 'url(assets/realistic_music_store.jpeg)'
        },
        {
            character: null,
            dialogue: '무심한 듯 던지는 선배의 한마디에, 나는 그녀의 음악에 대한 진심과 나를 향한 알 수 없는 감정을 느꼈다.',
            background: 'url(assets/realistic_music_store.jpeg)'
        },
        {
            dialogue: '나영 선배와 함께하는 시간이 늘어날수록, 나는 그녀의 차가운 겉모습 속에 숨겨진 따뜻한 마음을 느낄 수 있었다. 어느 날, 선배가 내게 조심스럽게 말을 걸었다.',
            choices: [
                { text: '선배의 이야기를 들어준다', next: 56 },
                { text: '지금은 바쁘다고 말한다', next: 60 }
            ]
        },
        // Path A: Help Nayoung (index 56)
        {
            character: 'nayoung',
            dialogue: '**아... 사실은... 내가 요즘 슬럼프라서... 곡이 잘 안 써져.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 솔직한 모습에 나는 그녀를 위로해주고 싶었다. 우리는 함께 밤늦도록 음악에 대해 이야기했다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '**아, 네 덕분에 다시 용기가 생겼어. 고마워.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 작은 미소를 보며, 나는 그녀를 향한 내 마음이 더욱 깊어졌음을 느꼈다.',
            background: 'url(assets/realistic_music_room.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배와의 관계는 더욱 돈독해졌다. 우리는 밴드부의 핵심 멤버로 성장했고, 함께 많은 추억을 만들었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배와 함께하는 매일이 특별했다. 우리는 서로에게 가장 큰 힘이 되어주었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'nayoung',
            dialogue: '...고마워. 네 덕분에 여기까지 올 수 있었어.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 진심 어린 말에 나는 가슴이 벅차올랐다. 우리의 이야기는 이제 시작이었다.',
            background: 'url(assets/realistic_classroom.jpg)',
            choices: [
                { text: '계속해서 나영 선배와 함께한다', next: 82 }
            ]
        },
        // Path B: Decline Nayoung (index 63)
        {
            character: null,
            dialogue: '나는 나영 선배의 이야기를 듣지 않고 교실로 돌아왔다. 선배는 조금 실망한 듯 보였다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '그날 이후, 나영 선배와는 조금 서먹해졌다. 밴드부 활동은 계속했지만, 이전처럼 편하게 지내지는 못했다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나영 선배와의 관계는 이전처럼 가깝지는 않았지만, 밴드부 활동은 계속되었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '가끔씩 마주칠 때마다 아쉬움이 남았지만, 각자의 길에서 최선을 다하기로 했다.',
            background: 'url(assets/realistic_classroom.jpg)',
            choices: [
                { text: '다른 길을 선택했지만, 후회는 없다', next: 82 }
            ]
        },
        {
            character: null,
            dialogue: '게임이 종료되었습니다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        

        // Seohyun's Route
        {
            character: 'seohyun',
            dialogue: '어머, 나를? 고마워. 이쪽으로 와. 우리 밴드부에 대해 설명해줄게.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: 'seohyun',
            dialogue: '나는 드럼을 담당하고 있어. 의외지? 공부 스트레스는 드럼으로 풀거든. 시험 기간에 모르는 거 있으면 언제든 물어봐.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '며칠 뒤, 야자 시간에 졸고 있는 내 책상 위에는 캔커피와 작은 메모가 놓여 있었다.',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: null,
            dialogue: '"오늘도 파이팅! -서현 선배가-"',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: 'seohyun',
            dialogue: '**아, 시험 끝나고... 혹시 시간 되면 같이 영화 보러 갈래?',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            dialogue: '서현 선배의 갑작스러운 제안에, 나는 어떻게 대답해야 할지 고민에 빠졌다.',
            choices: [
                { text: '좋아요, 같이 보러 가요!', next: 72 },
                { text: '죄송해요, 그날은 좀...', next: 78 }
            ]
        },
        // Seohyun's Route - Accept
        {
            character: null,
            dialogue: '서현 선배와 함께 영화를 보러 갔다. 영화가 끝난 후, 우리는 영화에 대한 이야기를 나누며 더욱 가까워졌다.',
            background: 'url(assets/placeholder_background.png)'
        },
        {
            character: null,
            dialogue: '선배와 함께하는 시간이 너무나 즐거웠다.',
            background: 'url(assets/placeholder_background.png)'
        },
        {
            character: 'seohyun',
            dialogue: '**아, 밴드 활동도 중요하지만 공부도 소홀히 하면 안 돼. 네가 잘해야 나중에 하고 싶은 걸 더 자유롭게 할 수 있어.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 진심 어린 조언에 나는 마음이 따뜻해졌다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '서현 선배는 나에게 단순한 선배 이상의 존재가 되어가고 있었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            dialogue: '서현 선배와 함께하는 시간이 늘어날수록, 나는 그녀의 지적인 매력에 점점 빠져들었다. 어느 날, 선배가 내게 조심스럽게 말을 걸었다.',
            choices: [
                { text: '선배의 이야기를 들어준다', next: 71 },
                { text: '지금은 바쁘다고 말한다', next: 75 }
            ]
        },
        // Path A: Help Seohyun (index 71)
        {
            character: 'seohyun',
            dialogue: '**아... 사실은... 내가 요즘 진로 때문에 고민이 많아. 네가 좀 도와줄 수 있을까?',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 진지한 모습에 나는 망설임 없이 고개를 끄덕였다. 우리는 함께 밤늦도록 진로에 대해 이야기했다.',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: 'seohyun',
            dialogue: '**아, 네 덕분에 다시 용기가 생겼어. 고마워.',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: null,
            dialogue: '선배의 환한 미소를 보며, 나는 그녀를 향한 내 마음이 더욱 깊어졌음을 느꼈다.',
            background: 'url(assets/realistic_library.jpg)'
        },
        {
            character: null,
            dialogue: '서현 선배와의 관계는 더욱 돈독해졌다. 우리는 밴드부의 핵심 멤버로 성장했고, 함께 많은 추억을 만들었다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '게임이 종료되었습니다.', // End of Path A (index 77)
            background: 'url(assets/realistic_classroom.jpg)'
        },
        // Path B: Decline Seohyun (index 78)
        {
            character: null,
            dialogue: '서현 선배의 제안을 거절했다. 선배는 아쉬워하는 듯했지만, 이내 괜찮다고 웃어 보였다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '나는 선배에게 미안했지만, 그날은 다른 중요한 약속이 있었다. (사실은 밴드부 연습이 있었다.)',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '서현 선배와의 관계는 여전히 좋았지만, 그날의 선택은 우리 사이에 미묘한 거리를 만들었다. 조금 아쉬웠다. 하지만 후회는 없다.',
            background: 'url(assets/realistic_classroom.jpg)'
        },
        {
            character: null,
            dialogue: '게임이 종료되었습니다.', // End of Path B (index 81)
            background: 'url(assets/realistic_classroom.jpg)'
        },
        ];

    let currentStoryIndex = 0;

    function updateDialogue(text) {
        return text.replace(/\*\*/g, playerName);
    }

    function showScene() {
        if (currentStoryIndex >= story.length) {
            dialogueTextElement.textContent = '게임이 종료되었습니다.';
            characterNameElement.textContent = '';
            characterElement.style.opacity = 0;
            choicesElement.innerHTML = '';
            dialogueBox.style.cursor = 'default';
            return;
        }

        const scene = story[currentStoryIndex];

        if (scene.background) {
            backgroundElement.style.backgroundImage = scene.background;
        }

        if (scene.character) {
            const char = characters[scene.character];
            characterNameElement.textContent = char.name;
            characterElement.style.backgroundImage = char.image;
            characterElement.style.opacity = 1;
        } else {
            characterNameElement.textContent = '';
            characterElement.style.backgroundImage = 'none';
            characterElement.style.opacity = 0;
        }

        dialogueTextElement.textContent = updateDialogue(scene.dialogue);

        choicesElement.innerHTML = '';
        if (scene.choices) {
            dialogueBox.style.cursor = 'default';
            scene.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = updateDialogue(choice.text);
                button.className = 'choice-button';
                button.onclick = () => {
                    currentStoryIndex = choice.next;
                    showScene();
                };
                choicesElement.appendChild(button);
            });
        } else {
            dialogueBox.style.cursor = 'pointer';
        }
    }

    let bgm = new Audio('assets/bgm.wav');
    bgm.loop = true;
    let sfxClick = new Audio('assets/sfx_click.wav');

    startGameButton.addEventListener('click', () => {
        const name = playerNameInput.value.trim();
        if (name) {
            playerName = name;
        }
        
        nameInputContainer.style.display = 'none';
        gameContainer.style.display = 'block';

        if (bgm.paused) {
            bgm.play().catch(e => console.log("BGM play failed:", e));
        }
        showScene();
    });

    dialogueBox.addEventListener('click', () => {
        if (!story[currentStoryIndex].choices && currentStoryIndex < story.length) {
            sfxClick.play().catch(e => console.log("SFX play failed:", e));
            currentStoryIndex++;
            showScene();
        }
    });
});