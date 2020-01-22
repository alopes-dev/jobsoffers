import AddCandidato from './components/Views/Candidato/addCandidato'
import ListCandidato from './components/Views/Candidato/listCandidato'
import AddOportunidade from './components/Views/Oportunidade/addOportunidade';
import Dashboard from './components/Views/Dashboard/dashboard';

const routes = [

    {
        name: "Dashboard",
        path: "/dashboard",
        icon: "flaticon-home",
        layout: '/admin',
        components: Dashboard
    },

    {
        name: "Oportunidade",
        icon: "flaticon-idea",
        collapse: true,
        children: [{
                name: "Oportunidades",
                path: "/analitics",
            },
            {
                name: "Novo Oportunidade",
                path: "/oportunidade",
                components: AddOportunidade,
                privice: 'admin'
            }
        ]

    },
    {
        name: "Candidato",
        icon: "icon-people",
        collapse: true,
        children: [{
                name: "Candidatos",
                path: "/list-candidato",
                action: 'Listagem',
                components: ListCandidato,
                aliasIcon: 'icon-people'
            },
            {
                name: "Novo Candidatos",
                path: "/candidato",
                components: AddCandidato,
                action: 'Formúlario',
                privice: 'admin',
                aliasIcon: 'icon-user-follow'
            }
        ]

    },
    {
        name: "Candidatura",
        path: "/Candidatura",
        icon: "icon-tag",
    },
    {
        name: "Serviços",
        path: "/servicos",
        icon: "flaticon-technology-1",
    },
    {
        name: "Alerta de vagas",
        path: "/alertaDeVagas",
        icon: "flaticon-alarm-1",
    },
    {
        name: "Curriculo",
        path: "/curriculo",
        icon: "flaticon-shapes",
    },
    {
        name: "Procurar VC",
        path: "/procurarVC",
        icon: "flaticon-search-1",
    },
    {
        name: "Beneficios",
        path: "/Beneficios",
        icon: "icon-support",
        components: AddCandidato
    },
    {
        name: "Empresa",
        path: "/Empresa",
        icon: "icon-compass",
    },
    {
        name: "Cargos",
        path: "/Cargos",
        icon: "icon-briefcase",
    }
]

export default routes;