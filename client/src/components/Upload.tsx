'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, AlertCircle, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
}

export default function FileUpload({
  onFilesSelected,
  maxFiles = 5,
  maxSizeInMB = 5,
  acceptedFileTypes = ['image/*', 'application/pdf'],
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const validateFile = useCallback(
    (file: File) => {
      if (maxSizeInMB && file.size > maxSizeInMB * 1024 * 1024) {
        return `File ${file.name} is too large. Maximum size is ${maxSizeInMB}MB.`;
      }
      if (
        acceptedFileTypes &&
        !acceptedFileTypes.some(type => file.type.match(type))
      ) {
        return `File ${file.name} is not an accepted file type.`;
      }
      return null;
    },
    [maxSizeInMB, acceptedFileTypes]
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    setError(null);
    const validFiles = newFiles.filter(file => !validateFile(file));
    if (validFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    if (validFiles.length < newFiles.length) {
      setError('Some files were not added due to invalid type or size.');
    }
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    onFilesSelected([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      onFilesSelected(newFiles);
      return newFiles;
    });
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div
        className={`relative p-6 mt-4 border-2 border-dashed rounded-lg ${
          dragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type='file'
          multiple
          onChange={handleChange}
          accept={acceptedFileTypes.join(',')}
          className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          aria-label='File upload'
        />
        <div className='text-center'>
          <Upload className='mx-auto h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-600'>
            Drag &apos;n&apos; drop files here, or click to select files
          </p>
          <p className='mt-1 text-xs text-gray-500'>
            {`Up to ${maxFiles} files, max ${maxSizeInMB}MB each`}
          </p>
        </div>
      </div>

      {error && (
        <div className='mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded'>
          <AlertCircle className='inline mr-2' size={16} />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <ul className='mt-4 space-y-2'>
          {files.map((file, index) => (
            <li
              key={index}
              className='flex items-center justify-between p-2 bg-transparent rounded'
            >
              <div className='flex items-center'>
                <FileIcon className='mr-2' size={16} />
                <span className='text-sm truncate'>{file.name}</span>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
              >
                <X className='h-4 w-4' />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
