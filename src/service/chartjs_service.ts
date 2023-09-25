import { ProjectType } from '@src/types/project_type';
import { ArrayLabelValue, wordsCountPerFolder } from './project_calculator_service';

export const graphCircleData = (project: ProjectType, dataLabel: string = 'Words') => {
  const data: ArrayLabelValue = wordsCountPerFolder(project);
  const colorHandler: string[] = [];
  data.label.forEach((str) => {
    colorHandler.push(randomColorGenerator(str));
  });
  return {
    labels: data.label,
    datasets: [
      {
        label: dataLabel,
        data: data.value,
        borderWidth: 0,
        backgroundColor: colorHandler
      }
    ]
  };
};

export const randomColorGenerator = (str: string): string => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var h = hash % 360;
  return 'hsl(' + h + ', ' + 45 + '%, ' + 40 + '%)';
};
