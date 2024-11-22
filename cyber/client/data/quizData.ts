export const quizData = [
  {
    level: "Beginner Level Questions",
    questions: [
      {
        id: 1,
        question:
          "Which of the following is NOT a feature of blockchain technology?",
        options: [
          "Immutability",
          "Decentralization",
          "Centralized control",
          "Transparency",
        ],
        correctAnswer: "C",
        explanation:
          "Blockchain is decentralized and transparent, with data that is immutable and cannot be easily changed.",
      },
      {
        id: 2,
        question:
          "What role does the private key play in a cryptocurrency wallet?",
        options: [
          "It publicly displays transaction history.",
          "It is used to generate the wallet address.",
          "It provides secure access to manage funds.",
          "It identifies the type of cryptocurrency in the wallet.",
        ],
        correctAnswer: "C",
        explanation:
          "The private key grants access to the wallet, allowing the user to sign and authorize transactions.",
      },
      {
        id: 3,
        question:
          "Which factor determines the speed of a cryptocurrency transaction?",
        options: [
          "The size of the wallet balance.",
          "The network's current congestion and transaction fees.",
          "The wallet provider’s policies.",
          "The number of addresses involved.",
        ],
        correctAnswer: "B",
        explanation:
          "Higher transaction fees and lower network congestion generally lead to faster processing times.",
      },
      {
        id: 4,
        question: "What is the purpose of a public key in cryptocurrency?",
        options: [
          "To generate private keys.",
          "To verify the ownership of a wallet.",
          "To identify the transaction fee.",
          "To sign transactions.",
        ],
        correctAnswer: "B",
        explanation:
          "The public key, often transformed into a wallet address, allows others to send cryptocurrency to a specific wallet.",
      },
    ],
  },
  {
    level: "Intermediate Level Questions",
    questions: [
      {
        id: 1,
        question:
          "When reviewing a wallet's transaction history, what does a high frequency of small transactions potentially indicate?",
        options: [
          "Standard user activity.",
          "A possible attempt to evade detection by breaking large transactions into smaller ones (known as “smurfing”).",
          "Low wallet activity.",
          "Regular purchase of goods and services.",
        ],
        correctAnswer: "B",
        explanation:
          "Breaking a large transaction into many small ones is a tactic used to avoid detection in financial investigations.",
      },
      {
        id: 2,
        question: "What is a 'dusting attack' in cryptocurrency?",
        options: [
          "A large transaction with an unusually high fee.",
          "A small amount of cryptocurrency sent to many addresses for tracking.",
          "The process of consolidating small amounts of crypto.",
          "An attack that causes a wallet to lose funds.",
        ],
        correctAnswer: "B",
        explanation:
          "In a dusting attack, tiny amounts of cryptocurrency are sent to wallets to trace addresses and identify wallet owners.",
      },
      {
        id: 3,
        question:
          "Which of the following could indicate that a wallet is being used for illicit purposes?",
        options: [
          "Consistent transactions with well-known exchanges.",
          "High volumes of transactions with addresses linked to darknet markets.",
          "Periodic large deposits held over time.",
          "Low overall transaction volume.",
        ],
        correctAnswer: "B",
        explanation:
          "Transactions associated with darknet markets can indicate potential illicit activity, prompting further investigation.",
      },
      {
        id: 4,
        question:
          "What is the significance of transaction confirmations on the blockchain?",
        options: [
          "Confirmations show the transaction fees.",
          "Confirmations provide a way to reverse the transaction.",
          "Confirmations secure and validate the transaction, making it irreversible.",
          "Confirmations indicate the transaction's encryption strength.",
        ],
        correctAnswer: "C",
        explanation:
          "Confirmations solidify a transaction’s place on the blockchain, making it more secure and irreversible with each confirmation.",
      },
    ],
  },
  {
    level: "Advanced Level Questions",
    questions: [
      {
        id: 1,
        question:
          "Which method is most effective for linking transactions to specific wallets or clusters of activity?",
        options: [
          "Simple counting of transactions.",
          "Analyzing timestamp patterns.",
          "Clustering based on transaction and address patterns.",
          "Encrypting wallet addresses.",
        ],
        correctAnswer: "C",
        explanation:
          "Clustering techniques help investigators group addresses with similar transaction patterns, aiding in identifying potential illicit activity.",
      },
      {
        id: 2,
        question:
          "In decentralized finance (DeFi) platforms, which is a primary risk factor for users?",
        options: [
          "Low transaction fees.",
          "High mining difficulty.",
          "Vulnerabilities in smart contracts.",
          "Exchange rate fluctuations.",
        ],
        correctAnswer: "C",
        explanation:
          "Smart contracts on DeFi platforms can contain coding errors or vulnerabilities that attackers exploit to steal funds.",
      },
      {
        id: 3,
        question:
          "What can a rapid sequence of transactions from a single address potentially indicate?",
        options: [
          "Regular wallet activity.",
          "Address consolidation.",
          "An attempt at transaction obfuscation.",
          "Wallet inactivity.",
        ],
        correctAnswer: "C",
        explanation:
          "Rapid and frequent transfers can indicate obfuscation efforts, commonly used to conceal transaction origins.",
      },
      {
        id: 4,
        question:
          "Why is a multi-signature (multisig) wallet more secure than a standard wallet?",
        options: [
          "It stores cryptocurrency offline.",
          "It requires multiple private keys for transaction authorization.",
          "It uses only public keys for transactions.",
          "It allows unlimited access to any user.",
        ],
        correctAnswer: "B",
        explanation:
          "Multisig wallets need authorization from multiple private keys, making unauthorized transactions much harder.",
      },
    ],
  },
  {
    level: "Expert Level Questions",
    questions: [
      {
        id: 1,
        question:
          "Which factor is essential for creating accurate clusters in machine learning-based blockchain analysis?",
        options: [
          "Random address sampling.",
          "Transaction amounts alone.",
          "Patterns of shared wallet addresses and transaction behaviors.",
          "Total transaction count only.",
        ],
        correctAnswer: "C",
        explanation:
          "Shared wallet addresses and behavioral patterns are crucial for effective clustering and anomaly detection.",
      },
      {
        id: 2,
        question:
          "What challenge arises in regulatory compliance when tracking cryptocurrency transactions across jurisdictions?",
        options: [
          "All jurisdictions use the same AML regulations.",
          "Privacy coins complicate cross-border tracking.",
          "Blockchains automatically share data with all regulators.",
          "Only centralized exchanges need to be monitored.",
        ],
        correctAnswer: "B",
        explanation:
          "Privacy coins and varying AML regulations across regions make cross-border transaction tracking difficult.",
      },
      {
        id: 3,
        question:
          "In a forensic investigation, what is the purpose of a 'chain of custody' document?",
        options: [
          "To display the cryptocurrency’s exchange rate.",
          "To ensure evidence is handled securely and reliably.",
          "To link cryptocurrency to fiat currency.",
          "To store wallet addresses.",
        ],
        correctAnswer: "B",
        explanation:
          "A chain of custody ensures that evidence remains intact, with documented handling and secure storage for legal proceedings.",
      },
      {
        id: 4,
        question:
          "Which technology is often applied in anomaly detection for cryptocurrency transactions to detect unusual patterns?",
        options: [
          "Simple data tables",
          "Machine learning models, such as neural networks",
          "PDF documents",
          "Address lists",
        ],
        correctAnswer: "B",
        explanation:
          "Machine learning models, particularly neural networks and clustering algorithms, are effective in detecting unusual transaction patterns in blockchain data.",
      },
    ],
  },
];
