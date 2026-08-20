import { SingleChoice } from "./SingleChoice";
import { MultipleChoice } from "./MultipleChoice";
import { TextQuestion } from "./TextQuestion";
import { NumberQuestion } from "./NumberQuestion";
import { SliderQuestion } from "./SliderQuestion";
import { YesNoQuestion } from "./YesNoQuestion";
import { SelectQuestion } from "./SelectQuestion";
import { CardSelection } from "./CardSelection";

const renderers = {
  single: SingleChoice,
  multiple: MultipleChoice,
  text: TextQuestion,
  number: NumberQuestion,
  slider: SliderQuestion,
  yesno: YesNoQuestion,
  select: SelectQuestion,
  card: CardSelection,
};

export function QuestionRenderer({ question, value, onChange, error }) {
  const Renderer = renderers[question.type];
  if (!Renderer) return null;
  return <Renderer question={question} value={value} onChange={onChange} error={error} />;
}