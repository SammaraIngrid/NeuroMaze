const questions = [
  {
    question: 'Qual é o maior animal terrestre?',
    options: ['Elefante', 'Girafa', 'Rinoceronte', 'Hipopótamo'],
    answer: 'Elefante',
  },
  {
    question: 'Qual é a capital da França?',
    options: ['Berlim', 'Madri', 'Paris', 'Roma'],
    answer: 'Paris',
  },
  {
    question: 'Qual planeta é conhecido como o Planeta Vermelho?',
    options: ['Terra', 'Marte', 'Júpiter', 'Vênus'],
    answer: 'Marte',
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: ['Shakespeare', 'Cervantes', 'Goethe', 'Dickens'],
    answer: 'Cervantes',
  },
  {
    question: 'Qual é a moeda oficial do Japão?',
    options: ['Yuan', 'Won', 'Iene', 'Dólar'],
    answer: 'Iene',
  },
  {
    question: 'Qual é o maior oceano do mundo?',
    options: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
    answer: 'Pacífico',
  },
  {
    question: 'Qual é o símbolo químico da água?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    answer: 'H2O',
  },
  {
    question: 'Quem pintou a Mona Lisa?',
    options: ['Michelangelo', 'Leonardo da Vinci', 'Van Gogh', 'Picasso'],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Em que ano o homem pisou na Lua pela primeira vez?',
    options: ['1969', '1958', '1974', '1980'],
    answer: '1969',
  },
  {
    question: 'Qual é a capital do Canadá?',
    options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
    answer: 'Ottawa',
  },
  {
    question: 'Qual é o elemento químico com o símbolo Au?',
    options: ['Prata', 'Cobre', 'Ouro', 'Alumínio'],
    answer: 'Ouro',
  },
  {
    question: 'Quem escreveu "A Origem das Espécies"?',
    options: [
      'Isaac Newton',
      'Albert Einstein',
      'Charles Darwin',
      'Galileu Galilei',
    ],
    answer: 'Charles Darwin',
  },
  {
    question: 'Qual é a montanha mais alta do mundo?',
    options: ['K2', 'Everest', 'Kangchenjunga', 'Makalu'],
    answer: 'Everest',
  },
  {
    question: 'Qual país é conhecido como a Terra do Sol Nascente?',
    options: ['China', 'Coreia do Sul', 'Tailândia', 'Japão'],
    answer: 'Japão',
  },
  {
    question: 'Qual é o menor continente do mundo?',
    options: ['Europa', 'Antártida', 'Oceania', 'América do Sul'],
    answer: 'Oceania',
  },
  {
    question: 'Quem foi o primeiro presidente do Brasil?',
    options: [
      'Getúlio Vargas',
      'Dom Pedro II',
      'Deodoro da Fonseca',
      'Juscelino Kubitschek',
    ],
    answer: 'Deodoro da Fonseca',
  },
  {
    question: 'Qual é o idioma oficial do Egito?',
    options: ['Inglês', 'Francês', 'Árabe', 'Espanhol'],
    answer: 'Árabe',
  },
  {
    question: 'Qual é o maior planeta do Sistema Solar?',
    options: ['Terra', 'Júpiter', 'Saturno', 'Netuno'],
    answer: 'Júpiter',
  },
  {
    question: 'Qual artista é conhecido por cortar sua própria orelha?',
    options: ['Picasso', 'Van Gogh', 'Rembrandt', 'Monet'],
    answer: 'Van Gogh',
  },
  {
    question: 'Quem descobriu o Brasil?',
    options: [
      'Pedro Álvares Cabral',
      'Cristóvão Colombo',
      'Vasco da Gama',
      'Américo Vespúcio',
    ],
    answer: 'Pedro Álvares Cabral',
  },
  {
    question: 'Em que continente fica o deserto do Saara?',
    options: ['Ásia', 'América', 'África', 'Europa'],
    answer: 'África',
  },
  {
    question:
      'Qual é o nome do processo pelo qual as plantas produzem alimento?',
    options: ['Fermentação', 'Fotossíntese', 'Respiração', 'Digestão'],
    answer: 'Fotossíntese',
  },
  {
    question: 'Qual é o maior rio do mundo em volume de água?',
    options: ['Amazonas', 'Nilo', 'Yangtzé', 'Mississipi'],
    answer: 'Amazonas',
  },
  {
    question: 'Quantos lados tem um hexágono?',
    options: ['Cinco', 'Seis', 'Sete', 'Oito'],
    answer: 'Seis',
  },
  {
    question: 'Qual é o país com a maior população do mundo?',
    options: ['Índia', 'Estados Unidos', 'Indonésia', 'China'],
    answer: 'China',
  },
  {
    question: 'Quem escreveu a peça "Romeu e Julieta"?',
    options: ['Molière', 'William Shakespeare', 'Victor Hugo', 'Sófocles'],
    answer: 'William Shakespeare',
  },
  {
    question: 'Qual é a camada mais externa da Terra?',
    options: ['Manto', 'Crosta', 'Núcleo Interno', 'Núcleo Externo'],
    answer: 'Crosta',
  },
  {
    question: 'Quantos segundos tem um minuto?',
    options: ['60', '100', '30', '45'],
    answer: '60',
  },
  {
    question: 'Qual é a cor resultante da mistura de azul com amarelo?',
    options: ['Verde', 'Laranja', 'Roxo', 'Marrom'],
    answer: 'Verde',
  },
  {
    question: 'Quem foi Albert Einstein?',
    options: [
      'Um pintor',
      'Um físico',
      'Um filósofo',
      'Um matemático da Grécia Antiga',
    ],
    answer: 'Um físico',
  },
  {
    question: 'Qual é o continente onde fica o Brasil?',
    options: ['América do Sul', 'África', 'Europa', 'Ásia'],
    answer: 'América do Sul',
  },
  {
    question: 'O que é a fotossíntese?',
    options: [
      'Transformação de luz em energia pelas plantas',
      'Processo digestivo dos animais',
      'Reação química de combustão',
      'Ciclo da água',
    ],
    answer: 'Transformação de luz em energia pelas plantas',
  },
  {
    question: 'Qual é o número atômico do oxigênio?',
    options: ['6', '8', '10', '12'],
    answer: '8',
  },
  {
    question: 'Qual é o idioma mais falado no mundo?',
    options: ['Inglês', 'Espanhol', 'Chinês Mandarim', 'Árabe'],
    answer: 'Chinês Mandarim',
  },
  {
    question: 'Quantos continentes existem?',
    options: ['5', '6', '7', '8'],
    answer: '6',
  },
  {
    question: 'Qual é a fórmula da área do quadrado?',
    options: ['L × L', 'π × r²', 'b × h / 2', '2 × (L + A)'],
    answer: 'L × L',
  },
  {
    question: 'Quem pintou o teto da Capela Sistina?',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
    answer: 'Michelangelo',
  },
  {
    question: 'O que os astronautas usam para respirar no espaço?',
    options: [
      'Tanques de oxigênio',
      'Máscaras de ar',
      'Ventiladores solares',
      'Plantas',
    ],
    answer: 'Tanques de oxigênio',
  },
  {
    question: 'Quantos dentes permanentes um adulto geralmente possui?',
    options: ['28', '30', '32', '36'],
    answer: '32',
  },
  {
    question: 'Qual é o principal gás responsável pelo efeito estufa?',
    options: ['Oxigênio', 'Gás carbônico', 'Nitrogênio', 'Hidrogênio'],
    answer: 'Gás carbônico',
  },
  {
    question: 'Em que país fica a Torre Eiffel?',
    options: ['Itália', 'Alemanha', 'França', 'Espanha'],
    answer: 'França',
  },
  {
    question: 'Qual é o número pi (π) arredondado para duas casas decimais?',
    options: ['3,12', '3,14', '3,16', '3,18'],
    answer: '3,14',
  },
  {
    question: 'Qual é o maior órgão do corpo humano?',
    options: ['Fígado', 'Coração', 'Pele', 'Pulmão'],
    answer: 'Pele',
  },
  {
    question: 'Que tipo de animal é a baleia?',
    options: ['Peixe', 'Réptil', 'Mamífero', 'Anfíbio'],
    answer: 'Mamífero',
  },
  {
    question: 'Qual é o principal ingrediente do pão?',
    options: ['Açúcar', 'Fermento', 'Farinha', 'Sal'],
    answer: 'Farinha',
  },
  {
    question: 'Quem inventou a lâmpada elétrica?',
    options: [
      'Nikola Tesla',
      'Isaac Newton',
      'Thomas Edison',
      'Benjamin Franklin',
    ],
    answer: 'Thomas Edison',
  },
];

export default questions;
