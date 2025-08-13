// Mock service for local development
export const analyzeResume = async (file, jobDescription = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    sentiment: {
      sentiment: 'POSITIVE',
      confidence: 0.85
    },
    entities: [
      { text: 'John Doe', type: 'PERSON', confidence: 0.95 },
      { text: 'Software Engineer', type: 'TITLE', confidence: 0.88 },
      { text: 'React', type: 'OTHER', confidence: 0.92 }
    ],
    keyPhrases: [
      { text: 'software development', confidence: 0.89 },
      { text: 'team collaboration', confidence: 0.76 },
      { text: 'problem solving', confidence: 0.82 }
    ],
    resumeScore: 85,
    jobMatch: {
      overall: 78,
      skills: 82,
      experience: 75,
      education: 80
    },
    skillsGap: {
      missing: ['AWS', 'Docker'],
      present: ['React', 'JavaScript', 'Node.js'],
      recommendations: ['Consider adding cloud platform experience']
    },
    atsOptimization: {
      score: 72,
      issues: ['Missing keywords', 'Format could be improved'],
      suggestions: ['Add more industry keywords', 'Use standard section headers']
    },
    score: 85,
    suggestions: [
      'Add more quantifiable achievements',
      'Include relevant keywords for the target role'
    ]
  };
};

export const getResumeVersions = async (userId) => {
  return { versions: [] };
};

export const saveResumeVersion = async (versionData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, id: Date.now() };
};