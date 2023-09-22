## Artakecraft Note

I've created a brand-new program called Artakecraft Note to handle all of my writing requirements (I write books!). I take advantage of ChatGPT's grammar checker and paraphrase function to handle a novelist's research needs. I will run a beta test in November, contemplating the writer's month. This will also be made available the following year with a subscription-based payment system.

## Software Needed

- [Nodejs 18.17.1LTS](https://nodejs.org/en)
- [MongoDB cluster](https://cloud.mongodb.com/)
- [VScode](https://code.visualstudio.com/download)

### Nice to have Extensions

- ES7+ React/Redux/React-Native snippets
- JavaScript and TypeScript Nightly
- Material Icon Theme
- Prettier - Code formatter
- Pretty TypeScript Errors
- Tailwind CSS intelliSense

## Development Environment

### Downloading the project

- Fork the project (Artakecraft Note)
- Clone your fork `git clone "https-clone-link"`
- Navigate to fork's directory
- Install all the needed modules `npm install`

### Running the project

- Make an account in MongoDB
- Create a free tier cluster
- Open the clone fork with vscode
- Create a new file and name it `.env`
- Add your MongoDB creadentials `NEXT_PUBLIC_MONGODB="mongodb-credentials"`

### Sending a Pull Request

- After making changes run the command `npm run lint`,
- Fix all the warnings/errors the lint throw
- After fixing lint warnings/errors run the command `npm run format`
- Add all the changes `git add .`
- Stage your commit `git add commit -m "Your Message"`
- Upload your changes `git puch origin branch`
- Make a PR request directly to the original copy of project

## Contributor

- Terrence Calzada (TezadaConnect)
