document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultSection = document.getElementById('result-section');
    const statusBadge = document.getElementById('status-badge');
    const explanationText = document.getElementById('explanation-text');
    const loader = document.querySelector('.loader');
    const btnText = document.querySelector('.btn-text');

    // Auto-resize textarea
    textInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    const setLoader = (isLoading) => {
        if (isLoading) {
            btnText.classList.add('loading');
            loader.classList.remove('hidden');
            analyzeBtn.disabled = true;
            analyzeBtn.style.opacity = '0.8';
        } else {
            btnText.classList.remove('loading');
            loader.classList.add('hidden');
            analyzeBtn.disabled = false;
            analyzeBtn.style.opacity = '1';
        }
    };

    const updateUIResult = (status, explanation) => {
        // Reset classes
        statusBadge.className = 'badge';
        
        // Ensure status mapping handles cases cleanly
        const mappedStatus = status.toLowerCase().trim();
        let displayStatus = status;

        if (mappedStatus.includes('true')) {
            statusBadge.classList.add('true');
            displayStatus = 'True';
        } else if (mappedStatus.includes('false')) {
            statusBadge.classList.add('false');
            displayStatus = 'False';
        } else if (mappedStatus.includes('misleading')) {
            statusBadge.classList.add('misleading');
            displayStatus = 'Misleading';
        } else if (mappedStatus.includes('unverified')) {
            statusBadge.classList.add('unverified');
            displayStatus = 'Unverified';
        } else {
            statusBadge.classList.add('error');
            displayStatus = 'Error';
        }

        statusBadge.textContent = displayStatus;
        explanationText.textContent = explanation;
        resultSection.classList.remove('hidden');
        
        // Smooth scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    analyzeBtn.addEventListener('click', async () => {
        const textToAnalyze = textInput.value.trim();

        if (!textToAnalyze) {
            textInput.focus();
            // Highlight empty input with quick animation
            textInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                textInput.style.borderColor = '';
            }, 1000);
            return;
        }

        setLoader(true);
        resultSection.classList.add('hidden'); // Hide previous result

        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: textToAnalyze })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.explanation || 'Something went wrong');
            }

            if (data.status && data.explanation) {
                updateUIResult(data.status, data.explanation);
            } else {
                throw new Error('Invalid response structure from server');
            }

        } catch (error) {
            console.error('Analysis error:', error);
            updateUIResult('Error', error.message || 'Failed to connect to the server. Please make sure the backend is running properly and API keys are set.');
        } finally {
            setLoader(false);
        }
    });

    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        textInput.style.height = '180px'; // Reset height
        resultSection.classList.add('hidden');
        textInput.focus();
    });
});
