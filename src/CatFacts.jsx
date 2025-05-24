import axios from 'axios';
import CatLogo from './assets/cat.svg'
import './CatFacts.css';
import React, { useState, useEffect } from 'react';

// Alex

function CatFacts() {
    // Store the cat fact text
    const [catFact, setCatFact] = useState('');

    // Store loading status
    const [isLoading, setIsLoading] = useState(false);

    function generateCatFact() {
        // Set loading state to true
        setIsLoading(true);

        axios.get('https://catfact.ninja/fact')
            .then(response => {
                // When request succeeds save the cat fact
                console.log('Data received from API:', response.data);
                setCatFact(response.data.fact);

                // Request completed set loading to false
                setIsLoading(false);
            })
            .catch(error => {
                // If request fails, set lading to false
                console.error('Fetching cat fact error:', error);
                setCatFact('Unable to fetch, please try later.');
                setIsLoading(false);
            });
    }

    // Automatically fetch a cat fact when the page loads
    useEffect(() => {
        console.log('Page loaded, fetching the first cat fact...');
        generateCatFact();
    }, []); // Empty array means this effect runs only once 

    return (
        <div className="App">
            <div className='catFactsText'>
                {/* Display different contents on current state! */}
                {isLoading ? (
                    "Loading..."
                ) : catFact ? (
                    catFact
                ) : (
                    "Click button to fetch a cat fact！"
                )}
            </div>
            <div>
                <button onClick={generateCatFact} className="catFactBtn">
                    Click me for a cat fact!
                </button>
            </div>
            <div>
                <img src={CatLogo} className="catFactImg" />
            </div>
        </div>
    )
}

export default CatFacts
