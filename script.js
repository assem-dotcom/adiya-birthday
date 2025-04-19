document.addEventListener('DOMContentLoaded', () => {
    // Music Setup
    const backgroundMusic = document.getElementById('backgroundMusic');
    const birthdaySong = document.getElementById('birthdaySong');
    
    // Set initial volume and play background music immediately
    backgroundMusic.volume = 0.4;
    birthdaySong.volume = 0.6;  // Increased volume for birthday song
    
    // Start playing background music immediately
    const playBackgroundMusic = () => {
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented. User interaction needed.");
        });
    };
    
    playBackgroundMusic();
    
    // Retry playing music on first interaction if autoplay was prevented
    document.body.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            playBackgroundMusic();
        }
    }, { once: true });

    // Snow Effect
    function createSnowflakes() {
        const snowContainer = document.querySelector('.snow-container');
        const numberOfSnowflakes = 50;

        for (let i = 0; i < numberOfSnowflakes; i++) {
            createSnowflake();
        }
    }

    function createSnowflake() {
        const snowContainer = document.querySelector('.snow-container');
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        
        const size = Math.random() * 5 + 2;
        const startPositionX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startPositionX}px`;
        snowflake.style.animationDuration = `${animationDuration}s`;

        snowContainer.appendChild(snowflake);

        snowflake.addEventListener('animationend', () => {
            snowflake.remove();
            createSnowflake();
        });
    }

    // Initialize snow effect
    createSnowflakes();

    // Scene Management
    function transitionToScene(currentScene, nextSceneId) {
        const nextScene = document.getElementById(nextSceneId);
        
        gsap.to(currentScene, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                currentScene.classList.remove('active');
                nextScene.classList.add('active');
                gsap.from(nextScene, {
                    opacity: 0,
                    duration: 1
                });

                // Animate elements in the new scene
                const elements = nextScene.querySelectorAll('.character-name, .dialogue, .buttons');
                gsap.from(elements, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }

    // Scene Transitions
    const invitationScene = document.getElementById('invitationScene');
    const ballroomScene = document.getElementById('ballroomScene');
    const danceScene = document.getElementById('danceScene');
    const gardenScene = document.getElementById('gardenScene');
    const surpriseScene = document.getElementById('surpriseScene');
    const finalScene = document.getElementById('finalScene');

    // Invitation Scene
    document.querySelector('.accept').addEventListener('click', () => {
        // Ensure background music is playing when accepting invitation
        if (backgroundMusic.paused) {
            playBackgroundMusic();
        }
        transitionToScene(invitationScene, 'ballroomScene');
    });

    document.querySelector('.decline').addEventListener('click', () => {
        alert('But it\'s your birthday! You must attend! 🎉');
    });

    // Ballroom Scene
    document.querySelector('.dance-btn').addEventListener('click', () => {
        transitionToScene(ballroomScene, 'danceScene');
    });

    document.querySelector('.step-btn').addEventListener('click', () => {
        alert('Oops! He laughs warmly and helps you find the rhythm... 😊');
        transitionToScene(ballroomScene, 'danceScene');
    });

    // Dance Scene
    document.querySelector('.blush-btn').addEventListener('click', () => {
        transitionToScene(danceScene, 'gardenScene');
    });

    document.querySelector('.tease-btn').addEventListener('click', () => {
        alert('"Your German is charming," you say with a smile. He leads you to the garden...');
        transitionToScene(danceScene, 'gardenScene');
    });

    // Garden Scene
    document.querySelector('.follow-btn').addEventListener('click', () => {
        // Switch to birthday song
        gsap.to(backgroundMusic, {
            volume: 0,
            duration: 1.5,
            onComplete: () => {
                backgroundMusic.pause();
                birthdaySong.currentTime = 0;  // Start from beginning
                birthdaySong.play().then(() => {
                    gsap.to(birthdaySong, {
                        volume: 0.6,
                        duration: 1,
                        ease: "power2.in"
                    });
                });
            }
        });
        transitionToScene(gardenScene, 'surpriseScene');
    });

    document.querySelector('.wait-btn').addEventListener('click', () => {
        alert('"Trust me," he says with a mysterious smile...');
        // Switch to birthday song
        gsap.to(backgroundMusic, {
            volume: 0,
            duration: 1.5,
            onComplete: () => {
                backgroundMusic.pause();
                birthdaySong.currentTime = 0;  // Start from beginning
                birthdaySong.play().then(() => {
                    gsap.to(birthdaySong, {
                        volume: 0.6,
                        duration: 1,
                        ease: "power2.in"
                    });
                });
            }
        });
        transitionToScene(gardenScene, 'surpriseScene');
    });

    // Surprise Scene
    document.querySelector('.final-btn').addEventListener('click', () => {
        // Add golden snowflakes for the final scene
        document.querySelectorAll('.snowflake').forEach(flake => {
            flake.style.background = 'rgba(255, 215, 0, 0.4)';
        });
        transitionToScene(surpriseScene, 'finalScene');
    });

    // Final Scene
    document.querySelector('.cat-btn').addEventListener('click', () => {
        // Reset music
        birthdaySong.pause();
        birthdaySong.currentTime = 0;
        backgroundMusic.currentTime = 0;
        
        // Redirect to 50 Cent's "In Da Club" music video
        window.location.href = 'https://www.youtube.com/watch?v=5qm8PH4xAss&list=RD5qm8PH4xAss&start_radio=1&ab_channel=50CentVEVO';
    });
}); 