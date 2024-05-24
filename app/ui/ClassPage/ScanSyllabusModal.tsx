'use client';

import { useState } from 'react';
import BaseModal from '../BaseModal';
import axios from 'axios';
import { JSONTree } from 'react-json-tree';
import ClassPreview from './ClassPreview';
import { useClassContext } from '@/app/context/class';

export default function ScanSyllabusModal() {
  const { validateClassJSON, setCls, setAssignmentTypes } = useClassContext();
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(undefined);
  const [waiting, setWaiting] = useState<boolean>(false);

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      alert('Please upload a file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      setWaiting(true);
      const res = await axios.post(
        'https://us-east4-glowing-reserve-424315-m8.cloudfunctions.net/syllabus-reader',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const processedJSON = validateClassJSON(res.data);
      setResponse(processedJSON);
      setWaiting(false);
    } catch (err) {
      console.error('Error processing syllabus', err);
      setWaiting(false);
    }
  }

  const callback = {
    onSubmit: () => {
      const { assignmentTypes: importedAts, ...importedClass } = response;
      const assignmentTypes = importedAts.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setCls(importedClass);
      setAssignmentTypes(assignmentTypes);
      const modal = document.getElementById('scan_syllabus_modal') as HTMLDialogElement;
      modal.close();
      setFile(null);
      setResponse(undefined);
    },
    onCancel: () => {
      setResponse(undefined);
    },
  };

  return (
    <BaseModal id="scan_syllabus_modal" otherProps="items-center">
      <div>
        {response ? (
          <ClassPreview data={response} callback={callback} />
        ) : waiting ? (
          <div className="flex flex-col gap-1 items-center text-center">
            <p>Scanning Syllabus. Please wait</p>
            <span className="loading loading-dots loading-lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-center items-center">
            <h3 className="text-2xl mb-2">Scan Syllabus</h3>
            <p>
              Add a syllabus pdf file and we will use AI to try and extract class data relevant to
              GradeMaster and use it to populate a class for you!
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <button type="submit" className="btn btn-primary">
                Upload Syllabus
              </button>
            </form>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
