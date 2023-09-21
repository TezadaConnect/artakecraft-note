// Used in Character Card Component
export const MBTI_LIST: { type: string; description: string }[] = [
  {
    type: 'ISTJ',
    description:
      'Quiet, serious, earn success by being thorough and dependable. Practical, matter-of-fact, realistic, and responsible. Decide logically what should be done and work toward it steadily, regardless of distractions. Take pleasure in making everything orderly and organized—their work, their home, their life. Value traditions and loyalty.'
  },
  {
    type: 'ISFJ',
    description:
      'Quiet, friendly, responsible, and conscientious. Committed and steady in meeting their obligations. Thorough, painstaking, and accurate. Loyal, considerate, notice and remember specifics about people who are important to them, concerned with how others feel. Strive to create an orderly and harmonious environment at work and at home.'
  },
  {
    type: 'INFJ',
    description:
      'Seek meaning and connection in ideas, relationships, and material possessions. Want to understand what motivates people and are insightful about others. Conscientious and committed to their firm values. Develop a clear vision about how best to serve the common good. Organized and decisive in implementing their vision.'
  },
  {
    type: 'INTJ',
    description:
      'Have original minds and great drive for implementing their ideas and achieving their goals. Quickly see patterns in external events and develop long-range explanatory perspectives. When committed, organize a job and carry it through. Skeptical and independent, have high standards of competence and performance—for themselves and others.'
  },
  {
    type: 'ISTP',
    description:
      'Tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work and readily get through large amounts of data to isolate the core of practical problems. Interested in cause and effect, organize facts using logical principles, value efficiency.'
  },
  {
    type: 'ISFP',
    description:
      "Quiet, friendly, sensitive, and kind. Enjoy the present moment, what's going on around them. Like to have their own space and to work within their own time frame. Loyal and committed to their values and to people who are important to them. Dislike disagreements and conflicts; don't force their opinions or values on others."
  },
  {
    type: 'INFP',
    description:
      'Idealistic, loyal to their values and to people who are important to them. Want to live a life that is congruent with their values. Curious, quick to see possibilities, can be catalysts for implementing ideas. Seek to understand people and to help them fulfill their potential. Adaptable, flexible, and accepting unless a value is threatened.'
  },
  {
    type: 'INTP',
    description:
      'Seek to develop logical explanations for everything that interests them. Theoretical and abstract, interested more in ideas than in social interaction. Quiet, contained, flexible, and adaptable. Have unusual ability to focus in depth to solve problems in their area of interest. Skeptical, sometimes critical, always analytical.'
  },
  {
    type: 'ISTP',
    description:
      'Flexible and tolerant, take a pragmatic approach focused on immediate results. Bored by theories and conceptual explanations; want to act energetically to solve the problem. Focus on the here and now, spontaneous, enjoy each moment they can be active with others. Enjoy material comforts and style. Learn best through doing.'
  },
  {
    type: 'ENFP',
    description:
      'Warmly enthusiastic and imaginative. See life as full of possibilities. Make connections between events and information very quickly, and confidently proceed based on the patterns they see. Want a lot of affirmation from others, and readily give appreciation and support. Spontaneous and flexible, often rely on their ability to improvise and their verbal fluency.'
  },
  {
    type: 'ENTP',
    description:
      'Quick, ingenious, stimulating, alert, and outspoken. Resourceful in solving new and challenging problems. Adept at generating conceptual possibilities and then analyzing them strategically. Good at reading other people. Bored by routine, will seldom do the same thing the same way, apt to turn to one new interest after another.'
  },
  {
    type: 'ESTJ',
    description:
      'Practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done, focus on getting results in the most efficient way possible. Take care of routine details. Have a clear set of logical standards, systematically follow them and want others to also. Forceful in implementing their plans.'
  },
  {
    type: 'ESFJ',
    description:
      'Warmhearted, conscientious, and cooperative. Want harmony in their environment, work with determination to establish it. Like to work with others to complete tasks accurately and on time. Loyal, follow through even in small matters. Notice what others need in their day-to-day lives and try to provide it. Want to be appreciated for who they are and for what they contribute.'
  },
  {
    type: 'ENFJ',
    description:
      'Warm, empathetic, responsive, and responsible. Highly attuned to the emotions, needs, and motivations of others. Find potential in everyone, want to help others fulfill their potential. May act as catalysts for individual and group growth. Loyal, responsive to praise and criticism. Sociable, facilitate others in a group, and provide inspiring leadership.'
  },
  {
    type: 'ENTJ',
    description:
      'Frank, decisive, assume leadership readily. Quickly see illogical and inefficient procedures and policies, develop and implement comprehensive systems to solve organizational problems. Enjoy long-term planning and goal setting. Usually well informed, well read, enjoy expanding their knowledge and passing it on to others. Forceful in presenting their ideas.'
  },
  {
    type: 'ESFP',
    description:
      'Outgoing, friendly, and accepting. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen. Bring common sense and a realistic approach to their work and make work fun. Flexible and spontaneous, adapt readily to new people and environments. Learn best by trying a new skill with other people.'
  },
  {
    type: 'ESTP',
    description:
      'Flexible and tolerant, take a pragmatic approach focused on immediate results. Bored by theories and conceptual explanations; want to act energetically to solve the problem. Focus on the here and now, spontaneous, enjoy each moment they can be active with others. Enjoy material comforts and style. Learn best through doing.'
  }
]; // Official

