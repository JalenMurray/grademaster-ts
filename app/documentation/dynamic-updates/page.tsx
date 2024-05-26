import Link from 'next/link';

export default function Page() {
  return (
    <div className="documentation-page">
      <section>
        <h1 className="font-title">Dynamic Updates</h1>
        <p>
          One of the primary features of the grade calculator on GradeMaster is the ability to see
          real-time dynamic updates. This means that when you update a value in the grade calculator
          certain values will update as you type in another field. On this page, we will go over
          some of the values that dynamically update.
        </p>
      </section>
      <section>
        <h2>Class Values</h2>
        <div className="divider" />
        <p>The class values that dynamically update in the grade calculator are the as follows:</p>
        <ul>
          <li>-Distance from desired score</li>
          <li>-Desired score status (reached or not)</li>
          <li>-Any warnings</li>
          <li>-Class Score and Progress Bar</li>
        </ul>
        <h3>Desired Score</h3>
        <p>
          The distance from the desired score and the desired score status are simply values that
          let you know whether or not the class score is your desired score, and if it isn&apos;t
          how far you are from it. An example would be if you have a class with one assignment that
          is worth 100% of your grade. Your desired score in the class is a 75. If you got a 50 /
          100 on the assignment your current score would be 50% and the grade calculator will tell
          you that you are 25% from your desired score. If you go to edit the score, every time you
          change the score, the distance from the desired score will update. Say you want to edit
          the score to be 80 instead. When you go to change the score, the first time you hit
          backspace the score will now say 5 and the distance will be updated to say 70 as you now
          are 70% from 75%. And then you press backspace again and it is now 0 so you are 75% away.
          Then you type 8 and it will say you are 67% away and then you type 0 and it will say you
          have reached your desired score. That is because it found that your score is now 80 which
          is greater then your desired score of 75. This all happens seamlessly to allow you to
          efficiently check what your grade would be depending on your scores on your assignments.
        </p>
        <h3>Warnings</h3>
        <p>
          Your class warnings are simply things to help you, the user, ensure you are seeing the
          correct values. Currently the only warning is if your total class weight does not equal
          100%. This can cause you to see incorrect scores. For example if you have two assignment
          types, Projects and Homework worth 60% and 30% respectively, your total class weight will
          only be 90%. So, even if you have 100% on every assignment in those assignment types, it
          will only show that your score is 90%. So the grade calculator will give you a warning if
          your class weight does not equal 100% and will tell you what your percent total currently
          is.
        </p>
        <h3>Class Score</h3>
        <p>
          Your class score / progress bar will update based on the scores you have on your
          assignments. As you update your assignment scores, max scores, weights, or assignment type
          weights your class score and progress bar will update. The score is your percentage score,
          not your total point score. This means that if your class only has 10 homeworks worth 10%
          each that are all worth 100 points, if you get 100 / 100 on all of them, your class score
          will not be 1000, it will be 100%. Currently GradeMaster does not support point totals, so
          if you are in a class that uses point totals you will be unable to use the grade
          calculator for that class unless you normalize each assignment so that the class total is
          100%.
        </p>
        <p>
          The progress bar fills up based on your class score and changes color based on your class
          score. For example if you have an 80%, the progress bar will be 80% full and the bar will
          be the color range that 80% falls into.
        </p>
      </section>
      <section>
        <h2>Assignment Type and Assignment Values</h2>
        <div className="divider" />
        <p>
          Assignment Type and Assignment dynamic values will be grouped together because they are
          essentially the same thing. Each has the following dynamic values:
        </p>
        <ul>
          <li>-Possibly weight (depending on whether or not weight locking is enabled)</li>
          <li>-Weighted Score</li>
          <li>-Lost Points</li>
        </ul>
        <h3>Weight</h3>
        <p>
          Weight locking is one of the primary features of the grade calculator. Assignment type
          weights can either be locked or unlocked. To learn more about weight locking visit the{' '}
          <Link href={'/documentation/weight-locking'}>Weight Locking</Link> page. If an assignment
          type has its weights locked, then the assignment type will have an editable weight, while
          the assignments will have dynamic values for weights. This means that if you have an
          assignment type with locked weights, weight set to 25, and 5 assignments, the weight for
          that assignment type will be editable but each assignment will have a weight of 5 and be
          uneditable. Then if you edit the assignment types weight, say you want to change it to 20,
          then with each change you make to the weight the assignments will update. So when you type
          backspace, the weight will be 2 and the assignments will all have a weight of .4, and when
          you type 0 the weight will be 20 and the assignments will all have a weight of 4.
        </p>
        <p>
          The opposite is true when the assignment type has its weights unlocked. In this case, the
          assignment type weight will be a dynamic uneditable value, while each assignment will have
          an editable assignment. For example, if you have an assignment type with a current weight
          of 10, weights set to unlocked, and 2 assignments with each having a weight of 5, if you
          will be unable to manually edit the assignment types weight. You can however edit the
          assignments weight. If you update one of the assignments weight to 10, the assignment
          types weight will be automatically updated to 15, which is 5 + 10.
        </p>
        <h3>Weighted Score</h3>
        <p>
          An assignment type or assignments weighted score is just the normalized score. An
          assignment types weighted score is simply the sum of all of its assignments weighted
          score, so as it&apos;s assignments weighted scores are updated, it&apos;s weighted score
          is updated as well. So we will just go over how the assignments weighted score is
          calculated. An assignment&apos;s weighted score is calculated as weightedScore = score /
          maxScore * weight. The reason this is can be useful is because it shows how much each
          assignment is actually worth. Let&apos;s go over an example. Say I have an assignment type
          with 5 assignments. Each assignment has a weight of 10. Each assignment is also out of
          100. For the first assignment I received a 75 / 100. So if we put this into the formula we
          get 75 / 100 * 10 = 7.5. The max weighted score is simply the weight of the assignment. So
          we get the weighted score is 7.5 / 10. Now for the rest of the assignments we received a
          100, 92, 73, and 50. So our remaining weighted scores would be 10 / 10, 9.2 / 10, 7.3 /
          10, and 5 / 10. When we sum all these up we get 7.5 + 10 + 9.2 + 7.3 + 5 = 39. And for the
          max we sum up all the weights of the assignments so 10 + 10 + 10 + 10 + 10 = 50. So the
          total weighted score for our assignment type would be 39 / 50. This means that 39 out of
          the 100 total class points came from this assignment type, and we could&apos;ve had 50.
          What makes it dynamic is that as we update the score, max score, or weight, the weighted
          score will update. So for the first assignment in which we got a 75 on, if we were to
          change our grade to an 85, the weighted score for that assignment would be updated to 8.5
          / 10. Which would then update the assignment type weighted score to 40 / 50. The weighted
          score doesn&apos;t provide much functionality but is helpful for seeing how much your
          assignments are really worth.
        </p>
        <h3>Lost Points</h3>
        <p>
          Lost points are also very similar to weighted score. Lost points are simply the amount of
          points that your total class score will be missing based on your current assignment score.
          Lost points are simply the max weighted score (i.e the weight) subtracted by the weighted
          score. Because lost points are based on the weighted score, anything that causes the
          weighted score to update will also cause the lost points to update. In the above example
          for weighted score we had the following weighted scores for the 5 assignments:
        </p>
        <ul>
          <li>8.5 / 10</li>
          <li>10 / 10</li>
          <li>9.2 / 10</li>
          <li>7.3 / 10</li>
          <li>5 / 10</li>
        </ul>
        <p>
          So the lost points for each of these would be 1.5, 0, 0.8, 2.7, and 5. These numbers are
          summed up to get the assignment type&apos;s lost points which in this case would be 10.
          This value also doesn&apos;t provide any functionality but can be useful to the user. One
          of the ways to use this number is to see how much getting a bad grade on one assignment
          will affect your grade, especially compared to another. If you have a final worth 30% and
          a midterm worth 10% getting a 60 / 100 will cause you to lose 4 points from the midterm,
          but 12 from the final.
        </p>
      </section>
    </div>
  );
}
