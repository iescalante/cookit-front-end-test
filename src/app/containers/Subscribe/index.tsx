import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { FormLabel } from 'app/components/FormLabel';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';
import { convertCompilerOptionsFromJson } from 'typescript';

export function Subscribe() {
  const { t } = useTranslation();
  const history = useHistory();
  const axios = require('axios').default;

  const [email, setEmail] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [error, setError] = React.useState('');

  const emailRegexTest = x => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
  };
  const pCodeRegexTest = x => {
    return /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(
      x,
    );
  };

  const validateEmail = e => {
    setEmail(e.target.value);
    if (!emailRegexTest(e.target.value)) {
      console.log('incorrect format');
      setError(`${t(translations.error.email)}`);
    } else {
      console.log('incorrect format');
      setError('');
    }
  };
  const validatePostalCode = e => {
    setPostalCode(e.target.value);
    if (!pCodeRegexTest(e.target.value)) {
      console.log('incorrect format');
      setError(`${t(translations.error.postalCode)}`);
    } else {
      console.log('correct format');
      setError('');
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (emailRegexTest(email) && pCodeRegexTest(postalCode)) {
      console.log('good info');
    } else {
      console.log('bad info');
    }
    axios({
      method: 'post',
      url:
        'https://s9g64p6vzb.execute-api.us-east-1.amazonaws.com/default/interview-is-zip-valid',
      data: {
        zip: postalCode,
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        // console.log(error);
        console.log({
          is_deliverable: true,
          has_error: false,
          error_message: 'Not working',
        });
        if (!pCodeRegexTest(postalCode)) {
          setError('Postal Code not found');
        } else {
          setError('');
          history.push('/confirmation', { params: { email, postalCode } });
        }
      });
  };

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.subscribe.title)}</h1>
        <Form>
          <FormLabel htmlFor="email">
            {t(translations.subscribe.form.email)}
          </FormLabel>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={validateEmail}
          />
          <FormLabel htmlFor="postalCode">
            {t(translations.subscribe.form.postalCode)}
          </FormLabel>
          <Input
            type="text"
            name="postalCode"
            value={postalCode}
            onChange={validatePostalCode}
          />
          <Button type="submit" onClick={handleSubmit}>
            {t(translations.subscribe.form.submit)}
          </Button>
          {error.length > 2 && <div>{error}</div>}
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Form = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;
