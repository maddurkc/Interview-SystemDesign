const ResignationTemplate = ({
  companyName,
  effectiveDate,
  lastDate,
  employeeName,
}) => (
  <p>
    Hi,
    <br />
    <br />
    Please accept this email as my formal resignation from {companyName}. I have
    taken this decision as I have got a different/better work opportunity and
    would like to pursue my career in the same.
    <br />
    <br />
    Request you to consider my letter of resignation effective from{' '}
    {effectiveDate}. I understand that as per the policy I am required to serve
    a notice period of 60 days and my last working day accordingly shall be{' '}
    {lastDate}.<br />
    <br />I would request you to consider if an early release is possible. I am
    grateful to {companyName} and looking forward to your support.
    <br />
    <br />
    Thanks and Regards,
    <br />
    {employeeName}
  </p>
);

const JobSelectionTemplate = ({ companyName, employeeName }) => (
  <p>
    Hello,
    <br />
    <br />I wish to apply for the position of that is listed on {companyName}.
    The role and the responsibilities listed in the job description match my
    interests and skills. I believe that I'm a good candidate for this position.
    <br />
    <br />
    I have attached my resume and cover letter for your perusal. I hope they can
    help you learn more about my background, my qualifications, and my
    experience.
    <br />
    <br />
    Thank you for your valuable time. I'm optimistic that you'll consider me for
    this role. I look forward to hearing from you about this job opportunity.
    <br />
    <br />
    Sincerely, {employeeName}
  </p>
);

export { ResignationTemplate, JobSelectionTemplate };
