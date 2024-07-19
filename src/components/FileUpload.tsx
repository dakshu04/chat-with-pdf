'use client'
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {"application/pdf" : [".pdf"] },
    maxFiles:1,
    onDrop: async (acceptedFile) => {
      console.log(acceptedFile);
      const file = acceptedFile[0]
      if(file.size > 10 * 1024 * 1024) {
        //bigger than 10Mb
        alert('please upload a smaller file')
        return
      }

      try{
        const data = await uploadToS3(file);
        console.log('data', data)
      } catch (error) {
        console.log(error)
      }
      
    }
  });

  return (
    <div className="p-2 bg-white rounded-xl shadow-md">
      <div 
        {...getRootProps({
          className: "border-dashed border-2 border-gray-300 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <Inbox className='w-10 h-10  text-blue-500'/>
        <p className='mt-2 text-sum text-slate-400 '>Drop your PDF here</p>
      </div>
    </div>
  );
}

export default FileUpload;
