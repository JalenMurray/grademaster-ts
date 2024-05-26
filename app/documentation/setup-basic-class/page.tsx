'use client';

import { TutorialClass } from '@/app/class_templates/templates';
import { linkClasses } from '@/app/utils/format';
import Image from 'next/image';
import Link from 'next/link';

const baseImgSrc = '/documentation/setup-basic-class/';

function downloadJSON() {
  const jsonStr = JSON.stringify(TutorialClass);
  const filename = `TutorialClass.json`;
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Page() {
  return (
    <div className="documentation-page">
      <section className="mb-6">
        <h1 className="font-title">Setup Basic Class</h1>
        <p>
          First let&apos;s look at how to setup a basic class. This tutorial will use the guest
          page, but the same ideas would apply to a saved class, but you&apos;d be able to{' '}
          <a href="#step-2">skip step 1</a> as the class values would have already been set. For
          this example, we will be creating my first ever coding class, CMSC131 - Object Orientated
          Programming I.
        </p>
      </section>

      <section id="step-1">
        <h2 className="">Step 1: Configure Class</h2>
        <div className="divider" />
        <p>
          For this tutorial we will start out with a blank guest class as shown below. If you are
          not using a guest class you can <a href="#step-2">skip this step</a>.
        </p>
        <Image
          src={`${baseImgSrc}base-class.png`}
          alt="Base Class"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          From here you can select &quot;Edit Class&quot; which will open a dialog where you can
          change the class code, name, desired score, and display color. As stated above, for this
          example I will be using &quot;CMSC131&quot;, which at UMD is &quot;Object Orientated
          Programming I&quot;. In this case, &quot;CMSC131&quot; would be the code and &quot;Object
          Orientated Programming I&quot; would be the name.
        </p>
        <p>
          As for the desired score and display color, this is completely up to you! I would just
          like to pass this class so I will set the desired score to 70. And for the display color I
          will choose blue. Visit the{' '}
          <Link href="/documentation/customization">Customization Page</Link> to see more
          information about how you can customize your class. This is what the dialog looks like
          once I&apos;ve added the information above.
        </p>
        <Image
          src={`${baseImgSrc}edit-class-form.png`}
          alt="Edit Class Form"
          width={400}
          height={400}
          className="border-2 border-black my-4 rounded-xl"
        />
        <p>
          Once I click submit, the class will update. As you can see, the class code and name have
          been changed to &quot;CMSC131&quot; and &quot;Object Orientated Programming I&quot;
          respectively. The color of the code and name have changed as well to blue, what I chose as
          the display color. Finally, the distance from desired score has changed from 100 to 70.
          This is because the score of the class is currently 0% and since my desired score is now
          70% I am 70% away from my desired score.
        </p>
        <Image
          src={`${baseImgSrc}edit-class-result.png`}
          alt="Edit Class Result"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
      </section>
      <section id="step-2">
        <h2>Step 2: Add Assignment Type(s)</h2>
        <div className="divider" />
        <p>
          Next up we need to start populating our class. You can do this in various ways with
          GradeMaster. You can add each piece of the class manually, or import them using either the{' '}
          <Link href="/documentation/import-export">Import/Export</Link> feature or the{' '}
          <Link href="/documenation/syllabus-scanning">Scan Syllabus</Link> feature. For this
          example we are gonna keep it simple and do it manually.
        </p>
        <p>
          So first we can go ahead and create a new assignment type. An assignment type is a group
          of assignments. An example of this would be quizzes or projects. The reason GradeMaster
          uses assignment types is so you can keep track of information pertaining to a group of
          assignments and lock the weights of assignments within a specific assignment type.
        </p>
        <p>
          To create a new assignment type we can simply select &quot;New Assignment Type&quot; and
          another dialog for creating a new assignment type will pop up. For this example I will be
          creating the following assignment types:
        </p>
        <ul>
          <li>Projects - Various weights</li>
          <li>Quizzes - 20%</li>
          <li>Homework - 10%</li>
          <li>Exams - Various weights</li>
        </ul>
        <p>
          When creating an assignment type you need to pass in the assignment type name, max score,
          default name, whether or not you want to lock the weights for the assignment type, and if
          you do, the assignment type weight.
        </p>
        <p>
          Now the weight locking can be a bit confusing but we will go more in depth into that in
          the <Link href="/documenation/weight-locking">Weight Locking</Link> Page. For this
          tutorial, we will simply explain it as, some assignment types are given a weight and the
          assignments within that assignment type all have the same weight. For example, quizzes are
          worth 20% and there will be 6 quizzes. Instead of having to do 20 / 6 manually, you can
          the quizzes weights and enter 20%. Then when you add the 6 quizzes, GradeMaster will
          balance the weights for you!
        </p>
        <p>
          For the default values of max score and default name, these are simply there to make your
          life easier when you are adding in new assignments. Know the max score for each project
          will be 75? Set the the max score to 75 and each time you add a new project, it will be
          out of 75 so you don&apos;t have to manually change each one. Same goes for default name.
          If each Project is &quot;Project-#&quot; where # is the project number, simply set the
          default name to &quot;Project-&quot; and you only have to add the number at the end of
          each project. Visit <Link href="/documenation/default-values">Default Values</Link> for
          more information of default values
        </p>
        <p>
          Now that we know what each field does, lets create all 4 of our assignment types. We will
          provide screenshots of each form below, as well as the class once we finished
        </p>
        <h3>Projects</h3>
        <Image
          src={`${baseImgSrc}new-at-projects.png`}
          alt="Projects Form"
          width={400}
          height={400}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3>Quizzes</h3>
        <Image
          src={`${baseImgSrc}new-at-quizzes.png`}
          alt="Quizzes Form"
          width={400}
          height={400}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3>Homework</h3>
        <Image
          src={`${baseImgSrc}new-at-homework.png`}
          alt="Homework Form"
          width={400}
          height={400}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3>Exams</h3>
        <Image
          src={`${baseImgSrc}new-at-exams.png`}
          alt="Exams Form"
          width={400}
          height={400}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3>Result</h3>
        <Image
          src={`${baseImgSrc}new-at-results.png`}
          alt="New Assignment Types Result"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
      </section>
      <section id="step-3">
        <h2>Step 3: Add Assignments</h2>
        <div className="divider" />
        <p>
          Now that we have the foundations for our class finished. All that&apos;s left is to add
          and edit our assignments. For this tutorial, we will go over adding the projects and the
          quizzes. We will also be adding the homeworks and exams but we will not be going over
          that.
        </p>
        <button className="btn btn-info w-64" onClick={() => downloadJSON()}>
          Download Class JSON
        </button>
        <p>
          Click the above button to download a JSON file for the Class. This is where you can get
          the information about the assignments we will be adding, including the ones we don&apos;t
          show.
        </p>
        <h3 className="text-md md:text-lg">Projects</h3>
        <p>
          First lets start with projects. We will have 3 projects with their weights being 10%, 10%,
          and 15% and their names being Project-1, Project-2, Project-3 respectively
        </p>
        <p>
          To add new assignments we first need to open the assignment type dropdown. To do this
          simply click the assignment type. Afterwards, you can select &quot;New Assignment&quot;.
          This will create a new assignment using the default values we provided when we created the
          assignment type. For projects, click &quot;New Assignment&quot; 3 times.
        </p>
        <p>
          Now we need to edit our individual assignments. To edit an edittable field, you simply
          need to click the field and it will allow you to edit it. Firstly, lets update the names
          of the assignments. To do so, click the project name &quot;Project-&quot; and from here
          you can type the correct project name. Name all the projects with their correct number
          added at the end.
        </p>
        <p>
          <i>
            Helpful Tip: To make use of the default name simply press the right arrow key on your
            keyboard and enter the suffix of your assignment. In this case I will hit the right
            arrow key and type &quot;1&quot;
          </i>
        </p>
        <p>
          One of the greatest features of GradeMaster is its dynamic updates. The information on the
          page is updated as you edit assignments. This way you can see how your edits will impact
          your score right away. Let&apos;s see this feature in action. Let&apos;s update the
          weights of the projects. To do so, you do the same thing you did for the names. Simply
          click the weight field for an assignment and enter a number. But, if an assignment type is
          locked, you will be unable to edit individual assignment weights. Update the weights of
          all three projects to 10, 10, and 15.
        </p>
        <p>
          As you update the weights you should see various values change. We go into each of these
          values in depth in the <Link href="/documentation/dynamic-updates">Dynamic Updates</Link>{' '}
          page, but for now we will just look at the progress bar which holds our class score. As
          you update the weight, the class score is updated. Same goes for the score and max score.
          Below is an image of what your projects assignment type should look like
        </p>
        <Image
          src={`${baseImgSrc}projects-at.png`}
          alt="Projects Assignment Type"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3 className="text-md md:text-lg">Quizzes</h3>
        <p>
          Now let&apos;s do quizzes. This one will be easier because we have locked the weights for
          the quizzes. So all we need to do is open the assignment type, and click &quot;New
          Assignment&quot; however many quizzes we have. In this case we will do 6.
        </p>
        <p>
          Now that you have all your quizzes, you can do the same thing you did for the projects and
          add a number or rename them all together. I will simply be adding a number to the end.
        </p>
        <p>
          Notice how we did not have to set the weights for each quiz manually. If you did it
          correctly, each quiz should have a weight of 3.33, which is 20 / 6. If your professor
          gives you a pop quiz so you now have 7 quizzes, you simply need to add another assignment
          and all the previous quizzes will have their weights updated. Same thing goes if you end
          up only having 5 quizzes and need to delete one. Below is an image of what your quizzes
          assignment type should look like.
        </p>
        <Image
          src={`${baseImgSrc}quizzes-at.png`}
          alt="Quizzes Assignment Type"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3 className="text-md md:text-lg">Homework and Exams</h3>
        <p>
          For the last two assignment types, I challenge you to take a look at the JSON file and see
          if you can figure it out yourself. Below are the images of what they should look like when
          you finish
        </p>
        <h3>Homework</h3>
        <Image
          src={`${baseImgSrc}homework-at.png`}
          alt="Homework Assignment Type"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
        <h3>Exams</h3>
        <Image
          src={`${baseImgSrc}exams-at.png`}
          alt="Exams Assignment Type"
          width={1000}
          height={1000}
          className="border-2 border-black my-4 rounded-xl"
        />
      </section>
      <section id="step-4">
        <h2>Step 4: Use However You&apos;d Like!</h2>
        <div className="divider" />
        <p>
          You have now finished setting up your class. Now you are free to mess around and change
          your grades to see how each assignment affects your final score!
        </p>
        <p>
          That&apos;s all for this tutorial. Please check out some of the other documentation to see
          more details about the awesome features that GradeMaster has to offer. Thanks!
        </p>
      </section>
    </div>
  );
}
