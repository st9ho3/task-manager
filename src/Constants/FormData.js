export const RegistrationFormData = [
    {
      element: 'label',
      htmlFor: 'username',
      content: 'Username',
      id:1
    },
    {
      element: 'input',
      type: 'text',
      placeholder: 'Enter your username',
      name: 'username',
      value: '',
      onChange: () => {},
      id:2
    },
    {
      element: 'label',
      htmlFor: 'email',
      content: 'Email',
      id:3
    },
    {
      element: 'input',
      type: 'email',
      placeholder: 'Enter your email',
      name: 'email',
      value: '',
      onChange: () => {},
      id:4
    },
    {
      element: 'label',
      htmlFor: 'password',
      content: 'Password',
      id:5
    },
    {
      element: 'input',
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password',
      value: '',
      onChange: () => {},
      id:6
    },
    {
      element: 'label',
      htmlFor: 'confirmPassword',
      content: 'Confirm Password',
      id:7
    },
    {
      element: 'input',
      type: 'password',
      placeholder: 'Confirm your password',
      name: 'confirmPassword',
      value: '',
      onChange: () => {},
      id:8
    },
    {
      element: 'input',
      type: 'checkbox',
      name: 'agreeWithTermsOfService',
      id:10,
      onchange: () => {},
      checked: false
    },
    {
      element: 'button',
      onclick: () => {},
      content: 'Create Account',
      id:11
    }
  ];

  export const loginData = [
    {
      id: 1,
      element: 'label',
      htmlFor: 'email',
      content: 'Email',
    },
    {
      id: 2,
      element: 'input',
      type: 'email',
      placeholder: 'Enter your email',
      name: 'email',
    },
    {
      id: 3,
      element: 'label',
      htmlFor: 'password',
      content: 'Password',
    },
    {
      id: 4,
      element: 'input',
      type: 'password',
      placeholder: 'Enter your password',
      name: 'password',
    },
    {
      id: 6,
      element:'input',
      className: 'terms-container',
      content: 'Remember me',
      name: 'rememberMe',
      type: 'checkbox',
    },
  ];