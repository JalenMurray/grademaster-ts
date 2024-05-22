'use client';

import { useClassContext } from '@/app/context/class';
import { ClassJSON } from '@/app/context/types';
import { useEffect, useState } from 'react';
import BaseModal from '../BaseModal';
import clsx from 'clsx';

type Status = 'importing' | 'exporting';

// function FormattedClass({ cls }: { cls: ClassJSON }) {
//   return (
//     <>
//       <p>{'{'}</p>
//       <p className="ml-2">{`"id": "${cls.id}",`}</p>
//       <p className="ml-2">{`"code": "${cls.code}",`}</p>
//       <p className="ml-2">{`"name": "${cls.name}",`}</p>
//       <p className="ml-2">{`"score": "${cls.score}",`}</p>
//       <p className="ml-2">{`"desiredScore": "${cls.desiredScore}",`}</p>
//       <p className="ml-2">{`"displayColor": "${cls.displayColor}",`}</p>
//       <p className="ml-2">{`"assignmentTypes": {`}</p>
//       {cls.assignmentTypes.map((at) => (<p></p>))}
//       <p className="ml-2">{`"}`}</p>
//       <p>{'}'}</p>
//     </>
//   );
// }

export default function ImportExportModal() {
  const { cls, setCls, setAssignmentTypes, exportClass } = useClassContext();
  const [exported, setExported] = useState<ClassJSON>(null);
  const [status, setStatus] = useState<Status>('importing');
  const [toImport, setToImport] = useState<string>('');
  const [importError, setImportError] = useState<string>(undefined);

  function handleImportChange(e) {
    setToImport(e.target.value);
  }

  function importClass() {
    try {
      const { assignmentTypes: importedAts, ...importedClass } = JSON.parse(toImport);
      setCls(importedClass);
      const assignmentTypes = importedAts.reduce((acc, obj) => {
        acc[obj.id] = { ...obj };
        return acc;
      }, {});
      setAssignmentTypes(assignmentTypes);
      const modal = document.getElementById('import_export_modal') as HTMLDialogElement;
      modal.close();
      setToImport('');
      setImportError(undefined);
    } catch (err) {
      setImportError('Invalid JSON provided');
      console.error(err);
    }
  }

  useEffect(() => {
    setExported(exportClass());
  }, [cls]);

  function downloadJSON() {
    const jsonStr = JSON.stringify(exported);
    const filename = `${cls.code}-${cls.name}.json`;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <BaseModal id="import_export_modal" otherProps="items-center max-w-3xl min-h-[50vh]">
      <div className="flex flex-col gap-8 h-full items-center text-center">
        <label className="flex cursor-pointer gap-2">
          <span className="label-text">Import</span>
          <input
            type="checkbox"
            className={clsx('toggle ', {
              'bg-blue-500 hover:bg-blue-700': status === 'importing',
              'bg-orange-500 hover:bg-orange-700': status === 'exporting',
            })}
            onChange={(e) => setStatus(e.target.checked ? 'exporting' : 'importing')}
          />
          <span className="label-text">Export</span>
        </label>
        {status === 'importing' ? (
          <>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Class JSON</span>
                {importError && <span className="label-text-alt text-error">{importError}</span>}
              </div>
              <textarea
                className="textarea textarea-bordered h-96 w-96"
                placeholder="Enter your Class JSON you got from exporting a class here"
                value={toImport}
                onChange={handleImportChange}
              ></textarea>
            </label>
            <button className="btn btn-primary mt-4" onClick={importClass}>
              Import
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              className="btn bg-orange-500 hover:bg-orange-700 text-neutral"
              onClick={downloadJSON}
            >
              Download JSON file
            </button>
            <div className="w-96 h-fit p-4 border-black border-2 rounded-lg overflow-auto">
              <p>{JSON.stringify(exported)}</p>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}
