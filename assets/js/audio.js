window.audio = {
    
    // Instance to the AudioContext
    // Because of https://code.google.com/p/chromium/issues/detail?id=308784
    audioCtx : null,
    
    
    
    
    
    // Initialize global stuff
    init : function() {
        // Set the available AudioContext
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        
        // Create an instance of AudioContext
        audio.audioCtx = new AudioContext();
    },
    
    
    
    
    createSound : function(frequency, delay, overlap) {
        
        // Overlap multiple sounds
        overlap = overlap || true;
        
        var oscillator = audio.audioCtx.createOscillator();
        oscillator.frequency.value = frequency;
        
        oscillator.connect(audio.audioCtx.destination);

        var currentTime = audio.audioCtx.currentTime;

        console.log("overlap " + overlap);

        if (overlap) {
            oscillator.start(currentTime);
            oscillator.stop(currentTime + delay);

        } else {
            console.log('asdf');
            oscillator.start(currentTime + delay);
            oscillator.stop(currentTime + delay * 2);
        }

            
        return audio;
    },
    
    
    
    
    
    // Player dies
    die : function() {
        audio.createSound(200, .25).createSound(300, .25);
    },
    
    // Collect a default power-up
    collectPowerUp : function() {
        console.log('collect powerup');
        audio.createSound(500, .25, false).createSound(600, .5, false).createSound(700, .75, false);
    },
    
    // Collect a bomb
    collectBomb : function() {
        audio.createSound(100, .1).createSound(150, .2).createSound(300, .3);
    }

    
}





// Initialize
window.audio.init();