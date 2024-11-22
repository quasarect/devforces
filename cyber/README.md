# Blockchain Security Education Platform

A comprehensive platform for learning blockchain security, smart contract auditing, and crypto scam prevention with hands-on labs and verifiable on-chain certificates.

## 🎯 Overview

Our platform provides an interactive learning experience combining theoretical knowledge with practical exercises in blockchain security. Students can earn verifiable certificates stored on IPFS and recorded on-chain upon completing modules.

### Key Features

- 🔍 Interactive Smart Contract Security Analysis
- 🛠️ Hands-on Lab Environment with AWS-based VMs
- 🎓 Comprehensive Crypto Scam Education
- 📜 On-chain Certification System
- 🔗 IPFS-based Certificate Storage
- ✅ Interactive Quizzes and Assessments

## 🏗️ Architecture

```
/
├── client/                 # Next.js frontend application
├── server/                 # Node.js API server
├── model/                  # Model to detect issues in the Code (Lab section)
└── model-server/           # python - flask server
```

## 🎓 Learning Modules

### Module 1: Smart Contract Security Fundamentals

- Introduction to Solidity security
- Common vulnerabilities analysis
- Hands-on code review exercises
- Interactive security quiz

### Module 2: Lab Environment

- AWS-based VM setup
- Development environment configuration
- Testing and debugging tools
- Security analysis tools integration

### Module 3: Crypto Scams Education

1. Introduction to Crypto Scams

   - Video lectures
   - Case studies
   - Prevention strategies
   - Interactive examples

2. Common Scam Types

   - Phishing attacks
   - Rugpulls
   - Honeypots
   - Social engineering

3. Assessment and Quizzes
   - Module-specific tests
   - Practical exercises
   - Real-world scenario analysis

## 🛠️ Technical Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Smart Contracts**: Solidity, Hardhat
- **Storage**: IPFS via Pinata
- **Backend**: Node.js, Express
- **Lab Environment**: AWS EC2, Docker
- **Testing**: Chai, Mocha
- **Blockchain**: Polygon Network

## 📋 Prerequisites

- Node.js >= 16.x
- AWS Account for lab environment
- MetaMask wallet
- Git

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Hack2Future-IIIT-Dharwad/CipherChasers_AjayBhakar.git
cd CipherChasers_AjayBhakar
```

2. Install dependencies:

```bash
cd client
npm install
```

3. Start the development server:

```bash
npm run dev
```

3. Start the development backend server:

```bash
cd ../server
npm run dev
```

## 📜 Certification System

### Certificate Generation Process

1. Complete all required modules
2. Pass assessment tests
3. Generate certificate with unique identifiers
4. Upload to IPFS via Pinata
5. Record certificate hash on-chain
6. Mint NFT certificate to student's wallet

### Smart Contract Structure

```solidity
contract CertificationSystem {
    struct Certificate {
        address student;
        string ipfsHash;
        uint256 timestamp;
        uint256 moduleId;
        bool verified;
    }

    mapping(bytes32 => Certificate) public certificates;
    // Additional contract functionality...
}
```

## 📊 Assessment Criteria

| Module                  | Passing Score | Requirements           |
| ----------------------- | ------------- | ---------------------- |
| Smart Contract Security | 80%           | Complete lab exercises |
| Lab Environment         | Pass/Fail     | Setup completion       |
| Crypto Scams            | 85%           | Quiz completion        |


## Technologies Used
- Next.js
- Node.js
- TailwindCSS
- Solidity
- Python
- AWS (EC2)

