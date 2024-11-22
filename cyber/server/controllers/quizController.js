const quizzes = {
    moduleSpecific: [
        {
            id: 1,
            title: 'Cloud Forensics Quiz',
            questions: [
                { question: 'What is cloud forensics?', options: ['Option A', 'Option B'], answer: 'Option A' },
                { question: 'What tool is commonly used in cloud forensics?', options: ['Tool A', 'Tool B'], answer: 'Tool A' }
            ]
        },
        {
            id: 2,
            title: 'Cryptocurrency Investigations Quiz',
            questions: [
                { question: 'What is a blockchain?', options: ['Option A', 'Option B'], answer: 'Option A' },
                { question: 'What is Bitcoin?', options: ['Option A', 'Option B'], answer: 'Option B' }
            ]
        }
    ],
    dailyGeneral: [
        {
            id: 1,
            question: 'What is cybercrime?',
            options: ['Option A', 'Option B'],
            answer: 'Option A'
        },
        {
            id: 2,
            question: 'What does GDPR stand for?',
            options: ['Option A', 'Option B'],
            answer: 'Option B'
        }
    ]
};

exports.getModuleSpecificQuizzes = (req, res) => {
    res.json(quizzes.moduleSpecific);
};
exports.getDailyGeneralQuizzes = (req, res) => {
    res.json(quizzes.dailyGeneral);
};

