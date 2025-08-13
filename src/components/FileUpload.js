import React, { useState, useRef } from 'react';
import { Upload, Loader2, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { analyzeResume, saveResumeVersion } from '../services/awsService';
import { useUser } from '@clerk/clerk-react';

const FileUpload = ({ onAnalysisStart, onAnalysisComplete, isAnalyzing, onVersionSaved }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, success, error
  const fileInputRef = useRef(null);
  const { user } = useUser();

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/pdf' || file.type === 'text/plain')) {
      setSelectedFile(file);
      setUploadStatus('success');
    } else if (file) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    onAnalysisStart();
    
    try {
      const analysis = await analyzeResume(selectedFile);
      onAnalysisComplete(analysis);
      
      // Save resume version after successful analysis
      if (analysis && user) {
        try {
          const versionData = {
            userId: user.id,
            name: selectedFile.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            uploadDate: new Date().toISOString(),
            score: analysis.resumeScore || 0,
            atsScore: analysis.atsOptimization?.score || 0,
            jobMatch: analysis.jobMatch?.overall || 0,
            keywordCount: analysis.keyPhrases?.length || 0,
            fileSize: selectedFile.size,
            fileType: selectedFile.type,
            improvements: analysis.improvements || []
          };
          
          await saveResumeVersion(versionData);
          if (onVersionSaved) {
            onVersionSaved(versionData);
          }
        } catch (versionError) {
          console.error('Failed to save resume version:', versionError);
          // Don't fail the analysis if version saving fails
        }
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      setUploadStatus('error');
      onAnalysisComplete(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (uploadStatus === 'success') return <CheckCircle size={48} className="upload-icon success" />;
    if (uploadStatus === 'error') return <AlertCircle size={48} className="upload-icon error" />;
    return <Upload size={48} className="upload-icon" />;
  };

  const getUploadText = () => {
    if (uploadStatus === 'error') return 'Invalid file type. Please select a PDF or TXT file.';
    if (selectedFile) return selectedFile.name;
    return 'Drop your resume here or click to browse';
  };

  const getUploadSubtext = () => {
    if (uploadStatus === 'error') return 'Supported formats: PDF, TXT';
    if (selectedFile) return `${formatFileSize(selectedFile.size)} • Ready to analyze`;
    return 'Supports PDF and TXT files • Max size 10MB';
  };

  return (
    <div className="upload-container">
      <div
        className={`upload-zone ${dragOver ? 'dragover' : ''} ${uploadStatus}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        {getFileIcon()}
        <div className={`upload-text ${uploadStatus}`}>
          {getUploadText()}
        </div>
        <div className={`upload-subtext ${uploadStatus}`}>
          {getUploadSubtext()}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          style={{ display: 'none' }}
        />
      </div>
      
      {selectedFile && uploadStatus === 'success' && (
        <div className="file-preview">
          <div className="file-info">
            <FileText size={20} className="file-icon" />
            <div className="file-details">
              <div className="file-name">{selectedFile.name}</div>
              <div className="file-meta">
                {formatFileSize(selectedFile.size)} • {selectedFile.type.includes('pdf') ? 'PDF Document' : 'Text File'}
              </div>
            </div>
          </div>
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <div className="loading">
                <Loader2 size={20} />
                Analyzing Resume...
              </div>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;