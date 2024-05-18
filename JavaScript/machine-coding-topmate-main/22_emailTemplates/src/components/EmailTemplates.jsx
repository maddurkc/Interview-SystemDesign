import { useState } from 'react';
import { InputField } from './InputComponent';
import {
  ResignationTemplate,
  JobSelectionTemplate,
} from './TemplatesComponent';

const EmailTemplates = () => {
  const [template, setTemplate] = useState('jobSelection');
  const [companyName, setCompanyName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [lastDate, setLastDate] = useState('');

  //setter is the setState here (ex: setCompanyName)
  const handleTemplateChange = (setter) => (e) => setter(e.target.value);

  const getMessage = () => {
    if (template === 'resignation') {
      return (
        <ResignationTemplate
          companyName={companyName}
          effectiveDate={effectiveDate}
          lastDate={lastDate}
          employeeName={employeeName}
        />
      );
    } else if (template === 'jobSelection') {
      return (
        <JobSelectionTemplate
          companyName={companyName}
          employeeName={employeeName}
        />
      );
    }
  };

  return (
    <div>
      <form>
        <InputField
          label='Template'
          type='select'
          value={template}
          onChange={handleTemplateChange(setTemplate)}
          options={[
            { value: 'jobSelection', label: 'Job Selection' },
            { value: 'resignation', label: 'Resignation' },
          ]}
        />
        <InputField
          label='Employee Name'
          type='text'
          value={employeeName}
          onChange={handleTemplateChange(setEmployeeName)}
        />
        <InputField
          label='Company Name'
          type='text'
          value={companyName}
          onChange={handleTemplateChange(setCompanyName)}
        />
        <InputField
          label='Effective Date'
          type='date'
          value={effectiveDate}
          onChange={handleTemplateChange(setEffectiveDate)}
        />
        <InputField
          label='Last Date'
          type='date'
          value={lastDate}
          onChange={handleTemplateChange(setLastDate)}
        />
      </form>
      <div>{getMessage()}</div>
    </div>
  );
};

export default EmailTemplates;
