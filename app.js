const btn = document.querySelector('.talk')
const content = document.querySelector('.content')
const chatContainer = document.getElementById('chatContainer');

let chatHistory = [];
let availableVoices = [];

const contacts = {
    mom: "17785511669",
    dad: "12365912494",
    fimi: "2349096403929",
    tutor: "2347040160012",
	nosa: "2347049707929"
};

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

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to use Tom
    const tomVoice = availableVoices.find(
        voice => voice.name === "Tom"
    );

    if (tomVoice) {
        utterance.voice = tomVoice;
    }

    utterance.rate = 0.90;
    utterance.pitch = 0.90;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);

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
    speak("I am Kevin, your virtual artificial intelligence and i am here to assist you with a variety of task with the best i can, 24 hours a day, 7 days a week. How may i help you today?")
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
	else if(message.includes('buddy') || message.includes('pal')){
        speak("Yes Sir");
    }
	else if(message.includes('i need help') || message.includes('i need your help')){
        speak("sir what do you need help with");
    }
	else if(message.includes('thanks buddy') || message.includes('thank you')){
        speak("sir your welcome");
    }
	else if(message.includes('who made you') || message.includes('who created you')){
        speak("Nimi Orimolade, an extra-ordinary person , who has a passion for Robotics, Artificial Intelligence,Machine Learning and Math ,he is very co-operative ,If you are facing any problem regarding Nimi Orimolade, He will be glad to help you");
    }
	else if (message.includes("what can you do") ||message.includes("help") ||message.includes("list commands") ||message.includes("show commands")){
        speak("Certainly sir. I can greet you, open Google, YouTube, Facebook and other websites, solve calculations, tell programming jokes, check the weather, find your public IP address, search today's latest news, search nearby places, search Google Maps, provide directions between locations, find your current location, search Sketchfab for 3D models, search Spotify for music, search YouTube for videos, answer questions using Google, search Wikipedia, tell you the current time and date, open the calculator, and have simple conversations with you. Just tell me what you need, sir.");
    }
		
	else if(message.includes("why you came to this world")){
        speak("Thanks to Nimi. further it is a secret")
    }
	else if(message.includes("are you evil")){
        speak("Sir if i was evil you would have created me with evil intentions and have taken over humans forever")
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
		
	else if (message.includes("calculate")) {

    let equation = message
        .replace("calculate", "")
        .replace(/plus/gi, "+")
        .replace(/minus/gi, "-")
        .replace(/times/gi, "*")
        .replace(/multiplied by/gi, "*")
        .replace(/divided by/gi, "/")
        .replace(/over/gi, "/")
        .replace(/into/gi, "*")
        .replace(/\bx\b/gi, "*")      // only replaces x by itself
        .replace(/\s+/g, "");

    try {

        // Only allow numbers and operators
        if(!/^[0-9+\-*/().]+$/.test(equation)){
            throw new Error("Invalid equation");
        }

        const result = Function('"use strict"; return (' + equation + ')')();

        if(!isFinite(result)){
            speak("That calculation is not valid, sir.");
        }
        else{
            speak(`The answer is ${result}`);
        }

    }
    catch(err){
        speak("Sorry sir, I couldn't calculate that.");
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
            window.open(`https://www.google.com/search?q=weather+${encodeURIComponent(city)}`, "_blank");
            speak(`Checking the current weather forecast for ${city}...`);
        }
    }

	else if (message.includes("ip address") || message.includes("my ip")) {
        speak("Fetching your network protocol details now, sir.");
        
        fetch('https://api.ipify.org?format=json')
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
		
    else if (message.includes("news") ||message.includes("latest news") ||message.includes("today's news") ||message.includes("todays news")) {

    window.open("https://www.google.com/search?q=latest+news+today", "_blank");

    speak("Searching for today's latest news, sir.");
}
		
	else if(message.startsWith("message ")){

    const command = message.replace("message", "").trim();

    // Only the contact name was spoken
    if(!command.includes(" ")){

        const name = command.toLowerCase();

        if(contacts[name]){

            window.open(`https://wa.me/${contacts[name]}`, "_blank");

            speak(`Opening WhatsApp chat with ${name}.`);

        }else{

            speak("I don't know that contact.");

        }

        return;
    }

    // Contact name + message
    const firstSpace = command.indexOf(" ");

    const name = command.substring(0, firstSpace).toLowerCase();
    const text = command.substring(firstSpace + 1);

    if(contacts[name]){

        window.open(`https://wa.me/${contacts[name]}?text=${encodeURIComponent(text)}`, "_blank");

        speak(`Opening WhatsApp chat with ${name}.`);

    }else{

        speak("I don't know that contact.");

    }
}
		
	else if(message.includes("near me")){

    let place = message.replace("near me", "").trim();

    window.open(`https://www.google.com/maps/search/${encodeURIComponent(place)}+near+me`, "_blank");

    speak(`Searching for ${place} near you.`);
}
		
	else if(message.startsWith("maps ")){

    let place = message.replace("maps", "").trim();

    window.open(`https://www.google.com/maps/search/${encodeURIComponent(place)}`, "_blank");

    speak(`Searching Google Maps for ${place}.`);
}
	else if (message.includes(" from ") && message.includes(" to ")) {
    const match = message.match(/from (.*?) to (.*)/i);

    if (match) {
        const origin = match[1].trim();
        const destination = match[2].trim();

        window.open(`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`, "_blank");

        speak(`Showing directions from ${origin} to ${destination}.`);
    }
}

	else if (message.includes("where am i")){

    navigator.geolocation.getCurrentPosition(async function(position){

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const url =`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

        const response = await fetch(url);
        const data = await response.json();

        speak(`You are currently at ${data.display_name}`);

        window.open(`https://www.google.com/maps?q=${lat},${lng}`);

    });
}

    // Search 3D items on Sketchfab using "3d search" or "image search"
    else if(message.includes("3d search") || message.includes("image search")) {
        const search3d = message.replace("3d search", "").replace("image search", "").trim();
        window.open(`https://sketchfab.com/search?q=${encodeURIComponent(search3d)}`, "_blank");
        speak(`Searching Sketchfab for ${search3d}...`);
    }

	else if (message.includes("directions from") ||message.includes("navigate from") ||message.includes("route from")) {

    let text = message
        .replace("directions from", "")
        .replace("navigate from", "")
        .replace("route from", "")
        .trim();

    if (text.includes(" to ")) {

        let [origin, destination] = text.split(" to ");

        origin = origin.trim();
        destination = destination.trim();

        window.open(`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`, "_blank");

        speak(`Showing directions from ${origin} to ${destination}.`);

    } else {
        speak("Please say, directions from one place to another.");
    }
}

	else if (message.includes("play")){

    let song = message
        .replace("play", "")
        .replace("on spotify", "")
        .trim();

    if (song === "") {
        window.open("https://open.spotify.com/", "_blank");
        speak("Opening Spotify.");
    } else {
        window.open(`https://open.spotify.com/search/${encodeURIComponent(song)}`, "_blank");
        speak(`Searching Spotify for ${song}.`);
    }
}

    // Search YouTube using "youtube [query]"
    else if(message.includes("youtube ")) {
    const videoQuery = message.replace("youtube ", "").trim();
    
    // FIXED: Added the proper search path '/results?search_query=' and the missing '$'
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(videoQuery)}`, "_blank");
    
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
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(cleanQ)}`, "_blank");
                }
            });
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
            speak("This is what I found regarding your question, sir.");
        }
    }
	else if (message.includes("google ") || message.includes("search google for ") || message.includes("google search ")) {

	    let search = message;
	
	    search = search.replace("search google for", "");
	    search = search.replace("google search", "");
	    search = search.replace("google", "");
	    search = search.trim();
	
	    if (!search) {
	        speak("What would you like me to search for?");
	    } else {
	        speak(`Searching Google for ${search}`);
	
	        window.open(
	            `https://www.google.com/search?q=${encodeURIComponent(search)}`,
	            "_blank"
	        );
	    }
	}

    else if(message.includes('wikipedia')) {
        const topic = message.replace("wikipedia", "").trim();
		window.open(
    `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(topic)}`, "_blank");
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
        window.open(
    `https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
