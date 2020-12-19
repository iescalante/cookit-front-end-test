import * as React from 'react';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { Button } from 'app/components/Button';
import { convertCompilerOptionsFromJson } from 'typescript';

export function Confirmation() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>Confirmation Page</Wrapper>
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
