import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import iService from '../../../services/service';
import { toast } from 'react-toastify';
import SettingDetails from './settingDetails';
import SettingDetailsSimples from './detailsSimple';
import HobbesForm from './components/hobbesForm';
import IdiomasForm from './components/idiomasForm';
import SkillsForm from './components/skillsForm';

import { useAuth } from '../../../contexts/auth';

const MobileSettingsScreen = () => {
  const [userFullName, setUserFullName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userBirthday, setUserBirthday] = useState('');
  const [userJobsInteristing, seJobsInteristing] = useState('');
  const [userHobbes, setUserHobbes] = useState([]);
  const [userDetais, setUserDetails] = useState([]);
  const [userLanguage, setUserLanguage] = useState([]);
  const [userContacts, setUserContacts] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [curriculoId, setCurriculoId] = useState('');
  const [autoRefresh, setAutoRefresh] = useState('');
  const [pessoaId, setPessoaId] = useState('');
  const { signOut } = useAuth();

  const getDefaultSettings = () => {
    const user = localStorage.getItem('@jobs:user');
    if (user) {
      const { PessoaId } = JSON.parse(user);
      iService
        .fetch({
          getById: { field: 'Id', value: PessoaId, consts: 'CandidatoId' },
          table: 'Curriculo',
          properties: ` Id
        Designacao
        Status
        CandidatoId
        ResumoProfissional
        Candidato {
          Id
          Nome
          SobreNome
          Morada
          PessoaContacto{Id Contacto{Telefone Email Id }}
          PessoaIdiomas{Id Percentagem Idioma{Id Designacao}}
          DataNascimento
          Status
          EstadoId
          createdAt
          updatedAt
        }
        CurriculoSkills{Skills{Id Designacao Percentagem Descricao }}
        CurriculoDetalhes {
          Detalhe {
            Id
            Designacao
            NomeDaInstituicao
            DescricaoDaInstituicao
            LocalDaInstituicao
            DataInicio
            DataFim
            TipoDetalhe{Descricao}
          }
        }
        CurriculoHobes{Hobes{Id Designacao Percentagem Descricao }}
        EstadoId
        createdAt
        updatedAt`,
        })
        .then((Curriculo) => {
          if (!Curriculo.ok) return toast.error(Curriculo?.errors[0]?.message);
          const {
            Id,
            Designacao,
            Candidato,
            CurriculoSkills,
            CurriculoDetalhes,
            CurriculoHobes,
          } = Curriculo.data;
          const {
            Id: PessoaId,
            Nome,
            SobreNome,
            DataNascimento,
            Morada,
            PessoaContacto,
            PessoaIdiomas,
          } = Candidato;

          setPessoaId(PessoaId);
          setUserAddress(Morada);
          setUserBirthday(DataNascimento);
          setUserFullName(`${Nome} ${SobreNome}`);
          seJobsInteristing(Designacao);

          setCurriculoId(Id);
          setUserContacts(
            PessoaContacto?.map(({ Contacto }) => ({
              ...Contacto,
            }))
          );

          setUserLanguage(
            PessoaIdiomas?.map(({ Percentagem, Idioma }) => ({
              Percentagem,
              ...Idioma,
            }))
          );

          setUserSkills(
            CurriculoSkills?.map(({ Skills }) => ({
              ...Skills,
            }))
          );
          setUserHobbes(
            CurriculoHobes?.map(({ Hobes }) => ({
              ...Hobes,
            }))
          );
          setUserDetails(
            CurriculoDetalhes?.map(({ Detalhe }) => ({
              ...Detalhe,
              TipoDetalhe: Detalhe.TipoDetalhe?.Designacao,
            }))
          );
        });
    }
  };

  useEffect(() => {
    getDefaultSettings();
  }, [autoRefresh]);

  const addHobbesOrSkills = async (formData, table) => {
    formData.CurriculoId = curriculoId;

    const response = await iService.store({
      table: table,
      type: 'STORE',
      useExclamation: false,
      properties: 'Id',
      value: formData,
    });

    if (response.errors) {
      return toast.error(response.errors[0].message);
    }

    setAutoRefresh(Math.random);
    return toast.success(`${table} adicionada.`);
  };

  const addIdiomas = async (formData) => {
    formData.PessoaId = pessoaId;

    const response = await iService.store({
      table: 'Pessoaidiomas',
      type: 'STORE',
      useExclamation: false,
      properties: 'Id',
      value: formData,
    });

    if (response.errors) {
      return toast.error(response.errors[0].message);
    }
    setAutoRefresh(Math.random);
    return toast.success('Hobbes adicionada.');
  };

  const updateHobesOrSkill = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <div>
        <i
          className="flaticon-user-5"
          style={{
            fontSize: '40px',
            position: 'absolute',
            top: '-14px',
            color: '#ffc001',
            left: '27px',
          }}
        ></i>{' '}
        <span
          style={{
            position: 'absolute',
            top: '0px',
            left: ' 50%',
            fontSize: '23px',
            fontWeight: 'bold',
            width: '100%',
            transform: 'translateX(-25%)',
          }}
        >
          Definições do usúario
        </span>
      </div>
      <Container>
        <div className="card card-pricing" style={{ width: '90%' }}>
          <div className="card-header">
            <h4 className="card-title">
              <i
                onClick={() => {
                  alert('Tem certeza que deseja sair?..');
                  signOut();
                }}
                className="flaticon-power mr-3 text-danger"
                style={{ fontSize: '40px' }}
              ></i>
            </h4>
            <div className="card-price">
              <span className="price text-black" style={{ color: '#333' }}>
                {userFullName}
              </span>
            </div>
          </div>
          <div className="card-body">
            <ul className="specification-list">
              <SettingDetailsSimples
                value={userBirthday}
                title="Data Nascimento"
              />
              <SettingDetailsSimples
                value={userJobsInteristing}
                title="Função"
              />
              <SettingDetailsSimples value={userAddress} title="Morada" />
              <SettingDetailsSimples
                value={userBirthday}
                title="Data Nascimento"
              />
              <SettingDetailsSimples
                value={userContacts[0]?.Telefone}
                title="Telefone"
              />
              <SettingDetailsSimples
                value={userContacts[0]?.Email}
                title="E-mail"
              />
              <SettingDetails
                details={userLanguage}
                title="Idiomas"
                componentRender={<IdiomasForm />}
                callback={(e) => {
                  addIdiomas(e);
                }}
              />
              <SettingDetails
                details={userSkills}
                title="Hablidades"
                componentRender={<SkillsForm />}
                callback={(e) => {
                  addHobbesOrSkills(e, 'Skills');
                }}
              />
              <SettingDetails
                details={userHobbes}
                title="Hobbes"
                componentRender={<HobbesForm />}
                callback={(e, isUpdate) => {
                  if (isUpdate) return updateHobesOrSkill(e);
                  addHobbesOrSkills(e, 'Hobes');
                }}
              />
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default MobileSettingsScreen;
