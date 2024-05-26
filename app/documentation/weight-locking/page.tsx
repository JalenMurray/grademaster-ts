export default function Page() {
  return (
    <div className="documentation-page">
      <section>
        <h1 className="font-title">Weight Locking</h1>
        <p>
          One of GradeMasters stand out features is weight locking. This feature allows you to
          automatically balance assignment weights.
        </p>
      </section>
      <section>
        <h2>When to use</h2>
        <div className="divider" />
        <p>
          There are often times when you receive a syllabus and the grade breakdown looks somewhat
          like the following:
        </p>
        <ul>
          <li>- Quizzes: 15%</li>
          <li>- Homework: 5%</li>
          <li>- Essays: 15%</li>
          <li>- Projects: 20% (Project 1: 5% & Project 2: 15%)</li>
          <li>- Midterm: 15%</li>
          <li>- Final: 30%</li>
        </ul>
        <p>
          The thing to notice here is that for quizzes, homework, and essays, there is no indication
          on how many of each their are, and the weight of each one. If you are like me and you used
          some kind of spreadsheet tool for you grade calculator needs, then this would be a bit
          complicated to get going. First, you would have to either guess, or enter the amount of
          each assignment type. For example, we are 2 weeks in and it seems like we homework every
          week and it was a 15 week course, I would create the formula 5/15, and copy it to each
          cell for the weight of an assignment. This in itself is not the worst thing to have to do
          and is pretty manageable. But what if we get to week 3 and we don't have any homework. Now
          all my formulas are messed up and I have to change all of them, or change one and copy it
          over to the rest. This is something that would happen to me a lot. So when I was creating
          GradeMaster, this was one of the things I was sure to address.
        </p>
        <p>
          So when would you use weight locking? When you are given a grade breakdown where weights
          are assigned to assignment types, instead of individual assignments, you would benefit
          from using weight locking.
        </p>
      </section>
      <section>
        <h2>What it does</h2>
        <div className="divider" />
        <p>
          Weight locking allows you to effortlessly update the weights of assignments that fall into
          the category we defined above. Simply adding or removing assignments is all that is
          required to update the weights of every assignment in that assignment type. If you edit
          the weight of the assignment type, that will also edit all its assignments weights.
        </p>
        <p>
          For our example above, if we were using GradeMaster we would simply create an assignment
          type for homework, lock the weights, and assign it the weight 5. Now whenever I create or
          delete assignments, the weights for all the assignments of that type will be balanced. So
          in our example, I assumed I will have 15 homeworks and created 15 homework assignments in
          my homeworks assignment type. I didn't have to do any calculations and GradeMaster set
          each weight to 5 / 15 = .33. But once I got to week 3 and there was no homework, if I
          assume that the pattern still holds up but I we just didn't have one this week, I simply
          have to delete one of the assignments. Now all 14 of the other assignments are updated to
          5 / 14 = .36 instantly!
        </p>
      </section>
    </div>
  );
}
