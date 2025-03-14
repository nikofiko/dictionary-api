import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Input from './components/Input';
import AudioPlayer from './components/AudioPlayer';
import icon from './assets/images/icon-new-window.svg'

function App() {
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchValue, setSearchValue] = useState("");
  const [audioUrl, setAudioUrl] = useState(null); 

  useEffect(() => {
    if (!searchValue) return;

    setError(null);
    setLoading(true);
    
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        setData(data);

        const firstAudioUrl = data[0]?.phonetics.find((phonetic) => phonetic.audio)?.audio;
        setAudioUrl(firstAudioUrl || null);

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const toggleDarkMode = () => {
    const isDark = document.body.classList.contains('dark');
    
    document.body.classList.toggle('dark');
    
    localStorage.setItem('darkMode', !isDark);
  };
  
  const initializeDarkMode = () => {
    const savedMode = localStorage.getItem('darkMode');
    
    if (savedMode === 'true') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <Input onSearch={handleSearch} />

      {error ? (
        <div className="flex flex-col items-center text-center py-10">
          <h2 className='text-[64px]'>😕</h2>
          <h2 className="text-[20px] font-bold pt-[44px] dark:text-white">No Definitions Found</h2>
          <p className="lg:max-w-[736px] max-w-[340px] text-gray pt-[24px]">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
        </div>
      ) : (
        <div className="px-3 lg:px-[351px] pt-[45px] dark:bg-blackest">
          {data &&
            data.map((entry, index) => (
              <div key={index}>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-[32px] lg:text-[64px] font-bold dark:text-white">{entry.word}</h2>
                    <p className="text-[24px] text-violet">{entry.phonetic}</p>
                  </div>
                  {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
                </div>

                {entry.meanings.map((meaning, i) => (
                  <div key={i}>
                    <p className="font-bold text-[24px] py-[40px] dark:text-white">{meaning.partOfSpeech}</p>
                    <p className="text-[18px] text-gray pb-[25px]">Meaning</p>
                    <ul className="text-[14px] lg:text-[16px] list-disc px-[34px] flex flex-col gap-[13px]">
                      {meaning.definitions.map((definition, j) => (
                        <li className="dark:text-white" key={j}>
                          {definition.definition}
                          {definition.example && <p className="text-gray">{`"${definition.example}"`}</p>}
                        </li>
                      ))}
                    </ul>

                    {meaning.synonyms && meaning.synonyms.length > 0 && (
                      <div className="flex gap-[22px] items-center pt-[40px]">
                        <p className="text-[18px] text-gray">Synonyms</p>
                        <p className="text-violet font-bold">{meaning.synonyms.join(', ')}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex items-center pt-[40px] pb-[20px]">
                  <p className="text-[14px] text-gray pr-[20px]">Source</p>
                  <a className="text-[14px] underline dark:text-white" href={entry.sourceUrls?.[0]}>
                    {entry.sourceUrls?.[0]}
                  </a>
                  <div>
                    <img className="pl-2" src={icon} alt="" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default App;