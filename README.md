# M_organ
My personal day to day app

## next steps

### release 1:
- ~Criar um componente de test visual~
    <details>
    - ~Input~
    - ~Select~
    - ~Button~
    - ~Checkbox~
    - ~Date~
    - ~X (cancel)~
    - ~Card~
    - ~Titles~
    - ~Text~
    - ~Arrumar os elementos~
    - ~Diálogos~
    </details>


- ~Configurações~
    <details>
    - ~Criar avisinhos~
    - ~No caso da plataforma estar rodando dentro de um ambiente de dev, automaticamente puxar o componente de tester, ter uma opção nas configs para puxar isso
    - ~Avisar que as informações são salvas apenas localmente~
    - ~Opção para retirar os avisos~
    - ~Método externo para adicionar avisos~
    - ~Novo padrão p/ botões de opções~
    - ~Colocar task e notes padrões~
    - ~Método de mostrar o coisa de teste~
    - ~Escrever em algum lugar os padrões aceitáveis para cada componente~
    - ~Expor configs padrões para o router e pegar ela nas configs:~
        - ~Gerar notes e tasks padrões~
        - ~Mudar o timing de html - md~

    - ~Bug das notes~
    </details>


- ~Organização~
    <details>
    - ~Better readme~
    - ~Limpar arquivos antigos~
    - ~Organizar os arquivos~
    - ~Novas fotos e nome de pacote e no header do navegador~
    </details>

- ~QuickNotes~
    <details>
    - ~Object Reading Navbar~
    - ~Changing selected~
    - ~Replicating change in main screen~
    - ~Different notes~
    - ~Organization~

    - ~Salvar o HTML atual~
    - ~Get caret position every change~
    - ~Organização~
    - ~Loop por cada elemento~
    - ~Marcar a posição atual do caret~

    - ~Passar de html para texto simples, guardar isso~
    - ~Jogar as classes CSS~
    - ~Limpar as classes que não existem mais~
    - ~Change caret position to the marked~
    - ~Executar on start~
    - ~Não deixar sub repetir~
    - ~Só executar a função na linha atual~
    - ~Quando deleta o botão de adicionar some~
    - ~Postar as informações só a cada x segundos~
    - ~Criar novos folders e textos~
    
    - ~Mudar de p para uma tag de buttão-text~
    - ~Resolver os bugs quando é passado de html para md~
        - ~Primeira linha não ser div~
        - ~Criação de Divs multilinhas~
        - ~MD não ta trocando kkk~
        - ~Quando a pessoa apertar enter, salvar a posição do caret e trocar depois da func~
    - ~UX/UI~
    - ~Separar o quando o elemento é um sub repetido~
    </details>


- ~Planner~
    <details>
    - ~Show WeekBased - show what day of the week and entire week~
    - ~Show another week~
    - ~Show last 3 days~
    - ~Better UI~
    - ~Create an task~
    - ~Checking task~
    - ~Weekly Tasks~
    - ~Deleting Tasks~
    - ~Generating ID on create~
    - ~show only availables for that day~
    - ~Good color when everything is completed~
    DELAYED:
    - Mudar do padrão atual para real dates
        - Criar uma função para passar da realdate para um padrão legível (Deve ter algo já natural de js)
    - Organizar as funções
    - Tasks Unicas
    - Limite de data p/ tasks
    </details>

### release 2:

- Features
    - Font padrão (linkar ela)
    - Melhorar a UI
    - Nova img
    - Juntar o router e o config em um só obj, lembrar tb dos dados padrões p/ login novo
    - Criar doc para APIs (warning, coldStorage, router, config)

- Projects
    <details>
    - Features e releases
    - Tasks para cada projeto
    - Data limite para essas coisas
    - *FUTURO* método da Olive mostrar esses dados em outros lugares
    </details>

- Tasks *Gameficação*
    - Mudar do padrão atual para real dates
        - Criar uma função para passar da realdate para um padrão legível (Deve ter algo já natural de js)
    - Organizar as funções
    - Tasks Unicas
    - Limite de data p/ tasks

- Notes
    - Mudar de style p/ tags
    - Adicionar o número de linhas do lado esquerdo
    - Melhorar o funcionamento
### release 3:

- FrontPages

- APKS

### release 4:

- Login

- Configurações
    <details>
    - Conexão com o Handler de erros
    - Qualquer async que possa dar erro jogar aqui
    </details>

- Criar coldStorage (Geladeira)
    <details>
    Um service escondidinho para ajudar no controle de array-id data type, por enquanto só para svelte e futuramente trazer ele como geral
    - Mudar o sistema atual para conectar com ele (como node package)
    - Dar a opção dele conectar com um backend, com troca de login e tals
    </details>

- Criar olive
    <details>
    UM BE para conexão com mongo
    - Sistema de login BEEEM seguro
    - Deixar o FE fazer o manage da maioria das coisas
    - Criação de regras para visualização de dados públicos
    - Otimizar esse de cima que sei que vai dar trabalho
    </details>