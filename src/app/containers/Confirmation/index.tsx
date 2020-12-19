import * as React from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { Button } from 'app/components/Button';
import { convertCompilerOptionsFromJson } from 'typescript';
import { useLocation, useHistory } from 'react-router-dom';

export function Confirmation() {
  const { t } = useTranslation();
  const location: any = useLocation();
  const history: any = useHistory();
  const myparams: any = location.state.params;

  const handleHome = e => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h2>{t(translations.confirmation.title)}</h2>
        <p>
          {t(translations.subscribe.form.email)}: {myparams.email}
        </p>
        <p>
          {t(translations.subscribe.form.postalCode)}: {myparams.postalCode}
        </p>
        <Button onClick={handleHome}>Home Page</Button>
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