// Used in ProjectModal Component
export const GENRE_OPTIONS = [
  {
    label: 'Drama',
    value: 'Drama'
  },
  {
    label: 'Fiction',
    value: 'Fiction'
  },
  {
    label: 'Non-Fiction',
    value: 'Non-Fiction'
  },
  {
    label: 'Poetry',
    value: 'Poetry'
  },
  // Drama
  {
    label: 'Tragedy',
    value: 'Tragedy'
  },
  {
    label: 'Comedy',
    value: 'Comedy'
  },
  // Fiction
  {
    label: 'Fantasy',
    value: 'Fantasy'
  },
  {
    label: 'Urban',
    value: 'Urban'
  },
  {
    label: 'Romance',
    value: 'Romance'
  },
  {
    label: 'Sci-fi',
    value: 'Sci-fi'
  },
  {
    label: 'Mystery',
    value: 'Mystery'
  },
  {
    label: 'Realistic Fiction',
    value: 'Realistic Fiction'
  },
  {
    label: 'Folklore',
    value: 'Folklore'
  },
  {
    label: 'Historical',
    value: 'Historical'
  }
];

// Used in Editor/id Page
export const CARD_LIST: { name: string; mbti: number; desc: string }[] = [
  {
    name: 'Joplin Rail',
    mbti: 1,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Royce Arcloud',
    mbti: 2,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Heim Buggatti',
    mbti: 3,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Josh Ferrari',
    mbti: 4,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Trail Sepak',
    mbti: 5,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Holm Jhonson',
    mbti: 6,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Dwayne Riley',
    mbti: 7,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Shierk Sepak',
    mbti: 8,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Sheik Ajumma',
    mbti: 9,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Loa Fei',
    mbti: 10,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Mang Canore',
    mbti: 11,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Sailr Aguinaldo',
    mbti: 12,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Gavin Santos',
    mbti: 13,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Japheth Eugmague',
    mbti: 14,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Jee Caro',
    mbti: 15,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  },
  {
    name: 'Cecillia Closeheimer',
    mbti: 16,
    desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas ullam, soluta tenetur alias impedit ratione! Impedit voluptate incidunt sit quam ex tenetur nihil, architecto iure, minima perspiciatis ut molestias quibusdam!'
  }
]; // For test

export const GENERATE_IMAGE: string = 'https://source.unsplash.com/random/200x200/?people'; // For Test
