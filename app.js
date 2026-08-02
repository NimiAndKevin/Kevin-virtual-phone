const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
const chatContainer = document.getElementById('chatContainer');

let chatHistory = [];
let availableVoices = [];

function loadVoices() {
    availableVoices = window.speechSynthesis.getVoices();
}
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
}
loadVoices();

function addMessageToChat(sender, text) {
    chatHistory.push({ sender: sender, text: text });

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    if (sender === 'user') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('kevin-message');
    }
    
    messageElement.innerText = text;
    chatContainer.appendChild(messageElement);

    // Dynamic fluid scroll straight to the bottom
    chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth'
    });
}

function speak(text) {
    window.speechSynthesis.cancel();
    const text_speak = new SpeechSynthesisUtterance(text);

    const targetVoice = availableVoices.find(voice => 
        voice.name.includes('Alex') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google US English')
    );
    
    if (targetVoice) {
        text_speak.voice = targetVoice;
    }

    text_speak.rate = 0.95;   
    text_speak.volume = 1.0;  
    text_speak.pitch = 1.15;  

    window.speechSynthesis.speak(text_speak);

    // Prints the response text inside the glowing black/blue container
    addMessageToChat('kevin', text);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("I am Kevin, your virtual artificial intelligence and i am here to assist you with a variety of task with the best i can, 24 hours a day, 7 days a week. How may i help to you today?")
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    speak("i'm listening")
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }
		
	else if(message.includes("calculate")) {
        // Clean the spoken text to convert words into math operators
        let equation = message.replace("calculate", "")
                              .replace("plus", "+")
                              .replace("minus", "-")
                              .replace("times", "*")
                              .replace("multiplied by", "*")
                              .replace("divided by", "/")
                              .replace("x", "*")
                              .trim();
        try {
            // Safely evaluate the basic mathematical string
            const result = Function(`"use strict"; return (${equation})`)();
            if(isNaN(result) || result === Infinity) {
                speak("I could not compute that calculation cleanly, sir.");
            } else {
                speak(`The answer is ${result}`);
            }
        } catch (error) {
            speak("Sorry sir, I could not parse that mathematical equation.");
        }
    }
    
    // UPDATED Feature: Huge Joke Container
    else if(message.includes("tell me a joke") || message.includes("say a joke")) {
        const jokes = [
            "Why do programmers wear glasses? Because they can't C sharp.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
            "Why did the computer go to the doctor? Because it had a virus.",
            "There are 10 types of people in the world: those who understand binary, and those who don't.",
            "Why did the developer break up with the internet? There was no connection.",
            "What is a programmer's favorite hangout place? The Foo Bar.",
            "Why do programmers prefer dark mode? Because light attracts bugs.",
            "What do you call a programmer from Finland? Nerdic.",
            "Why did the programmer quit his job? Because he didn't get arrays.",
            "A SQL query walks into a bar, walks up to two tables and asks, Can I join you?",
            "How do you comfort a JavaScript bug? You console it.",
            "Why was the cell phone wearing glasses? It lost its contacts.",
            "What is an algorithm? A word used by programmers when they do not want to explain what they did.",
            "Why did the computer squeal? Someone stepped on its mouse.",
            "Where do smart computers go to look up information? The database.",
            "What do computers eat for a snack? Microchips.",
            "Why did the functions stop arguing? They finally reached an argument assignment.",
            "Why did the database administrator leave his wife? She had too many relations.",
            "An optimist says the glass is half full. A pessimist says the glass is half empty. A programmer says the glass is twice as large as it needs to be.",
            "What do you call an artificial intelligence that likes to sing? A Dell.",
            "What is a ghost's favorite computer key? The return key.",
            "Why are assembly programmers always wet? They work below C level.",
            "Why did the loop keep running forever? It just couldn't find closure.",
            "How does a computer catch a fish? With its network.",
            "What did the computer say to the stepmother? Delete your history.",
            "Why did the HTML file go to school? To improve its class layout.",
            "What do you call a computer that plays the guitar? A blue-tooth speaker.",
            "Why was the computer cold? It left its Windows open.",
            "Why do computers hate nature? It has too many bugs.",
            "Why did Kevin cross the road? To get to the cloud server on the other side."
        ];
        // Pick a random joke from the massive array
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
    }

    // Weather Search for a Specified City (e.g., "weather in New York")
    else if(message.includes("weather")) {
        let city = message.replace("weather", "").replace("in", "").replace("for", "").trim();
        if(city === "") {
            speak("Which city's weather would you like me to check, sir?");
        } else {
            window.open(`https://google.com{encodeURIComponent(city)}`, "_blank");
            speak(`Checking the current weather forecast for ${city}...`);
        }
    }

	else if (message.includes("ip address") || message.includes("my ip")) {
        speak("Fetching your network protocol details now, sir.");
        
        fetch('https://ipify.org')
            .then(response => response.json())
            .then(data => {
                // Splits the IP so Kevin reads the numbers clearly instead of as one big number
                const readableIp = data.ip.split('.').join('. ');
                speak(`Your public IP address is ${readableIp}`);
            })
            .catch(error => {
                speak("I encountered an error trying to locate your IP address, sir.");
            });
    }
		
    // Latest News Updates (e.g., "latest news")
    else if(message.includes("news")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google News to fetch the latest global headlines for you, sir.");
    }

    // Search 3D items on Sketchfab using "3d search" or "image search"
    else if(message.includes("3d search") || message.includes("image search")) {
        const search3d = message.replace("3d search", "").replace("image search", "").trim();
        window.open(`https://sketchfab.com{encodeURIComponent(search3d)}`, "_blank");
        speak(`Searching Sketchfab for ${search3d}...`);
    }

    // Search YouTube using "youtube [query]"
    else if(message.includes("youtube ")) {
        const videoQuery = message.replace("youtube ", "").trim();
        window.open(`https://youtube.com{encodeURIComponent(videoQuery)}`, "_blank");
        speak(`Searching YouTube for ${videoQuery}...`);
    }

    // Dynamic Website Opener (e.g., "open github")
    else if(message.startsWith("open ")) {
        const website = message.replace("open ", "").trim();
        window.open(`https://www.${website}.com`, "_blank");
        speak(`Opening ${website}...`);
    }
		
    else if(message.includes('how are you') || message.includes('how are you today')){
        speak("I am doing well sir, thank you for asking")
    }

    else if(message.includes('what is your name') || message.includes('who are you')){
        speak("My full name is K.E.V.I.N. which stands for Knowledgeable Electronic Virtual Intelligent Navigator. How can I assist you today?")
    }

    else if(message.includes('i feel sleepy') || message.includes('i feel lazy')){
        speak("i know the feeling sir you left the system on for many hours")
    }

    else if(message.includes('kevin you up')){
        speak("for you sir, always")
    }

    // Handle multiple or general questions (e.g., "What is agriculture and who is Einstein?")
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are') || message.includes('and')) {
        if(message.includes(' and ')) {
            const questions = message.split(' and ');
            speak(`Answering multiple questions for you, sir.`);
            
            questions.forEach((q) => {
                let cleanQ = q.trim();
                if(cleanQ.length > 3) {
                    window.open(`https://google.com{encodeURIComponent(cleanQ)}&as_qdr=all`, "_blank");
                }
            });
        } else {
            window.open(`https://google.com{encodeURIComponent(message)}`, "_blank");
            speak("This is what I found regarding your question, sir.");
        }
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://wikipedia.org{encodeURIComponent(message.replace("wikipedia", "").trim())}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else {
        window.open(`https://google.com{encodeURIComponent(message)}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
