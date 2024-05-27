import Link from 'next/link';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function Page() {
  return (
    <div className="documentation-page">
      <section>
        <h1 className="font-title">Structure</h1>
        <p>
          The grade calculator in GradeMaster has a structure that aims to be simple but effective.
          This page breaks down the structure of the grade calculator to empower users to understand
          what they are doing and why they are doing it. The first two sections,{' '}
          <Link href={'#users'}>Users</Link> and <Link href={'#semesters'}>Semesters</Link> are only
          available when logged in. If you are using a guest class, only{' '}
          <Link href={'#classes'}>Classes</Link> and subsequent sections will be relevant.
        </p>
      </section>
      <section id="users">
        <h2>Users</h2>
        <div className="divider" />
        <p>
          Users are the people who use GradeMaster. That includes you! Users in GradeMaster are very
          simple, and are only used to ensure that the only people who can view information about a
          semester or class are those who created it.
        </p>
      </section>
      <section id="semesters">
        <h2>Semesters</h2>
        <div className="divider" />
        <p>
          Semesters and Classes are similar to folders and files in a file system. Semesters are
          currently used simply as an organizer for your classes. For Example, if you were a student
          in the Spring 2024 semester, you would add all the classes you took in that semester under
          the Spring 2024 semester.
        </p>
        <p>Semesters contain the following fields:</p>
        <ul>
          <li>-Season</li>
          <li>-Year</li>
          <li>-Current</li>
        </ul>
        <p>
          Season is the season in which the semester occurs, and must be one of the following:
          Spring, Summer, Fall, Winter. Year is the year in which the semester occurs. Season and
          Year come together and that is how we generally identify semesters, an example being
          Spring 2024. These two fields don&apos;t change or add any functionality besides sorting
          and organizing your semesters.
        </p>
        <p>
          Current, however, does change the functionality as it allows GradeMaster to automatically
          load a specific semester based on which is the current semester. For example, if you have
          4 semesters in GradeMaster, Fall 2021, Spring 2022, Summer 2022, and Fall 2022 and Fall
          2022 is the semester you are currently enrolled in when you open the grade calculator on
          GradeMaster, you don&apos;t want to have to navigate through your old semesters. So
          GradeMaster will check which is your current semester and will open that semester
          automatically!
        </p>
        <p>In the future, we hope to add more features to semesters such as semester GPAs!</p>
      </section>
      <section id="classes">
        <h2>Classes</h2>
        <div className="divider" />
        <p>
          As stated in the above section, Semesters and Classes are similar to folders and files.
          Classes are the actual core of the grade calculator. Classes have a dynamic score and list
          of warnings, that are not set by the user but are dynamically generated based on the
          inputs the user provides to the assignment types and assignments of the class.
        </p>
        <p>Classes contain the following fields:</p>
        <ul>
          <li>-Code</li>
          <li>-Name</li>
          <li>-Desired Score</li>
          <li>-Units</li>
          <li>-Display Color</li>
        </ul>
        <p>
          A class&apos;s code is it&apos;s identifier. This often comes in the form of a short
          department code (CMSC, CS, MATH, ENGL, etc.) followed by a class number (100, 140, 200,
          351) to create a class identifier. An few examples include: CMSC131, CMSC351, MATH140,
          CS100, ENGL393. A classes name is... it&apos;s name. This would be something like Intro to
          Data Science, Technical Writing, Calculus I, etc. These fields don&apos;t add any
          functionality and are simply for sorting and organizing your classes.
        </p>
        <p>
          The desired score for a class is the score that you want to get in that class. This is
          completely decided by the user. When you are on a class&apos;s page, you will see a box
          that contains information about your desired score. It will either tell you that you have
          reached your desired score, or it will tell you the distance from your desired score. See{' '}
          <Link href={'/documentation/dynamic-updates'}>Dynamic Updates</Link> for more information.
        </p>
        <p>
          The units, or credits, of a class are something that is provided by your school. The only
          functionality they have is that they are used to calculate your GPA. There is currently no
          support for Pass/Fail Classes.
        </p>
        <p>
          A class&apos;s display color is purely cosmetic. The class code and name on a class page
          will appear in that color, the class cards that appear on the semester page will also be
          that color. It can be useful for differentiating between different classes.
        </p>
      </section>
      <section id="assignment-types">
        <h2>Assignment Types</h2>
        <div className="divider" />
        <p>
          Assignment Types are a unique aspect of GradeMaster that allows you to not only organize
          your assignments but can also be used to make managing assignment weights easier.
          Assignment Types are essentially a group of common assignments. For example, Projects,
          Homeworks, Exams, Quizzes. Assignment types contain the dynamic values of weighted score,
          lost points, and possibly weight.
        </p>
        <p>
          Weighted Score is the amount of points that actually go towards your grade, i.e your
          normalized points. An example would be if you had 10 Homeworks that were all out of 100,
          and you got a 100% on all of them. If each homework is only worth 1% of your grade, i.e it
          has a weight of 1, then your total homework weighted score would only be 10/10. Getting a
          100/100 on every homework can be misleading as the high scores of the homeworks can make
          it seem like they&apos;d be worth more, when in reality they only account for 10% of your
          grade. The weighted score for an assignment type is the sum of the weighted scores of the
          assignments.
        </p>
        <p>
          Lost points are the amount of normalized points you lost in an assignment type. Using the
          Homework example above. If you did not do 3 of your 10 homeworks, your total score would
          be 700 / 1000. Your weighted score would be 7 / 10, which would result in you losing 3
          points on your total grade. If you had a 100% in the class before, now you would have a
          97% because you lost 3 points.
        </p>
        <p>
          An assignment type&apos;s weight can be either dynamically generated or entered by a user.
          This brings us to one of the key features of assignment types. Weight locking. For now we
          will simply explain it as, some assignment types are given a weight and the assignments
          within that assignment type all have the same weight. For example, quizzes are worth 20%
          and there will be 6 quizzes. Instead of having to do 20 / 6 manually, you can the quizzes
          weights and enter 20%. Then when you add the 6 quizzes, GradeMaster will balance the
          weights for you! Visit <Link href={'/documentation/weight-locking'}>Weight Locking</Link>{' '}
          for more information. If an assignment type has weight locking enabled, you will manually
          input an assignment types weight. This will cause all current, and future assignments of
          that assignment type (for the current class) to be balanced using that weight. If an
          assignment type has weight locking disabled, the assignment type&apos;s weight will be
          dynamically generated as the sum of its assignments weights. For example if you have 3
          projects in the Projects assignment type, and you set their weights as 10, 10, and 15
          respectively, the Projects assignment type will have a weight of 35.
        </p>
        <p>The other fields of an assignment type are:</p>
        <ul>
          <li>-Name</li>
          <li>-Default Name</li>
          <li>-Max Score</li>
        </ul>
        <p>
          Name is simply the name of the assignment type. Projects, Homework, Exams, Quizzes, etc.
        </p>
        <p>
          Default Name and Max Score are the default values for the assignment type. These make it
          so that if you know each assignment will be out of 50, instead of manually changing each
          one, simply set the max score to 50 and each new assignment will be out of 50. Default
          Name is similar. If you know each assignment will have a certain naming convention, like
          Project-#, Quiz #, HW #, Assignment #, where # is the assignment #, then you can extract
          the prefix from that, i.e Project-, Quiz , HW, Assignment, and set the Default Name as
          that. Then each new assignment will have the name of the default name requiring less
          typing to properly name assignments.
        </p>
      </section>
      <section id="assignments">
        <h2>Assignments</h2>
        <div className="divider" />
        <p>
          Assignments are the final piece of the grade calculator puzzle. These are the individual
          assignments that have scores that you can edit. Some examples include: Project 1, Midterm,
          Quiz 1, Homework 3, Introduction Essay, etc.
        </p>
        <p>Assignments contain the following fields:</p>
        <ul>
          <li>Name</li>
          <li>Score</li>
          <li>Max Score</li>
          <li>Weight</li>
        </ul>
        <p>
          An assignment&apos;s name is simply what you call it. By default it will be the default
          name set in your assignment type.
        </p>
        <p>
          An assignment&apos;s score and max score are the score of the assignment. Say you got a 45
          out of 50 on an exam. Your score would be 45 and your max score would be 50. These are
          both set to the assignment types max score by default.
        </p>
        <p>
          Finally, we have the assignment&apos;s weight. As discussed in the{' '}
          <Link href={'#assignment-types'}>assignment types</Link> section, if you have weight
          locking enabled you will not be able to edit an assignment&apos;s weight, as it will be
          balanced automatically based on the assignment type&apos;s weight and the number of
          assignments. If you have weight locking disabled, you can edit the assignment weight as
          you would it&apos;s score.
        </p>
        <p>
          An assignment also includes the dynamic values weighted score and lost points. These are
          similar to the assignment types dynamic values, except the weighted score of an assignment
          is found by the following formula: Score / MaxScore * Weight. Lost points are found the
          same by getting the weighted score and subtracting that from the max weighted score which
          would be the weight.
        </p>
        <p>
          When an assignment&apos;s score, max score, or weight are edited, it will cause all a
          class&apos;s dynamic values to update. Some examples of this are, a class&apos;s score,
          distance from desired score, class warnings, assignment type weight, assignment lost
          points, etc.
        </p>
      </section>
    </div>
  );
}
