'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import Image from 'next/image';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [semesters, setSemesters] = useState<Array<Schema['Semester']['type']>>([]);
  const [semester, setSemester] = useState({});

  function listSemesters() {
    client.models.Semester.observeQuery().subscribe({
      next: (data) => setSemesters([...data.items]),
    });
  }

  useEffect(() => {
    const getSemester = async () => {
      const { data: semesterWithClass } = await client.models.Semester.get(
        { id: 'e6489f6c-f3d6-413c-b126-4de3e2dc96ec' },
        { selectionSet: ['id', 'classes.*'] }
      );
      console.log(semesterWithClass);
    };

    listSemesters();
    getSemester();
  }, []);

  function createSemester() {
    console.log('CREATING NEW SEMESTER');
    client.models.Semester.create({
      season: 'Spring',
      year: 2021,
      current: false,
    });
  }

  function createClass() {
    console.log('CREATING CLASS');
    client.models.Class.create({
      name: 'Intro to Artificial Intelligence',
      code: 'CMSC421',
      desiredScore: 70,
      units: 3,
      semesterId: 'e6489f6c-f3d6-413c-b126-4de3e2dc96ec',
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="hero min-h-[90vh]">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <Image
              src="/logo.png"
              width={500}
              height={500}
              className="rounded-lg shadow-2xl"
              alt="GradeMaster Hero"
            />
            <div>
              <h1 className="text-5xl font-bold">Welcome to GradeMaster!</h1>
              <p className="py-6">
                Your go-to tool for tracking assignments, calculating grades, and more!
              </p>
              <p className="pb-4">
                Access your created semesters in the left-hand menu. Haven&apos;t created a semester
                yet? Click the button below to create your first semester!
              </p>
              <button className="btn btn-primary" onClick={signOut}>
                New Semester
              </button>
            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
}
