export const formRequestSubmit = (form?: HTMLFormElement | null) => {
    if (!form) return;
  
    if (form.requestSubmit) form.requestSubmit();
    else {
      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.className = 'hiddenZoneV';
  
      form.appendChild(submitButton);
      submitButton.click();
      form.removeChild(submitButton);
    }
  };
  