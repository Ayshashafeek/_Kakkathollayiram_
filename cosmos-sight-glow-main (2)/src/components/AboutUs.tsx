import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gradient-to-b from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4">Why Such A Project?</h1>
      <p className="max-w-2xl text-lg leading-relaxed mb-6 font-serif">
         We’re chill dudes <span className="text-blue-400 font-semibold"> that kakkathollayiram duo!,</span> 
          yep, just two wild souls from the TinkerHub ‘Useless Project’ gang! Armed with starry dreams 
         we tackled the epic quest to count sky stars. Back then, it was a hilarious flop—two of us scrambling, 
         with some friends throwing supportive cheers and others tossing cheeky mocking gazes. No insults, just love!
         But now? We’ve teamed up again, turned chaos into cosmic magic, and built this webpage! Snap a sky pic, and 
         let these two star-crazy creators count those twinkles with you!"
      </p>
      <p className="max-w-2xl text-lg leading-relaxed mb-6">
        From “What if we could count stars?” to “Whoa, we actually did it!”—that’s our glow-up story!  
        So next time you look up, remember us—Aysha and Devinandha-two cosmic clowns who turned a silly dream into this webpage!  
        Now go snap some sky magic! ✨
      </p>
      <div className="mt-8 text-center">
      <p className="text-xl font-semibold mb-2">Connect with us:</p>
      <div className="flex justify-center space-x-6">
  <a
    href="https://www.linkedin.com/in/aysha-shafeek-m-m-276643331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Replace with Aysha's LinkedIn
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-300 underline"
  >
    Aysha
  </a>
  <a
    href="https://www.linkedin.com/in/devinandha-v-r-5ab496337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" // Replace with Devinandha's LinkedIn
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:text-blue-300 underline"
  >
    Devinandha
  </a>
  </div>
</div>
<br></br>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md hover:bg-white/20 text-white font-medium transition duration-300"
      >
        
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default AboutUs;
