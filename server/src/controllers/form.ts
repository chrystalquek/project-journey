import express from 'express';

import HTTP_CODES from '../constants/httpCodes';
import formService from '../services/forms/form';
import optionsService from '../services/forms/option';
import questionService from '../services/forms/question';

const createForm = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    // TODO: Better way to structure API request body
    const { formData, questionData, optionsData } = req.body;

    // Generate form attached to event
    await formService.createForm(formData);
    // Fill up relevant questions
    await questionService.insertQuestions(questionData);
    // Fill up options for those questions
    await optionsService.createOptionsForQuestion(optionsData);
    res.status(HTTP_CODES.OK).send();
  } catch (err) {
    res.status(HTTP_CODES.SERVER_ERROR).json({
      errors: [{ msg: err.msg }],
    });
  }
};

export default {
  createForm,
};
