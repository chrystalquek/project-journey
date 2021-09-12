import { useCallback, useState } from "react";

export type QuestionData = {
  type: "shortAnswer" | "mcq" | "checkboxes";
  displayText: string;
  options?: Array<string>;
  isRequired: boolean;
};

type KeyType = "type" | "displayText" | "options" | "isRequired";

export const useFeedbackForm = () => {
  const [feedbackFormEventQuestions, setFeedbackFormEventQuestions] = useState<
    QuestionData[]
  >([]);

  const handleAddQuestion = useCallback(() => {
    const newQuestion: QuestionData = {
      type: "shortAnswer",
      displayText: "",
      isRequired: true,
      options: [],
    };
    setFeedbackFormEventQuestions([...feedbackFormEventQuestions, newQuestion]);
  }, [feedbackFormEventQuestions]);

  const handleChangeQuestion = useCallback(
    (value: string | Array<string> | boolean, key: KeyType, index: number) => {
      const newQuestion: QuestionData = {
        ...feedbackFormEventQuestions[index],
        [key]: value,
      };

      if (key === "type") {
        newQuestion.displayText = "";
        newQuestion.options = [];
      }

      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        newQuestion,
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions]
  );

  const handleAddOption = useCallback(
    (index: number) => {
      const newOption: Array<string> = [
        ...(feedbackFormEventQuestions[index]?.options ?? []),
        "",
      ];
      handleChangeQuestion(newOption, "options", index);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  const handleRemoveQuestion = useCallback(
    (index: number) => {
      setFeedbackFormEventQuestions([
        ...feedbackFormEventQuestions.slice(0, index),
        ...feedbackFormEventQuestions.slice(index + 1),
      ]);
    },
    [feedbackFormEventQuestions]
  );

  const handleRemoveOption = useCallback(
    (questionIndex: number, optionIndex: number) => {
      const currentOption =
        feedbackFormEventQuestions[questionIndex].options ?? [];
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, "options", questionIndex);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  const handleChangeOption = useCallback(
    (value: string, questionIndex: number, optionIndex: number) => {
      const currentOption: Array<string> =
        feedbackFormEventQuestions[questionIndex].options ?? [];
      const newOption: Array<string> = [
        ...currentOption.slice(0, optionIndex),
        value,
        ...currentOption.slice(optionIndex + 1),
      ];

      handleChangeQuestion(newOption, "options", questionIndex);
    },
    [feedbackFormEventQuestions, handleChangeQuestion]
  );

  return {
    feedbackFormEventQuestions,
    handleAddQuestion,
    handleChangeQuestion,
    handleAddOption,
    handleRemoveQuestion,
    handleRemoveOption,
    handleChangeOption,
  };
};
