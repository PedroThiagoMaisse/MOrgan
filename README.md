# M_organ
My personal day to day app

## next steps

### release 1:
- Criar um componente de test visual
    - ~Input~
    - ~Select~
    - ~Button~
    - ~Checkbox~
    - ~Date~
    - ~X (cancel)~
    - ~Card~
    - ~Titles~
    - ~Text~
    - Diálogos


- Configurações
    - Criar avisinhos
    - No caso da plataforma estar rodando dentro de um ambiente de dev, automaticamente puxar o componente de tester, ter uma opção nas configs para puxar isso
    - Avisar que as informações são salvas apenas localmente


- Organização
    - ~Better readme~
    - ~Limpar arquivos antigos~
    - Organizar os arquivos
    - Novas fotos e nome de pacote e no header do navegador
    - Criar os projetos derivados

- Login
    - Definir como vai ser

- QuickNotes
    <details>
    -~ Object Reading Navbar~
    -~ Changing selected~
    -~ Replicating change in main screen~
    -~ Different notes~
    -~ Organization ~
    -~Salvar o HTML atual~
    -~Get caret position every change (https://jsfiddle.net/TjXEG/900/)~
        - ~BUG Quando tem uma line vazia isso só n funciona~
    - ~Organização~
    - ~Loop por cada elemento~
    - ~Marcar a posição atual do caret~
    - ~Passar de html para texto simples, guardar isso~
    - ~Jogar as classes CSS~
    - ~Limpar as classes que não existem mais~
    - ~Change caret position (https://jsfiddle.net/vgmbdpa5/10/) to the marked~
        - ~BUG Só muda para o final da linha >>> mirar p/ dentro do elemento de texto~
    - ~Executar on start~
    - ~Não deixar sub repetir~
    - ~Só executar a função na linha atual~
    - ~Quando deleta o botão de adicionar some~
    - ~Postar as informações só a cada x segundos~
    - ~Criar novos folders e textos~
    
    - UX/UI
    - Salvar a última data de modificação
    - Separar o quando o elemento é um sub repetido
    </details>


- Planner
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
    - Mudar do padrão atual para real dates
        - Criar uma função para passar da realdate para um padrão legível (Deve ter algo já natural de js)
    - Organizar as funções
    - Tasks Unicas
    - Limite de data p/ tasks
    - *Gameficação*

- Projects
    - Features e releases
    - Tasks para cada projeto
    - Data limite para essas coisas
    - *FUTURO* método da Olive mostrar esses dados em outros lugares
    
- Criar coldStorage (Geladeira)
    Um service escondidinho para ajudar no controle de array-id data type, por enquanto só para svelte e futuramente trazer ele como geral
    - Mudar o sistema atual para conectar com ele (como node package)
    - Dar a opção dele conectar com um backend, com troca de login e tals

- Criar olive
    UM BE para conexão com mongo
    - Sistema de login BEEEM seguro
    - Deixar o FE fazer o manage da maioria das coisas
    - Criação de regras para visualização de dados públicos
    - Otimizar esse de cima que sei que vai dar trabalho