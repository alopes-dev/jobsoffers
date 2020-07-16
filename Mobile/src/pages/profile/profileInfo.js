import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/service';

import {
  SectionContainer,
  Section,
  SectionHeader,
  SectionBody,
  ListItem,
  SectionIcon,
  SectionText,
  ListText,
  Username,
  UserJobs,
  ListTextPercentage,
  DetailsItem,
  DetailTitle,
  DetailDesignacao,
  DetailTime,
} from './style';

export default function ProfileInfo() {
  const [language, setLanguage] = useState([]);
  const [skill, setSkill] = useState([]);
  const [hobes, setHobes] = useState([]);
  const [userTitle, setUserTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [resumoProfissional, setResumoProfissional] = useState('');
  const [curriculoDetalhes, setCurriculoDetalhes] = useState([]);

  async function loadInfos() {
    const storageUser = await AsyncStorage.getItem('@jobs:user');
    const { PessoaId } = JSON.parse(storageUser);
    api
      .fetch({
        getById: {
          consts: 'Id',
          field: 'Id',
          value: PessoaId,
        },
        table: 'Pessoa',
        properties: 'PessoaIdiomas { Id Percentagem Idioma { Id Designacao } }',
      })
      .then((langs) => {
        if (langs.errors) {
          return;
        }
        const { PessoaIdiomas } = langs.data[0];

        const languages = PessoaIdiomas.map((lang) => {
          return {
            designacao: lang.Idioma.Designacao,
            percentagem: lang.Percentagem,
          };
        });
        setLanguage(languages);
      });

    api
      .fetch({
        getById: {
          consts: 'CandidatoId',
          field: 'Id',
          value: PessoaId,
        },
        table: 'Curriculo',
        properties: `
        Designacao
        Candidato {
          Nome
          SobreNome
        }
        ResumoProfissional
        CurriculoDetalhes
         { Id Detalhe { Id Designacao NomeDaInstituicao DescricaoDaInstituicao LocalDaInstituicao DataInicio DataFim TipoDetalhe{Designacao} } }
        CurriculoSkills
         { Skills { Id Designacao Percentagem Descricao Status EstadoId createdAt updatedAt } }
          CurriculoHobes { Hobes { Id Designacao Percentagem } }`,
      })
      .then((curriclo) => {
        if (curriclo.errors) {
          return;
        }
        const {
          CurriculoSkills,
          CurriculoHobes,
          CurriculoDetalhes,
          Designacao,
          Candidato,
          ResumoProfissional,
        } = curriclo.data;

        const curriculoSkills = CurriculoSkills.map((curriculoSkill) => {
          return {
            designacao: curriculoSkill.Skills.Designacao,
            percentagem: curriculoSkill.Skills.Percentagem,
          };
        });

        const curriculoHobes = CurriculoHobes.map((curriculoHobe) => {
          return {
            designacao: curriculoHobe.Hobes.Designacao,
            percentagem: curriculoHobe.Hobes.Percentagem,
          };
        });

        const curriculoDetal = CurriculoDetalhes.map((curriculoDetalhe) => {
          curriculoDetalhe.Detalhe.TipoDetalhe =
            curriculoDetalhe.Detalhe?.TipoDetalhe?.Designacao;
          return {
            ...curriculoDetalhe.Detalhe,
          };
        });

        setUserTitle(Designacao);
        setUserName(`${Candidato.Nome} ${Candidato.SobreNome}`);
        setHobes(curriculoHobes);
        setSkill(curriculoSkills);
        setResumoProfissional(ResumoProfissional);
        setCurriculoDetalhes(curriculoDetal);
      });
  }

  useEffect(() => {
    loadInfos();
  }, []);

  return (
    <ScrollView>
      <SectionContainer>
        <Section>
          <SectionHeader>
            <SectionIcon>
              <SimpleLineIcons size={25} name="info" />
            </SectionIcon>
            <SectionText>Informação Curricular</SectionText>
          </SectionHeader>
          <SectionBody>
            <ListItem>
              <Username>{userName}</Username>
            </ListItem>
            <ListItem>
              <UserJobs>{userTitle}</UserJobs>
            </ListItem>

            {curriculoDetalhes.map((detalhe) => (
              <ListItem>
                <DetailsItem>
                  <DetailTitle>{detalhe.TipoDetalhe}</DetailTitle>
                  <DetailDesignacao>{detalhe.Designacao}</DetailDesignacao>
                  <DetailTime>
                    {detalhe.DataInicio} à {detalhe.DataInicio}
                  </DetailTime>
                  <DetailDesignacao>
                    Instituição: {detalhe.NomeDaInstituicao}
                  </DetailDesignacao>
                  <DetailDesignacao>
                    Local: {detalhe.LocalDaInstituicao}
                  </DetailDesignacao>
                </DetailsItem>
              </ListItem>
            ))}
          </SectionBody>
        </Section>
        <Section>
          <SectionHeader>
            <SectionIcon>
              <FontAwesome size={25} name="grav" />
            </SectionIcon>
            <SectionText>Competências</SectionText>
          </SectionHeader>
          <SectionBody>
            {skill.map((sk) => (
              <ListItem>
                <ListText>{sk.designacao}</ListText>
                <ListTextPercentage>{sk.percentagem} %</ListTextPercentage>
              </ListItem>
            ))}
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader>
            <SectionIcon>
              <Icon size={25} name="md-globe" />
            </SectionIcon>
            <SectionText>Idiomas</SectionText>
          </SectionHeader>
          <SectionBody>
            {language.map((lang) => (
              <ListItem>
                <ListText>{lang.designacao}</ListText>
                <ListTextPercentage>{lang.percentagem} %</ListTextPercentage>
              </ListItem>
            ))}
          </SectionBody>
        </Section>
        <Section>
          <SectionHeader>
            <SectionIcon>
              <Icon size={25} name="ios-folder" />
            </SectionIcon>
            <SectionText>Hobbes</SectionText>
          </SectionHeader>
          <SectionBody>
            {hobes.map((sk) => (
              <ListItem>
                <ListText>{sk.designacao}</ListText>
                <ListTextPercentage>{sk.percentagem} %</ListTextPercentage>
              </ListItem>
            ))}
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader>
            <SectionIcon>
              <Icon size={25} name="ios-folder" />
            </SectionIcon>
            <SectionText>Descrições</SectionText>
          </SectionHeader>
          <SectionBody>
            <ListItem>
              <ListText>{resumoProfissional}</ListText>
            </ListItem>
          </SectionBody>
        </Section>
      </SectionContainer>
    </ScrollView>
  );
}
